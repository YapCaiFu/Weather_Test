import React from "react";
import moment from 'moment';
import { kelvinToFarenheit } from './utils';
import { MdDelete, MdOutlineSearch } from "react-icons/md";

const SearchHistoryItem = ({ item, index, setCurrentWeather, deleteWeatherHistory, showDelete }) => {
    return (
        <div key={index} className="App-search-history">
            <div className="App-search-history-container">
                <div className='d-flex flex-column align-items-start'>
                    <div>
                        {index + 1}. {item.name}, {item.sys.country}
                    </div>
                    <div>
                        <p class="fw-lighter">{item.weather[0].description}</p>
                    </div>
                </div>
                <img
                    src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt="weather status icon"
                    className="weather-icon img-fluid"
                /></div>
            <div className="App-search-history-container">
                <div className='d-flex flex-column align-items-end'>
                    <div>
                        {moment.unix(item.dt).format("h:mm:ss a")}
                    </div>
                    <div>
                        <p class="fw-lighter">
                            {kelvinToFarenheit(item.main.temp)}&deg; C ({kelvinToFarenheit(item.main.temp_min)}&deg; C ~ {kelvinToFarenheit(item.main.temp_max)}&deg; C)
                        </p>
                    </div>
                </div>
                <button className="btn" onClick={() => setCurrentWeather(item, index)}>
                    <MdOutlineSearch />
                </button>
                {showDelete && <button className="btn" onClick={() => deleteWeatherHistory(index)}>
                    <MdDelete />
                </button>}
            </div>
        </div>

    );
};

export default SearchHistoryItem;
