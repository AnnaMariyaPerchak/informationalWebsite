import React from "react";
import { getExchange, getExchangeNumber, getWeather } from "./requests";
import "./style.css";

class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      API_KEY: "bdf1f1a85d4242bd98d0da3ab167fbe5",
      API_KEY_Weather: "aa99e959fec9c49afc55c51e9c046362",
      country: "",
      exchangeCountry: "",
      numbCountry: 0,
      numbEUR: 0,
      numbJPY: 0,
      numbGBP: 0,
      numbCHF: 0,
    };
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      getWeather(
        this.state.API_KEY_Weather,
        this.state.latitude,
        this.state.longitude
      ).then((response) => {
        this.setState({
          country: response.sys.country,
        });

        getExchange().then((response) => {
          for (const pr in response) {
            if (pr.includes(this.state.country)) {
              this.setState({ exchangeCountry: response[pr] });
            }
          }
        });

        getExchangeNumber(this.state.API_KEY).then((response) => {
          for (const pr in response.rates) {
            if (pr.includes(this.state.country)) {
              this.setState({ numbCountry: response.rates[pr] });
            }
            if (pr === "EUR") {
              this.setState({ numbEUR: response.rates[pr] });
            }

            if (pr === "JPY") {
              this.setState({ numbJPY: response.rates[pr] });
            }

            if (pr === "GBP") {
              this.setState({ numbGBP: response.rates[pr] });
            }

            if (pr === "CHF") {
              this.setState({ numbCHF: response.rates[pr] });
            }
          }
        });
      });
    });
  };

  render() {
    return (
      <div className="exchange">
        <p>
          1 USD = {this.state.numbCountry.toFixed(2)}{" "}
          {this.state.exchangeCountry}
        </p>
        <p>
          1 EUR = {(this.state.numbCountry / this.state.numbEUR).toFixed(2)}{" "}
          {this.state.exchangeCountry}
        </p>
        <p>
          1 JPY = {(this.state.numbCountry / this.state.numbJPY).toFixed(2)}{" "}
          {this.state.exchangeCountry}
        </p>
        <p>
          1 GBP = {(this.state.numbCountry / this.state.numbGBP).toFixed(2)}{" "}
          {this.state.exchangeCountry}
        </p>
        <p>
          1 CHF = {(this.state.numbCountry / this.state.numbCHF).toFixed(2)}{" "}
          {this.state.exchangeCountry}
        </p>
      </div>
    );
  }
}

export default Exchange;
