const mongoose = require('mongoose')

const organizationSchema = new mongoose.Schema({   
   organizationName: {
        type: String,
        required: true
   },
   email:{
        type: String,
        required: true
   },
   type:{
        type: String,
        required: true
   },
   mobile:{
        type: String,
        required: true
   }
})

const organizationData = mongoose.model('organizationData', organizationSchema);
module.exports = organizationData