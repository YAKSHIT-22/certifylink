const Template = require("../models/templateSchema");

const createTemplate = async (req, res) => {
    const { templateName, organization, event } = req.body;
    if (!templateName || !organization || !event) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }
    const existingTemplate = await Template.findOne({ templateName: templateName })
    if (existingTemplate) {
        return res.status(400).json({
            success: false,
            message: "Template Already Exists"
        })
    }
    try {
        let data = await (new Template({
            templateName,
            organization,
            event,
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
        const templates = await Template.find()
        res.status(200).json({
            message: "Organization fetched",
            templates
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