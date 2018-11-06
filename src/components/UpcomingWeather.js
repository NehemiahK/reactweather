import React from 'react';
import MiniWeather from './MiniWeather';
import './upcomingweather.css';

const calcTimeSlotsToAdd = (timeSlots) => {

    let todaysSlot = timeSlots[0].hours;

    let slotsToDisplay = 9
    
    if(todaysSlot.length === slotsToDisplay){
        return todaysSlot;
    }
    else{
        let addedSlots = [];
        for (var i=0; i< (slotsToDisplay - todaysSlot.length); i++){
            addedSlots.push(timeSlots[1].hours[i]);
        }
        return [...todaysSlot, ...addedSlots];
    }
    
}

const UpcomingWeather = (props) =>{
    let days = calcTimeSlotsToAdd(props.weather);
   //console.log(days);
    return <div className="upcoming-weather">
        {days.map((slot) => <MiniWeather key={slot.dt} weather={slot} />)}
    </div>
}

export default UpcomingWeather;