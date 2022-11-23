require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Phonebook = require('./models/phonebook')

app.use(express.json())
app.use(cors())

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


/******************** GET *********************/
app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(phonebooks => {
    response.json(phonebooks)
  })
})

app.get('/api/info', (request, response) => {
  Phonebook.find({}).then(phonebooks => {
    // console.log(typeof(phonebooks.length));
    response.send(`
      <p>Phonebook has infor ${phonebooks.length} for people</p>
      <p>${new Date()}</p>
    `)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Phonebook.findById(request.params.id).then(phonebook => {
    response.json(phonebook)
  })
})

/******************** POST *********************/
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: 'name or number missing'
  //   })
  // }
  if (Phonebook.find({}).then(phonebooks => {
    phonebooks.some(obj => obj.name === body.name)
  })) {
    return response.status(400).json({
      error: `${body.name} is already in to phonebook`
    })
  }

  const phonebook = new Phonebook({
    name: body.name,
    number: body.number || false,
    date: new Date(),
  })

  phonebook.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

/******************** PUT *********************/
app.put('api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Phonebook.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPhonebook => {
      response.json(updatedPhonebook)
    })
    .catch(error => next(error))
})

/******************** DELETE *********************/
app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
