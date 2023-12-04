const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    imageUser: {type: String, required: true},
})

const ImagesUser = mongoose.model("ImagesUser", UserSchema)
module.exports = ImagesUser