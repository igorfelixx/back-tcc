const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    image: {type: String, required: true},
})

const Images = mongoose.model("images", UserSchema)
module.exports = Images