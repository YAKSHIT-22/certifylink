const admin = require('firebase-admin');
const serviceAccount = require('../certifylink-firebase-adminsdk-bs7ic-dbfb985cfd.json');
const pdf = require('html-pdf');

//initialize the app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://certifylink.appspot.com' //you can find in storage.
});

//get your bucket
var bucket = admin.storage().bucket();

const generateAndUploadPDF = async (htmlContent, remoteFileName) => {
    //puppeter

    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();

    // // Set content to the HTML provided
    // await page.setContent(htmlContent, { waitUntil: 'load' });

    // // Generate PDF from the HTML
    // const pdfBuffer = await page.pdf();

    // // Close the browser
    // await browser.close();



    // pdf-lib 

    // const PDFdoc = await PDFDocument.create();
    // const page = PDFdoc.addPage([300, 400]);

    // // Add content to the PDF
    // page.drawText(htmlContent);

    // // save the pdf
    // const pdfBytes = await PDFdoc.save();
    // // writeFileSync(remoteFileName, await PDFdoc.save());




    // Create a PDF from HTML content

    const pdfBuffer = await new Promise((resolve, reject) => {
        pdf.create(htmlContent, { format: 'Letter', orientation: 'landscape' }).toBuffer((err, buffer) => {
            if (err) reject(err);
            else resolve(buffer);
        });
    });
    // // Upload the PDF to Firebase Storage
    const file = bucket.file(remoteFileName);

    // // Ensure pdfBytes is a Buffer
    const buffer = Buffer.from(pdfBuffer);
    await file.save(buffer, {
        metadata: {
            contentType: 'application/pdf',
        },
    });

    console.log('PDF uploaded successfully!');

    // Get the download URL
    const downloadURL = await getDownloadURL(remoteFileName);
    console.log('Download URL:', downloadURL);

    return downloadURL;
};

const getDownloadURL = async (remoteFileName) => {
    const file = bucket.file(remoteFileName);
    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2025', // Set the expiration date for the URL
    });

    return url;
};


module.exports = generateAndUploadPDF