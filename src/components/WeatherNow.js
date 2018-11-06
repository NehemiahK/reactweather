import React from 'react';
import './weathernow.css';


const WeatherNow = (props) => {
    const {main,weather} = props.weather;
    return <div className="weather-now">
       <div>{weather[0].description}</div>
        <div className="degrees">{Math.round(main.temp)}°</div>
    </div>
}

export default WeatherNow;