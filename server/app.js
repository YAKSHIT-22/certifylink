const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { postData } = require('./routes');
const { certificate } = require('./routes/certificate');
const connectDatabase = require('./config/database');
const ejs = require('ejs');

const app = express();
const port = 4000;

connectDatabase()

app.set('view engine', 'ejs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('excelFile');

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/download', async (req, res) => {
    const html = await ejs.renderFile("views/download.ejs", null, {
        async: true
    })

    res.send(html)
    return
});

app.post('/upload', upload, postData);
app.get('/certificate', certificate);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
