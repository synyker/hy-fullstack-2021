import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  let countriesToShow = []
  if (selectedCountry != null) {
    countriesToShow = [selectedCountry];
  }
  else if (filter.length === 0) {
    countriesToShow = countries;  
  } else if (filter.length > 0) {
    countriesToShow = countries.filter((country) => {
      return country.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  console.log("render", countriesToShow.length);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleShowClick = (country) => {
    const handler = () => {
      console.log(country)
      setSelectedCountry(country)
    }

    return handler;
  }

  return (
    <div>
      find countries: <input onChange={handleFilterChange} />
      {countriesToShow.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {countriesToShow.length <= 10 && selectedCountry === null && (
        countriesToShow.map((country) => {
          return (
            <div>
              <span key={country.name}>{country.name}</span>
              <button onClick={handleShowClick(country)}>show</button>
            </div>

          )
        })
      )}
      {countriesToShow.length === 1 && (
        <div>
          <h1>{countriesToShow[0].name}</h1>
          <p>capital {countriesToShow[0].capital}</p>
          <p>population {countriesToShow[0].population}</p>
          <h2>languages</h2>
          <ul>
            {countriesToShow[0].languages.map(language => {
              return <li>{language.name}</li>
            })}
          </ul>
          <img src={countriesToShow[0].flag} alt={"flag"} width={"100px"}/>
        </div>

      )}
    </div>
  );
};

export default App;
