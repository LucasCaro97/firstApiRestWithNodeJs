//const http = require('http')
const  express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
        id: 2,
        name: "Ada Lovelace",
        number: "039-44-5323523",
      },
  {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122",
      }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const fecha = new Date()
    let contador = 0
    persons.forEach( () => {
        contador++;
    });


    response.send('<p>Phonebook has info for ' + contador + ' people!</p><br><p>'+fecha+'</p>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons);
})


app.get('/api/persons/:id', (request, response) => {
const id = Number(request.params.id)
const person = persons.find(person => person.id === id)
if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) =>{

const body = request.body
console.log(body)

if(!body.name){
    return response.status(400).json({
        error: 'Name missing'
    })
}

const person = {
    name: body.name,
    number: body.number || false,
    id: Math.floor(Math.random() * (1000 - 1 + 1)) + 1
}

persons = persons.concat(person)
response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)