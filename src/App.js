import { useState, useEffect } from 'react';
import './App.css';
import WeatherCards from './WeatherCards'
import SearchHistory from './SearchHistory'
import SearchBox from './SearchBox';
import DeleteModal from './DeleteModal';


function App() {
  const [apiData, setApiData] = useState({});  // API Data
  const [showDelete, setShowDelete] = useState(false); // show delete button
  const [city, setCity] = useState('Singapore');
  const [country, setCountry] = useState('sg');
  const [state, setState] = useState({ searchDate: new Date(), location: 'Singapore,sg' });  // search term & date
  const [weatherHistory, setWeatherSearchHistory] = useState([]);

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_MERQURI_WEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state.location}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    getCurrentWeather()
  }, [state]);

  useEffect(() => {
    localStorage.setItem("WEATHER_HISTORY", JSON.stringify(weatherHistory));
  }, [weatherHistory]);

  useEffect(() => {
    setWeatherSearchHistory(JSON.parse(localStorage.getItem("WEATHER_HISTORY")));
  }, []);

  const getCurrentWeather = () => {
    if (state === ",") {
      setApiData({ message: "Not Found.", cod: "404" })
    } else {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            let tmpWeatherHistory = weatherHistory.slice();
            tmpWeatherHistory.push({ ...data, searchDate: state.searchDate });
            console.log(tmpWeatherHistory)
            setWeatherSearchHistory(tmpWeatherHistory);
          }
          setApiData(data)
        });
    }
  }

  const setCurrentWeather = (weatheritem) => {
    setState({ searchDate: new Date(), location: `${weatheritem.name},${weatheritem.sys.country}` });
  }

  const deleteWeatherHistory = (index) => {
    let tmpWeatherHistory = weatherHistory.slice();
    tmpWeatherHistory.splice(index, 1);
    setWeatherSearchHistory(tmpWeatherHistory);
  }

  const deleteAllWeatherHistory = (event) => {
    setWeatherSearchHistory([]);
  }

  const submitHandler = () => {
    setState({ searchDate: new Date(), location: `${city},${country}` });
  };

  return (
    <div className="App">
      <header className="App-header d-flex justify-content-start align-items-center">
        <h2>Today's Weather</h2>
      </header>
      <div className="container">
        <SearchBox country={country} setCountry={setCountry} city={city} setCity={setCity} submitHandler={submitHandler}/>
        <WeatherCards apiData={apiData} />
      </div>
      <header className="Sub-header mt-2 d-flex justify-content-start align-items-center">
        <h2>Search History</h2>
      </header>
      <div class="dropdown-divider"></div>
      <SearchHistory  setShowDelete={setShowDelete} setCurrentWeather={setCurrentWeather} showDelete={showDelete} weatherHistory={weatherHistory}  deleteWeatherHistory={deleteWeatherHistory}/>
      <DeleteModal deleteAllWeatherHistory={deleteAllWeatherHistory}/>
    </div>
  );
}

export default App;