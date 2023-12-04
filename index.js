const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const multer = require('multer')
const path = require('path')

const UserModel = require('./server/models/user')
const UserBarbearia = require('./server/models/barbearia')
const Images = require('./server/models/images')
const AgendamentoModel = require('./server/models/agendamento')
const ImagesUser = require('./server/models/imagesUser')
const Capa = require('./server/models/capa')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('server'))

mongoose.connect("mongodb+srv://igor:igorfelix30@tcc.5d3xsq8.mongodb.net/crud")

// Usuario
app.get('/', (req, res) => {
    UserModel.find({}).then(users => res.json(users)).catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findById({ _id: id }).then(users => res.json(users)).catch(err => res.json(err))
})

app.post("/createUser", (req, res) => {
    UserModel.create(req.body).then(users => res.json(users)).catch(err => res.json(err))
})

app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        telefone: req.body.telefone,
    }).then(users => res.json(users)).catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndDelete({ _id: id }).then(users => res.json(users)).catch(err => res.json(err))
})

// Images Barber

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/public/Images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({
    storage: storage
})

app.post("/createBarbearia", (req, res) => {
    console.log('requisiçao', req.body)
    UserBarbearia.create(req.body).then(users => res.json({ error: false, users })).catch(err => res.json({ error: true, message: err.message }))
})

app.post("/upload", upload.single('file'), (req, res) => {
    Images.create({ image: req.file.filename }).then(resposta => res.json({ error: false, resposta })).catch(err => res.json({ error: true, message: err.message }))
})

app.get('/getImages', (req, res) => {
    Images.find({}).then(users => res.json({ error: false, users })).catch(err => res.json({ error: true, message: err.message }))
})

app.get('/getImages/:id', (req, res) => {
    const id = req.params.id;

    Images.findById({ _id: id }).then(users => res.json(users)).catch(err => res.json(err))
})

// Images User

app.post("/uploadUser", upload.single('file'), (req, res) => {
    ImagesUser.create({ imageUser: req.file.filename }).then(resposta => res.json({ error: false, resposta })).catch(err => res.json({ error: true, message: err.message }))
})

app.get('/getImagesUser', (req, res) => {
    ImagesUser.find({}).then(users => res.json({ error: false, users })).catch(err => res.json({ error: true, message: err.message }))
})

app.get('/getImagesUser/:id', (req, res) => {
    const id = req.params.id;

    ImagesUser.findById({ _id: id }).then(users => res.json(users)).catch(err => res.json(err))
})

// Capa Barbearia
app.post("/uploadCapa", upload.single('file'), (req, res) => {
    Capa.create({ capa: req.file.filename }).then(resposta => res.json({ error: false, resposta })).catch(err => res.json({ error: true, message: err.message }))
})

app.get('/getImagesCapa', (req, res) => {
    Capa.find({}).then(users => res.json({ error: false, users })).catch(err => res.json({ error: true, message: err.message }))
})

app.get('/getImagesCapa/:id', (req, res) => {
    const id = req.params.id;

    Capa.findById({ _id: id }).then(users => res.json(users)).catch(err => res.json(err))
})

// Barbers

app.get('/barbearias', (req, res) => {
    UserBarbearia.find({}).then(users => res.json({ error: false, users })).catch(err => res.json({ error: true, message: err.message }))
})

app.get('/barbearias/:id', (req, res) => {
    const id = req.params.id;

    UserBarbearia.findById({ _id: id }).then(users => res.json(users)).catch(err => res.json(err))
})

app.put("/updateBarbearia/:id", (req, res) => {
    const id = req.params.id;

    UserBarbearia.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        nameBarber: req.body.nameBarber,
        servicos: req.body.servicos, //array
        email: req.body.email,
        senha: req.body.senha,
        foto: req.body.foto,
        capa: req.body.capa,
        telefone: req.body.telefone,
        endereco: req.body.endereco, // Objeto
        startTime: req.body.startTime,
        finalTime: req.body.finalTime
    }).then(users => res.json(users)).catch(err => res.json(err))
})

app.delete('/deleteBarbearia/:id', (req, res) => {
    const id = req.params.id;

    UserBarbearia.findByIdAndDelete({ _id: id }).then(users => res.json(users)).catch(err => res.json(err))
})

// Agendamentos 

app.get('/getAgendamento', (req, res) => {
    AgendamentoModel.find({}).then(users => res.json(users)).catch(err => res.json(err))
})

app.get('/AgendamentoModel/:id', (req, res) => {
    const id = req.params.id;

    AgendamentoModel.findById({ _id: id }).then(users => res.json(users)).catch(err => res.json(err))
})

app.post("/createAgendamento", (req, res) => {
    AgendamentoModel.create(req.body).then(users => res.json(users)).catch(err => res.json(err))
})

app.put("/updateAgendamento/:id", (req, res) => {
    const id = req.params.id;

    AgendamentoModel.findByIdAndUpdate({ _id: id }, {
        serviceName: req.body.serviceName,
        servicePrice: req.body.servicePrice,
        dia: req.body.dia,
        horario: req.body.horario
    }).then(users => res.json(users)).catch(err => res.json(err))
})

app.delete('/deleteAgendamento/:id', (req, res) => {
    const id = req.params.id;

    AgendamentoModel.findByIdAndDelete({ _id: id }).then(users => res.json(users)).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("server is running")
})