const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default: "The Unnamed"
        // required: true,
    },
    age: {
        type: Number,
        // default: 0,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        // required: true,
    },
    gender: {
        type: String,
        enum: ['Male', "Female", "Other"],
        // required: true,
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        // required: true,
    },
    img: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
},
    {
        timestamps: true,
    }
);
const Users = mongoose.models["user"] || mongoose.model("user", userSchema);
module.exports = Users 