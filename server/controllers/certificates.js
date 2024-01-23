const { default: mongoose } = require("mongoose");
const sendMail = require("../config/nodemailer");
const Certificates = require("../models/certificateSchema");
const Events = require("../models/eventSchema");
const Templates = require("../models/templateSchema");
const generateAndUploadPDF = require("../utils/firebase_upload");
const { parse } = require("node-html-parser");

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
                      _id: 1,
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
        },
      },
      {
        $project: {
          organizations: {
            $ifNull: [{ $arrayElemAt: ["$organizations", 0] }, 0],
          },
          events: { $ifNull: [{ $arrayElemAt: ["$events", 0] }, 0] },
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
    const temp = await Templates.findOne({ _id: template });

    const dom = parse(temp.templateHtml);

    let majorDetails = details[0];
    try {
      await data.map(async (item) => {
        //dom.querySelector("#eventName").textContent = eventName;
        dom.querySelector("#organizationName").textContent = organizationName;
        dom.querySelector("#date").textContent =
          majorDetails.events.startDate === majorDetails.events.endDate
            ? majorDetails.events.endDate
            : `${majorDetails.events.startDate} to ${majorDetails.events.endDate}`;
        dom.querySelector("#name").textContent = item.studentName;
        const newHtml = dom.toString();

        //firebase upload
        const url = await generateAndUploadPDF(
          newHtml,
          `${item.studentRoll}_${item.eventsName}.pdf`
        );
        const sent = await sendMail(
          item,
          majorDetails.organizations,
          url,
          req.email
        );
        if (!sent) {
          return res.status(401).json({
            message: "Error sending mails",
          });
        }
      });
    } catch (error) {
      console.log("error", error);
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
