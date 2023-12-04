const mongoose = require('mongoose')

const AgendamentoSchema = new mongoose.Schema({
    idCliente: String,
    idBarbeiro: String,
    serviceName: String,
    servicePrice: Number,
    dia: String,
    horario: String
})

const AgendamentoModel = mongoose.model("agendamento", AgendamentoSchema)
module.exports = AgendamentoModel