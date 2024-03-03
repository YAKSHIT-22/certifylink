const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
     organizationName: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true
     },
     type: {
          type: String,
          required: true
     },
     mobile: {
          type: String,
          required: true
     },
     createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true
     }
})
const Organizations = mongoose.models["organization"] || mongoose.model("organization", organizationSchema);
module.exports = Organizations
