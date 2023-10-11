const asyncHandler = require("express-async-handler")
const userDb = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAllUsers = asyncHandler(async (req, res) => {
    const user = await userDb.find()
    res.status(200).json(user)
})

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username, !email, !password) {
        res.status(400)
        throw new Error("Fill in the blanks")
    }
    const userAvaible = await userDb.findOne({ email })
    if (userAvaible) {
        res.status(400)
        throw new Error("Already have")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userDb.create({
        username,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error("Failed to register")
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Fill in the blanks")
    }
    const user = await userDb.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                email: user.email,
                username: user.username,
                id: user.id
            }
        }, process.env.TOKEN_SECURITY,
            { expiresIn: "15m" }
        )
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error("Failed to log in")
    }
})

const current = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = {
    getAllUsers,
    register,
    login,
    current
}