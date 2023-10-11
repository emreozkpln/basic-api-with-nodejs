const express = require("express")
const dotenv = require("dotenv").config()
const contactRouter = require("./routes/contactRoutes")
const userRouter = require("./routes/userRoutes")
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler")

connectDb()
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use("/contact", contactRouter)
app.use("/user", userRouter)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server çalışıyor port numarası ${port}`);
})