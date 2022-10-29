import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  // const [weather, setWeather] = useState('')


  // const apiKey = process.env.REACT_APP_API_KEY
  // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promises fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  // useEffect(() => {
  //   console.log('effect')
  //   axios
  //     .get(apiUrl)
  //     .then(response => {
  //       console.log('promises fulfilled')
  //       setWeather(response.data)
  //     })
  // }, [])
  // console.log('render', countries.length, 'countries')

  const result = countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)
  }
  const handleShow = (event) => {
    console.log(event.currentTarget.value)
    setSearchCountry(event.currentTarget.value)
  }

  return (
    <Filter result={result} searchCountry={searchCountry} handleSearchCountry={handleSearchCountry} handleShow={handleShow}/>
  )
}

export default App;
