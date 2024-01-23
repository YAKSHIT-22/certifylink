const generateAndUploadPDF = require("../utils/firebase_upload");
const { parse } = require("node-html-parser");
const sendMail = require("../config/nodemailer");

const generateAndMail = async (data, temp, majorDetails, eventName, organizationName, email) => {
    const promises = data.map(async (item) => {
        const dom = parse(temp.templateHtml);

        dom.querySelector("#name").textContent = item.studentName;
        // dom.querySelector("#eventName").textContent = eventName;
        // dom.querySelector("#organizationName").textContent = organizationName;
        // dom.querySelector("#date").textContent = majorDetails.events.startDate === majorDetails.events.endDate
        // ? majorDetails.events.endDate
        // : `${majorDetails.events.startDate} to ${majorDetails.events.endDate}`;
        const newHtml = dom.toString();

        // Firebase upload
        const url = await generateAndUploadPDF(
            newHtml,
            `${item.studentRoll}_${item.eventsName}.pdf`
        );

        // Send email
        const sent = await sendMail(
            item,
            majorDetails.organizations,
            url,
            email
        );

        return sent;
    });

    // Wait for all promises to settle
    await Promise.all(promises);

    // Optionally, you can return some aggregated result or a success message
    return true;
};

module.exports = generateAndMail;
