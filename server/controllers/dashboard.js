const { default: mongoose } = require("mongoose");
const Users = require("../models/userSchema");

const getDashboardData = async (req, res) => {
    try {
        const data = await Users.aggregate([
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
                                        },
                                    },
                                    {
                                        $project: {
                                            _id: 1,
                                            organizationName: 1,
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
                                        },
                                    },
                                    {
                                        $project: {
                                            _id: 1,
                                            eventName: 1,
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                    templates: [
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
                                            createdBy: new mongoose.Types.ObjectId(req.user),
                                        },
                                    },
                                    {
                                        $project: {
                                            _id: 1,
                                            templateName: 1,
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
                    organizations: 1,
                    events: 1,
                    templates: 1,
                }
            }
        ]);

        return res.status(200).json({ ...data[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = { getDashboardData };
