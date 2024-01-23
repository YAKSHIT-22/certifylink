const { default: mongoose } = require("mongoose");
const Certificates = require("../models/certificateSchema");
const Events = require("../models/eventSchema");
const generateAndMail = require("../utils/generateAndMail");


const sendCertificates = async (req, res) => {
  const { template, eventName, organizationName, data } = req.body;
  let length = data.length;
  try {
    const details = await Events.aggregate([
      {
        $facet: {
          organizations: [
            {
              $match: {
                business: "",
              },
            },
            {
              $unionWith: {
                coll: "organizations",
                pipeline: [
                  {
                    $match: {
                      createdBy: new mongoose.Types.ObjectId(req.user),
                      organizationName: organizationName,
                    },
                  },
                  {
                    $project: {
                      organizationName: 1,
                      email: 1,
                      mobile: 1,
                    },
                  },
                ],
              },
            },
          ],
          events: [
            {
              $match: {
                business: "",
              },
            },
            {
              $unionWith: {
                coll: "events",
                pipeline: [
                  {
                    $match: {
                      createdBy: new mongoose.Types.ObjectId(req.user),
                      eventName: eventName,
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      eventName: 1,
                      address: 1,
                      startDate: 1,
                      endDate: 1,
                    },
                  },
                ],
              },
            },
          ],
          template: [
            {
              $match: {
                business: "",
              },
            },
            {
              $unionWith: {
                coll: "templates",
                pipeline: [
                  {
                    $match: {
                      _id: new mongoose.Types.ObjectId(template),
                    },
                  },
                  {
                    $project: {
                      templateHtml: 1,
                      templateName: 1,
                    },
                  },
                ],
              },
            },
          ]
        },
      },
      {
        $project: {
          organizations: {
            $ifNull: [{ $arrayElemAt: ["$organizations", 0] }, 0],
          },
          events: { $ifNull: [{ $arrayElemAt: ["$events", 0] }, 0] },
          template: { $ifNull: [{ $arrayElemAt: ["$template", 0] }, 0] }
        },
      },
    ]);
    if (!template || !eventName || !organizationName) {
      return res.status(400).json({
        message: "Provide all fields",
      });
    }
    if (length === 0) {
      return res.status(400).json({
        message: "Provide atleast one email",
      });
    }

    let majorDetails = details[0];
    const temp = majorDetails.template;


    // function to generate certificate upload on firebase and send mail
    const sent = generateAndMail(data, temp, majorDetails, eventName, organizationName, req.email)
    if (!sent) {
      return res.status(401).json({
        message: "Error sending mails",
      });
    }

    await Certificates.create({
      template,
      eventName,
      organizationName,
      sentBy: req.user,
      number: length,
    });
    return res.status(200).json({
      message: "Mails sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = {
  sendCertificates,
};
