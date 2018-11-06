import React from 'react';
import './miniweather.css';

const timeOnly = (time) => {
    time = time.split(" ")[1].split(":")[0];
    if(time > 12){
        time -=12;
        time += 'PM';
    }
    if(time == 0){
        time = 12;
        time += 'AM';
    }
    else if(time < 12){
        time += 'AM';
    }
    if(time == 12){
        time += 'PM';
    }
    return time.replace("0","");
}

const getIcon = (code) => {
    return `http://openweathermap.org/img/w/${code}.png`
}

const MiniWeather = (props) => {
    //console.log(props);
    return <div className="mini-weather">
        <div>{timeOnly(props.weather.dt_txt)}</div>
        <div> <img src={getIcon(props.weather.weather[0].icon)} /> </div>
        <div> {Math.round(props.weather.main.temp)}° </div>

        </div>
}

export default MiniWeather;

