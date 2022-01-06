import React from "react";
import countries from 'i18n-iso-countries';
import moment from 'moment';
import { kelvinToFarenheit } from './utils';
import WeatherCardItem from "./WeatherCardItem";

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));



const WeatherCards = ({ apiData }) => {
    return (
        <div className="card mt-5 mx-auto" style={{ width: '60vw' }}>
            {apiData.main ? (
                <div class="card-color card-body text-left">
                    <p className="h6 Theme-grey">
                        {apiData.name},{apiData.sys.country} ({countries.getName(apiData.sys.country, 'en', {
                            select: 'official',
                        })})
                    </p>
                    <div className="d-flex flex-row justify-content-start align-items-center">
                        <img
                            src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                            alt="weather status icon"
                            className="weather-icon img-fluid"
                        />
                        <p className="h5">
                            <strong>{apiData.weather[0].main}</strong>
                        </p>
                    </div>
                    <div className="row">
                        {[
                            { title: "Description", description: apiData.weather[0].description },
                            { title: "Temperature", description: `${kelvinToFarenheit(apiData.main.temp)}\xB0 C (${kelvinToFarenheit(apiData.main.temp_min)}\xB0 C ~ ${kelvinToFarenheit(apiData.main.temp_max)}\xB0 C)` },
                            { title: "Humidity", description: `${apiData.main.humidity} %` },
                            { title: "Time", description: moment.unix(apiData.dt).format("YYYY-MM-DD h:mm a") },
                        ].map(weathercarditem => <WeatherCardItem title={weathercarditem.title} description={weathercarditem.description} />)}
                    </div>
                </div>
            ) : (
                <div class="card-color px-1 py-1">
                    <p className="h4">
                        {apiData.message}
                    </p>
                </div>
            )}
        </div>
    );
};

export default WeatherCards;
