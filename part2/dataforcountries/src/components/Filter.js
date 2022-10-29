import axios from 'axios'
import { useState, useEffect } from 'react'

const ShowMulticountries = ({result, handleShow}) => {

  return (
    <>
      {result.length < 10 && result.length > 1 && result.map((country, i) =>
        <p key={i}>{country.name.common}
          {' '}<button value={country.name.common} onClick={handleShow}>show</button>
        </p>
      )}
    </>
  )
}

const ShowOnecountries = ({result}) => {
  const [weather, setWeather] = useState([])

  let latlng, lat, lon
  if(result.length === 1 && result[0].latlng !== undefined) {
    latlng = result[0].latlng
    lat = result[0].latlng[0]
    lon = result[0].latlng[1]
  }

  const apiKey = process.env.REACT_APP_API_KEY
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  console.log(apiUrl)

  useEffect(() => {
    console.log('effect')
    axios
      .get(apiUrl)
      .then(response => {
        console.log('promises fulfilled')
        setWeather(response.data)
      })
  }, [apiUrl])
  console.log(weather)


  return (
    <>
      {result.length === 1 && result.map((country, i) =>
        <div key={i}>
          <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital} <br /> area {country.area}</p>
            <h2>Languages:</h2>
            <ul>
              {Object.values(country.languages).map((value, index) =>
                <li key={index}>{value}</li>
              )}
            </ul>
            <img alt="flag" src={country.flags.png} />
          </div>
          <div>
            <h1>Weather in {country.capital}</h1>
            <p>temperature {(parseFloat(weather.main.temp) - 273.15).toFixed(2)} Celcius</p>
            <img alt="icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>wind {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </>
  )
}

const Filter = ({ result, searchCountry, handleSearchCountry, handleShow }) => {
  return (
    <div>
      find countries <input value={searchCountry} onChange={handleSearchCountry}/>
      {result.length > 10 && <p>too many matches, specify another filter</p>}
      <ShowMulticountries result={result} handleShow={handleShow} />
      <ShowOnecountries result={result} />
    </div>
  )
}

export default Filter
