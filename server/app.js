const multer = require('multer');
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');

//used for excel upload of data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('excelData');

const app = express();
const port = 4000;

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://certifylink-frontend.vercel.app/",
    ],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(require("cookie-parser")());
app.use(express.json({
    limit: '50mb'
}));
connectDatabase();

app.use("/api/v1/user", require("./routes/auth"));
app.use("/api/v1/org", require("./routes/organization"));
app.use("/api/v1/template", require("./routes/template"));
app.use("/api/v1/event", require("./routes/event"));
app.use("/api/v1/certificate", upload, require("./routes/certificate"));
app.use("/api/v1/dashboard", require("./routes/dashboard"));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



module.exports = app;