import './index.css';
import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState('')
  const [style, setStyle] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promises fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const result = persons.filter(person => (person.name.toLowerCase() === searchName.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(obj => obj.name === newName)) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const person = persons.find(person => person.name === newName)
      const changePerson = { ...person, number: newNumber }
      const id = changePerson.id
      console.log(person)
      personService
        .update(id, changePerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        setTimeout(() => {
          setStyle('message')
          setMessage(`Added ${newName}`)
          console.log(style)
        }, 3000)
    }
  }

  const deletePerson = (person) => {
    console.log(person)
    let returnedPerson = persons.filter(p => p.id !== person.id)
    console.log(returnedPerson)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .destroy(person)
        .then(
          setPersons(returnedPerson)
        )
        .catch(error => {
          setStyle('error')
          setMessage(
            `Information of ${person.name} has already been removed from server`
          )
        })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={style}/>
      <Filter
        result={result}
        searchName={searchName}
        handleSearchName={handleSearchName}/>
      <h3>Add a new person</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
        />
      <h3>Numbers</h3>
      <Persons persons={persons} deletePerson={deletePerson}/>

    </div>
  )
}

export default App
