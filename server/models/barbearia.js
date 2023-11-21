const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type: String},
    nameBarber: {type: String},
    email: {type: String},
    senha: {type: String},
    servicos: [{
        servicoName: {type: String },
        servicoPreco: {type: Number }
    }],
    foto: {type: String},
    capa: {type: String},
    telefone: {type: String},
    endereco: {
      cidade: {type: String},
      uf: {type: String},
      cep: {type: Number},
      numero: {type: Number}
    },
    startTime: {type: Number},
    finalTime: {type: Number}
})

const BarberModel = mongoose.model("barbearia", UserSchema)
module.exports = BarberModel