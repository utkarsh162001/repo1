import React,{ Component} from "react";
import SearchBar from './components/searchBar';
import WeatherDetails from './components/weatherDetails.js';
import Navbar from './components/navbar.js';

class WeatherApp extends Component
{
  constructor(props){
    super(props);
    this.state = {
      cityNameFound: null,
      cityNameError: false,
      loadingIndicator: false,
      cityName: null,
      cityTemprature: null,
      cityWeatherDescription: null,
      cityWind: null,
      cityHumidity: null,
      cityMaxTmp: null,
      cityMinTmp: null,
      cityPressure: null,
      citySunrise: null,
      citySunset:null,
      cityCountry: null,
    }
    console.log("Constructor of WeatherApp class loaded.");
    this.searchCity = this.searchCity.bind(this);
  }
  searchCity(name){
    this.setState({
      cityNameFound: false,
      loadingIndicator: true,
      cityNameError: false
    })
    let that = this;
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+name+"&appid=80186bc6ef5c092a7aa7bcdb10ea8c80&units=metric")
    .then(function(response){
      return response.json();
    })
    .then(function(response){
      if(response.cod === "404"){
        that.setState({
          cityNameFound: false,
          cityNameError: true,
          loadingIndicator: false
        })
      }
      else if(response.cod === 200){
        console.log("Response from openweathermap api",response);
        let sunrise = new Date(response.sys.sunrise*1000).toLocaleTimeString();
        let sunset = new Date(response.sys.sunset*1000).toLocaleTimeString();
        that.setState({
          cityNameFound: true,
          cityNameError: false,
          cityName: response.name,
          cityTemprature: response.main.temp,
          cityWeatherDescription: response.weather[0].main,
          cityWind : response.wind.speed,
          cityHumidity: response.main.humidity,
          cityMaxTmp: response.main.temp_max,
          cityMinTmp: response.main.temp_min,
          cityPressure: response.main.pressure,
          weatherIcon: response.weather[0].icon,
          loadingIndicator: false,
          cityCountry: response.sys.country,
          citySunrise: sunrise,
          citySunset: sunset
        })
      }
    });
  }
  render(){
    let showErrorMessage = this.state.cityNameFound === true ? (
      <div
      style = {{background: '#FFFFFF', color:'grey',textAlign:'center',boxShadow:'0px 4px 32px rgba(143,143,143,0.4)',borderRadius:'4px',padding:'10px',marginTop:'10px',paddingBottom:'10px',marginLeft:'15%',marginRight:'15%'}}
      >
        <h4>Welcome to Weather App,report is generate</h4>
      </div>
    ) : (''
    )
    let showTemperatureDetails = this.state.cityNameFound === true ? (
      <WeatherDetails
      cityName = {this.state.cityName}
      cityTemprature = {this.state.cityTemprature}
      cityWeatherDescription = {this.state.cityWeatherDescription}
      cityWind = {this.state.cityWind}
      cityHumidity = {this.state.cityHumidity}
      cityMaxTmp = {this.state.cityMaxTmp}
      cityMinTmp = {this.state.cityMinTmp}
      cityPressure = {this.state.cityPressure}
      weatherIcon = {this.state.weatherIcon}
      citySunset = {this.state.citySunset}
      citySunrise = {this.state.citySunrise}
      cityCountry = {this.state.cityCountry}
      ></WeatherDetails>
    ) : (
      this.state.loadingIndicator === true ? (
        <div
        style = {{background: '#FFFFFF', color:'grey',textAlign:'center',boxShadow:'0px 4px 32px rgba(143,143,143,0.4)',borderRadius:'4px',padding:'10px',marginTop:'10px',paddingBottom:'10px',marginLeft:'15%',marginRight:'15%'}}
        >
          <h4>Searching City Name..</h4>
        </div>
      ) : (' ')
    )
    return (
      <div>
        <Navbar></Navbar>
        <br/>
        <SearchBar searchCity = {this.searchCity} ></SearchBar>
        {showErrorMessage}
        {showTemperatureDetails}
      </div>
    );
  }
}

export default WeatherApp;