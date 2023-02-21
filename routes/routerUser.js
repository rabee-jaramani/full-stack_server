const express = require("express")
const User = require("./models/User") // new
const routerUser = express.Router()

// Get all posts
routerUser.get("/users", async (req, res) => {
    const users = await User.find()
    res.send(users)
})

module.exports = routerUser