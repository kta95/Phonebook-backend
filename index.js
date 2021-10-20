const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    console.log(id)
    const person = persons.find(person => person.id === id)
    console.log(person)
    if (person) {       
        response.json(person);
    } else {
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id)
  console.log(persons)
  response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for 4 people</p><p>${new Date()}`)
})

const generateId = () => {
  const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id)) : 0

  console.log(persons.map(p => p.id),  ...persons.map(p => p.id))
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body;
  const names = [...persons.map(p => p.name)]
  if (!(body.name || body.number)) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  } else if (names.includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
   }

  const person = {
    id : generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  console.log(persons)
  response.json(persons)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)