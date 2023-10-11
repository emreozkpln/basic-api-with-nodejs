const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    username: {
        type: String,
        required: [true, "Enter username"],
        unique: [true]
    },
    email: {
        type: String,
        required: [true, "Enter email"]
    },
    phone: {
        type: String,
        required: [true, "Enter password"]
    }
}, {
    timestamps: true
})

const contactDb = mongoose.model("contact", contactSchema)
module.exports = contactDb