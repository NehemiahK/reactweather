import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherWrapper from './components/WeatherWrapper';

class App extends Component {

  state = {
    weather:{},
    mounted:false
  };

  componentDidMount(){
    if (navigator.geolocation && !this.state.mounted){
      navigator.geolocation.getCurrentPosition((pos) => 
     {
      let lat = pos.coords.latitude;
      let long = pos.coords.longitude;
      let key = 'ff853c451e3b2c454853556df1598d0c'

      this.getWeatherData(lat,long,null);
    

     }
    );
    }
    
    this.setState({
      mounted:true
    })
  }

  getWeatherData = (lat,long,cityname) =>{
    
    let key = 'ff853c451e3b2c454853556df1598d0c';
    let url = 'https://api.openweathermap.org/data/2.5/forecast?'
    if (lat && long){
      url += `lat=${lat}&lon=${long}&appid=${key}&units=imperial`
    }
    else{
      let [city,country] = cityname.split(",");
      url += `q=${city},${country}&appid=${key}&units=imperial`
    }

    fetch(url)
    .then(res => res.json())
    
    .then(data => this.setState({
      weather: {
        location:data.city.name,
        country:data.city.country,
        forecast:data.list
      },
      gotit:true,
      icon: data.list[0].weather[0].icon,
      groupId: data.list[0].weather[0].main
    }))
    .catch(err => alert('Could not get weather for location'));
  }

  render() {
    return (
      <div className='App'> 
      { this.state.mounted && 
      <WeatherWrapper weather={this.state.weather} groupId={this.state.groupId} icon={this.state.icon} location={this.state.weather.location} getWeatherData={this.getWeatherData}/> 
      }
  </div> 
    );
  }
}

export default App;
