import React, {Component} from 'react';
import WeatherCard from './WeatherCard';
import WeatherNow from './WeatherNow';
import UpcomingWeather from './UpcomingWeather';
import './weatherwrapper.css';

class WeatherWrapper extends Component {
    constructor(props){
        super(props);

        this.state ={
            search:''
        }
    }

    enterKey = (event) => {
        if(event.keyCode === 13) {
            this.props.getWeatherData(null,null,this.state.search);
        }
       
    }

    componentDidMount(){
         document.addEventListener("keydown", this.enterKey, false);
         //this.getForecasts();
    }

    getForecasts = () =>{
        let allForecasts = this.props.weather.forecast;
        //console.log(allForecasts);
         let forecasts= []; // an array that will contain each days 3 hour forecast for 5 days
         let dt; // most recent date 
     
         for (let i=0; i< allForecasts.length; i++){
             let day = this.dateOnly(allForecasts[i].dt_txt);
             
             if(dt !== day){ // check if dt had alread been created
                 dt = day // change the dt to current object date
                 let dayObject = {hours:[]}; // create a day object if need be, otherwise put in most recent object
                 forecasts.push(dayObject); // add the day to the forecasts
             }
             if(day === dt){ // if its the same date, add the hours to the date.
                 forecasts[forecasts.length -1].hours.push(allForecasts[i]); // most recent object place
             }
             
         }

         this.setState({
            forecasts
         });
    }

    dateOnly = (time) => {
        time = time.split(" ");
        return time[0];
    }

    handleClick = (e) =>{
        this.setState({
            day: this.state.day + Number(e.target.name)
        })
    }

    componentDidUpdate(prevProps,prevState) {
        if (this.props.weather !== prevProps.weather) {
          this.getForecasts();
        }
      }

      getWeatherBackground(type,time){
        const rainyTypes = ['Thunderstorm','Drizzle','Rain','Atmosphere']; //Snow, Atmosphere, Clear, Clouds
        let background;
        let day;
        if(type){
          if (rainyTypes.includes(type)){
            background = 'Rain';
          }
      
          else{
            background = type;
          }
    
        }
       
        if(time){
          if(time.includes('n')){
            background += ' night'
          }
          else{
            background += ' day'
          }
    
        }
        if(background){
          background = background.toLowerCase();
        }
              
        return background;
      }

      handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
      }
     

    render(){
        return <div className={"weather-wrapper " + this.getWeatherBackground(this.props.groupId, this.props.icon) }>
            {
                !this.state.forecasts && <div style={{color:"black"}}>Allow access to location, to get weather from location, or use the search...</div>
            }
            <div className="location-name"> {this.props.location} </div>
            <input type="text" placeholder="ex: England,uk" value={this.state.search} onChange={this.handleChange}/>
            {
                this.state.forecasts &&  <WeatherNow weather={this.state.forecasts[0].hours[0]} />
                                          
            }
            {
                this.state.forecasts &&   <UpcomingWeather weather={this.state.forecasts} />
            }
            <div className="weather-card-wrapper">
            {
               this.state.forecasts && this.state.forecasts.map( (day) => <WeatherCard key ={day.hours[0].dt} day={day}/>)
            }
            </div>
            

            </div>
    }

    
}

export default WeatherWrapper;