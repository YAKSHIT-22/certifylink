const admin = require('firebase-admin');
const serviceAccount = require('../certifylink-firebase-adminsdk-bs7ic-dbfb985cfd.json');
const puppeteer = require('puppeteer')

//initialize the app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://certifylink.appspot.com' //you can find in storage.
});

//get your bucket
var bucket = admin.storage().bucket();

const generateAndUploadPDF = async (htmlContent, remoteFileName) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set content to the HTML provided
    await page.setContent(htmlContent, { waitUntil: 'load' });

    // Generate PDF from the HTML
    const pdfBuffer = await page.pdf();

    // Close the browser
    await browser.close();

    // Upload the PDF to Firebase Storage
    const file = bucket.file(remoteFileName);

    await file.save(pdfBuffer, {
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