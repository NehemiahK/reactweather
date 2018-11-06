import React from 'react';
import './weathercard.css';
import WeatherHour from './WeatherHour';

const getDayOfWeek = (timestamp) =>{
    const numericDay = new Date(timestamp*1000);
   // console.log(numericDay);
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let dayOfWeek = days[numericDay.getDay()]
   // console.log(dayOfWeek);
    return dayOfWeek;
}

const getHiAndLowOfDay = (timeslots) => {
    //console.log(timeslots);
    let low;
    let hi;

    for (var i=0; i< timeslots.length; i++){
        if(timeslots[i].main.temp_min < low || !low ){
            low = timeslots[i].main.temp_min;
        }
        if(timeslots[i].main.temp_max > hi || !hi){
            hi = timeslots[i].main.temp_max;
        }
    }
    return [Math.round(low),Math.round(hi)];
}

const getMidDayWeather = (day) => {
    let midday = Math.round(day.length/2);
   return getIcon(day[midday].weather[0].icon);
}

const getIcon = (code) => {
    return `https://openweathermap.org/img/w/${code}.png`
}


const WeatherCard = (props) => {
    let [low,hi] = getHiAndLowOfDay(props.day.hours);

    return <div className="weather-card">
        <div className="weather-card-item day">{getDayOfWeek(props.day.hours[0].dt)}</div>
        <div className="weather-card-item icon"><img src={getMidDayWeather(props.day.hours)} height="40" /></div>
        <div className="weather-card-item hilow"> <span> <strong>{hi}</strong> </span> <span>{low}</span> </div>
        <div className="weather-card-item">  </div>
      
    </div>
}

export default WeatherCard;