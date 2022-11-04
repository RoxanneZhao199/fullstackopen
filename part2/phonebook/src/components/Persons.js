const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}{' '}
      <button id={person.id} onClick={() => deletePerson(person)}>delete</button>
    </div>

  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person, i) =>
        <Person key={i} person={person} deletePerson={deletePerson}/>
      )}
    </div>
  )
}

export default Persons
