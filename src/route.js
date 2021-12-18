const express = require('express')
const questionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router()

// Requisição e Renderização de parts eJS (html)
route.get('/', (req, res) => res.render('index', { page: 'enter-room' }))

route.get('/creat-pass', (req, res) =>
  res.render('index', { page: 'create-pass' })
)

// Entrar como Participante
route.post('/', RoomController.open)

// Recepção das Requisições ao Criar uma room e Definição das Respostas
route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.openCreated)

// Formato que o formulário de dentro da modal deve passar informação.

// Esse :action a Porf usou mas não sei se usarei.

route.post('/question/creat/:room', questionController.create)
route.post('/question/:room/:question', questionController.delete)
route.get('/question/:room/:question', questionController.check)

module.exports = route
