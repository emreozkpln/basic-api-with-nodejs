const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter username"]
    },
    email: {
        type: String,
        required: [true, "Enter email"],
        unique: [true]
    },
    password: {
        type: String,
        required: [true, "Enter password"]
    },
}, { timestamps: true })

const userDb = mongoose.model("user", userSchema)
module.exports = userDb