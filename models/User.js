const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    mobile: String,
})

module.exports = mongoose.model("User", userSchema)