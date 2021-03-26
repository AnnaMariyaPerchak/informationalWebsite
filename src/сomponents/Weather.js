import React from "react";
import { getWeather } from "./requests";
import "./style.css";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      API_KEY: "aa99e959fec9c49afc55c51e9c046362",
      latitude: "",
      longitude: "",
      country: "",
      city: "",
      weather: [],
      iconUrl: "",
      description: "",
      date: {
        day: 0,
        hour: 0,
        minute: 0,
        year: 0,
      },
      temperature: {
        moment: 0,
        feelsLike: 0,
        minTemp: 0,
        maxTemp: 0,
      },

      rain: {
        description: "",
        volume: 0,
      },
      snow: {
        description: "",
        volume: 0,
      },
      wind: {
        speed: 0,
        deg: 0,
      },
      thunderstorm: "",
      drizzle: "",
      atmosphere: "",
      clearSky: "",
      clouds: "",

      rainBoolean: false,
      snowBoolean: false,
      thunderstormBoolean: false,
      drizzleBoolean: false,
      atmosphereBoolean: false,
      clearSkyBoolean: false,
      cloudsBoolean: false,
    };
  }

  ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      getWeather(
        this.state.API_KEY,
        this.state.latitude,
        this.state.longitude
      ).then((response) => {
        this.setState({
          country: response.sys.country,
          city: response.name,
          date: {
            day: new Date(Date.now()).getDay(),
            data: new Date(Date.now()).getDate(),
            month: new Date(Date.now()).getMonth(),
            year: new Date(Date.now()).getFullYear(),
          },
          weather: response.weather,
          temperature: {
            moment: Math.round(response.main.temp),
            feelsLike: Math.round(response.main.feels_like),
            minTemp: Math.floor(response.main.temp_min),
            maxTemp: Math.round(response.main.temp_max),
          },
          wind: {
            speed: response.wind.speed,
            deg: response.wind.deg,
          },
        });

        for (let i = 0; i < this.state.weather.length; i++) {
          this.setState({
            iconUrl: `http://openweathermap.org/img/w/${this.state.weather[0].icon}.png`,
            description: this.state.weather[0].description,
          });
          if (this.state.weather[i].id.toString().startsWith("2")) {
            this.setState({
              thunderstormBoolean: true,
              thunderstorm: this.state.weather[i].description,
            });
          }

          if (this.state.weather[i].id.toString().startsWith("3")) {
            this.setState({
              drizzleBoolean: true,
              drizzle: this.state.weather[i].description,
            });
          }

          if (this.state.weather[i].id.toString().startsWith("5")) {
            this.setState({
              rainBoolean: true,
              rain: {
                description: this.state.weather[i].description,
                volume: this.state.rain["1h"],
              },
            });
          }

          if (this.state.weather[i].id.toString().startsWith("6")) {
            this.setState({
              snowBoolean: true,
              snow: {
                description: this.state.weather[i].description,
                volume: this.state.snow["1h"],
              },
            });
          }

          if (this.state.weather[i].id.toString().startsWith("7")) {
            this.setState({
              atmosphereBoolean: true,
              atmosphere: this.state.weather[i].description,
            });
          }

          if (this.state.weather[i].id === 800) {
            this.setState({
              clearSkyBoolean: true,
              clearSky: this.state.weather[i].description,
            });
          }

          if (
            this.state.weather[i].id.toString().startsWith("80") &&
            this.state.weather[i].id !== 800
          ) {
            this.setState({
              cloudsBoolean: true,
              clouds: this.state.weather[i].description,
            });
          }
        }
      });
    });
  };

  render() {
    return (
      <div className="weather">
        <h1 className="weather__title">Weather forecast</h1>
        <div style={{ display: "flex" }}>
          <div className="weather__local">
            <div className="weather__local__left">
              <h2 className="weather__local__left__city weather__local__left__text">
                {this.state.city}
              </h2>
              {this.state.date.day === 0 && (
                <p className="weather__local__left__text">Sunday</p>
              )}
              {this.state.date.day === 1 && (
                <p className="weather__local__left__text">Monday</p>
              )}
              {this.state.date.day === 2 && (
                <p className="weather__local__left__text">Tuesday</p>
              )}
              {this.state.date.day === 3 && (
                <p className="weather__local__left__text">Wednesday</p>
              )}
              {this.state.date.day === 4 && (
                <p className="weather__local__left__text">Thursday</p>
              )}
              {this.state.date.day === 5 && (
                <p className="weather__local__left__text">Friday</p>
              )}
              {this.state.date.day === 6 && (
                <p className="weather__local__left__text">Saturday</p>
              )}
              <p className="weather__local__left__text">
                {this.state.date.data}/{this.state.date.month}/
                {this.state.date.year}
              </p>
              <p className="weather__local__left__text">
                Wind {this.state.wind.speed * 3.6} km/h
              </p>
              <p className="weather__local__left__text">
                {this.ucFirst(this.state.description)}
              </p>
            </div>
            <div className="weather__local__center">
              <img src={this.state.iconUrl} alt="icon" />
            </div>
            <div className="weather__local__right">
              <p className="weather__local__right__momentTemp">
                {this.state.temperature.moment + String.fromCharCode(176)}
              </p>
              <p className="weather__local__right__text">
                Feels like{" "}
                {this.state.temperature.feelsLike + String.fromCharCode(176)}
              </p>
              <div id="minTemp">Min {this.state.temperature.minTemp}</div>
              <p id="maxTemp">Max {this.state.temperature.maxTemp}</p>
            </div>
          </div>
          <div className="weather__addInfo">
            {this.state.thunderstormBoolean && (
              <div className="weather__addInfo__chapter">
                <p className="weather__addInfo__chapter__title">
                  About thunderstorm
                </p>
                <p className="weather__addInfo__chapter__info">
                  {this.ucFirst(this.state.thunderstorm)}
                </p>
              </div>
            )}
            {this.state.drizzleBoolean && (
              <p className="weather__addInfo__chapter">
                <p className="weather__addInfo__chapter__title">
                  About drizzle
                </p>
                <p className="weather__addInfo__chapter__info">
                  {this.ucFirst(this.state.drizzle)}
                </p>
              </p>
            )}
            {this.state.rainBoolean && (
              <div className="weather__addInfo__chapter">
                <p className="weather__addInfo__title__chapter">About rain</p>
                <p className="weather__addInfo__info__chapter">
                  {this.ucFirst(this.state.rain.description)}
                </p>
                <p className="weather__addInfo__info__chapter">
                  Rain volume:{this.state.rain.volume}
                </p>
              </div>
            )}
            {this.state.snowBoolean && (
              <div className="weather__addInfo__chapter">
                <p className="weather__addInfo__chapter__title">About snow</p>
                <p className="weather__addInfo__chapter__info">
                  {this.ucFirst(this.state.snow.description)}
                </p>
                <p className="weather__addInfo__chapter__info">
                  Snow volume:{this.state.snow.volume}
                </p>
              </div>
            )}
            {this.state.atmosphereBoolean && (
              <p className="weather__addInfo__chapter">
                <p className="weather__addInfo__chapter__title">
                  About atmosphere
                </p>
                <p className="weather__addInfo__chapter__info">
                  {this.ucFirst(this.state.atmosphere)}
                </p>
              </p>
            )}
            {this.state.clearSkyBoolean && (
              <p className="weather__addInfo__chapter">
                <p className="weather__addInfo__chapter__title">About sky</p>
                <p className="weather__addInfo__chapter__info">
                  {this.ucFirst(this.state.clearSky)}
                </p>
              </p>
            )}
            {this.state.cloudsBoolean && (
              <p className="weather__chapter__addInfo">
                <p className="weather__addInfo__chapter__title">About clouds</p>
                <p className="weather__addInfo__chapter__info">
                  {this.ucFirst(this.state.clouds)}
                </p>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
