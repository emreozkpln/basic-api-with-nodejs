const asyncHandler = require("express-async-handler")
const contactDb = require("../model/contactModel")

const getAllContacts = asyncHandler(async (req, res) => {
    const contact = await contactDb.find({ user_id: req.user.id })
    res.status(200).json(contact)
})

const getContact = asyncHandler(async (req, res) => {
    const contact = await contactDb.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Not found")
    }
    res.status(200).json(contact)
})

const createContact = asyncHandler(async (req, res) => {
    const { username, email, phone } = req.body
    if (!username || !email || !phone) {
        res.status(400)
        throw new Error("Fill in the blanks")
    }
    const contactFind = await contactDb.findOne({ username })
    if (contactFind) {
        res.status(400)
        throw new Error("Already have")
    }
    const contact = await contactDb.create({
        username,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact)
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await contactDb.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("You are not competent")
    }
    const updatedContact = await contactDb.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await contactDb.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("You are not competent")
    }
    await contactDb.deleteOne(contact)
    res.status(200).json(contact)
})

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}