import React from 'react';

const getIcon = (code) => {
    return `https://openweathermap.org/img/w/${code}.png`
}
const getHour = (time) =>{
    return time.split(" ")[1];
}

const WeatherHour = (props) => {
    //console.log(props);
    return <div> 
        <img src={getIcon(props.weather.weather[0].icon)} height="100" />
        <div>{props.weather.main.temp}</div> 
        <div>{getHour(props.weather.dt_txt)}</div>

        </div>
}

export default WeatherHour;