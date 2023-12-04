const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    capa: {type: String, required: true},
})

const Capa = mongoose.model("Capa", UserSchema)
module.exports = Capa