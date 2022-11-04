const Filter = ({result, searchName, handleSearchName}) => {
  return (
    <div>
      filter shown with <input value={searchName} onChange={handleSearchName} />
      {result.map((person, i) =>
        <p key={i}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default Filter
