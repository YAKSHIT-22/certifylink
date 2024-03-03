const { default: mongoose } = require("mongoose");
const cloudinary = require("../config/cloudinary");
const Template = require("../models/templateSchema");

const createTemplate = async (req, res) => {
    const { templateName, organization, event, img } = req.body;
    try {
        let image;
        try {
            image = await cloudinary.uploader.upload(img,
                {
                    folder: "CertifyLinkTemplates",

                })
        } catch (error) {
            console.log(error)
            return res.status(413).json({
                message: "Image Size Too Large"
            })
        }
        let data = await (new Template({
            templateName,
            organization,
            event,
            templateImage: image.secure_url
        })).save();
        res.status(200).json({
            message: "Template created",
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getTemplates = async (req, res) => {
    try {
        const data = await Template.aggregate([
            {
                $facet: {
                    organizations: [
                        {
                            $match: {
                                business: ""
                            }
                        },
                        {
                            $unionWith: {
                                coll: "organizations",
                                pipeline: [
                                    {
                                        $match: {
                                            createdBy: new mongoose.Types.ObjectId(req.user),
                                        },
                                    },
                                    {
                                        $project: {
                                            _id: 1,
                                            organizationName: 1,
                                        }
                                    }
                                ]
                            }
                        }
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
                                        },
                                    },
                                    {
                                        $lookup:{
                                            from: "organizations",
                                            localField: "organization",
                                            foreignField: "_id",
                                            as: "organization"
                                        }
                                    },
                                    {
                                        $unwind: "$organization"
                                    },
                                    {
                                        $project: {
                                            _id: 1,
                                            eventName: 1,
                                            organization: "$organization.organizationName",
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                    templates: [
                        {
                            $group: {
                                _id: "$_id",
                                templateName: { $first: "$templateName" },
                                templateImage: { $first: "$templateImage" },
                                organization: { $first: "$organization" },
                                event: { $first: "$event" },
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                templateName: 1,
                                templateImage: 1,
                            }
                        },
                        {
                            $sort: {
                                templateName: 1
                            }
                        }

                    ],
                }
            },
            {
                $project: {
                    organizations: 1,
                    events: 1,
                    templates: 1,
                }
            }
        ])
        console.log(data[0])
        res.status(200).json({
            message: "Data fetched",
            ...data[0]
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    createTemplate,
    getTemplates
}