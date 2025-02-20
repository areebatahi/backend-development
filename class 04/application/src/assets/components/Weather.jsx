import React, { useState, useRef, useEffect } from "react"
import axios from 'axios'

const Weather = () => {

    let inputRef = useRef(null);
    const [weatherData, setWeatherData] = useState("");

    if(inputRef==""){alert('?')}

    const getWeather = async() => {
        setTimeout(()=>{
            document.getElementById('hidden').className='show'
        },1000)
        let cityName = inputRef.current.value;
        console.log(cityName);
        try {
            let res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8ec477bf0b25bcd1dae01a2b3e7e75bd&units=metric`
            );

            setWeatherData(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    

    return (
        <>
            <div className="container">
                <div className="weather__header">
                    <form className="weather__search">
                        <input type="text" placeholder="Search for a city..." className="weather__searchform" ref={inputRef}></input>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </form>
                    <button className="btn btn-light" onClick={getWeather}>Search</button>
                </div>
                <div className="hidden" id="hidden">
                    <div className="weather__body">
                        <h1 className="weather__city">{weatherData?.name}, {weatherData?.sys?.country}</h1>
                        <div className="weather__datetime"></div>
                        <p className="weather__temperature">
                            {weatherData?.main?.temp}°C
                        </p>
                        <div className="weather__minmax">
                            <p>Min: {weatherData?.main?.temp_min}°C</p>
                            <p>Max: {weatherData?.main?.temp_max}°C</p>
                        </div>
                    </div>

                    <div className="weather__info">
                        <div className="weather__card">
                            <i className="fa-solid fa-temperature-full"></i>
                            <div>
                                <p>Real Feel</p>
                                <p className="weather__realfeel">{weatherData?.main?.feels_like}°C</p>
                            </div>
                        </div>
                        <div className="weather__card">
                            <i className="fa-solid fa-droplet"></i>
                            <div>
                                <p>Humidity</p>
                                <p className="weather__humidity">{weatherData?.main?.humidity} g/m<sup>3</sup></p>
                            </div>
                        </div>
                        <div className="weather__card">
                            <i className="fa-solid fa-wind"></i>
                            <div>
                                <p>Wind</p>
                                <p className="weather__wind">{weatherData?.wind?.speed} m/s</p>
                            </div>
                        </div>
                        <div className="weather__card">
                            <i className="fa-solid fa-gauge-high"></i>
                            <div>
                                <p>Pressure</p>
                                <p className="weather__pressure">{weatherData?.main?.pressure} N/m<sup>2</sup></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weather