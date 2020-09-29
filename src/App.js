import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core'
import InfoBox from './Components/InfoBox'
import Map from './Components/Map'
import './App.css';

function App() {
  
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))
        setCountries(countries)
      }) 
    }

    getCountriesData()
  }, []) // useEffect chama uma callback que é executada assim que o componente carrega, o array vazio como segundo parâmetro faz com o que a callback só seja executada uma vez

  const onCountryChange = (event) => {
    const countryCode = event.target.value

    console.log(countryCode)

    setCountry(countryCode)
  }
  
  return (
    <div className="App">
      <div className="app__header">
        <h1>Lets build COVID 19 tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => 
              <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
              <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>

              <InfoBox title="Recovered" cases={1234} total={3000}/>

              <InfoBox title="Deaths" cases={12345} total={4000}/>
      </div>

      <Map />
    </div>
  );
}

export default App;
