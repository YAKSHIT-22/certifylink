const Organizations = require("../models/organizationSchema");

const createOrganization = async (req, res) => {
    const { organizationName, email, type, mobile } = req.body;
    if (!organizationName || !email || !type || !mobile) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }
    const existingOrganization = await Organizations.findOne({ email: email })
    if (existingOrganization) {
        return res.status(400).json({
            success: false,
            message: "Organization Already Exists"
        })
    }
    try {
        let data = await (new Organizations({
            organizationName,
            email,
            type,
            mobile,
            createdBy: req.user
        })).save();
        res.status(200).json({
            message: "Organization created",
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getOrganization = async (req, res) => {
    const id = req.user;
    try {
        const organization = await Organizations.find({ createdBy: id })
        res.status(200).json({
            message: "Organization fetched",
            data: organization
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
const updateOrganization = async (req, res) => {
    const { id } = req.params;
    const { organizationName, email, type, mobile } = req.body;
    try {
        let data = await Organizations.findByIdAndUpdate(id, {
            $set: {
                organizationName,
                email,
                type,
                mobile,
            }
        }, { new: true });
        res.status(200).json({
            message: "Organization updated",
            data
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }

}
module.exports = {
    createOrganization,
    getOrganization,
    updateOrganization,
}