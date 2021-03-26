import React from "react";
import { getNews, getWeather } from "./requests";
import "./style.css";

class LocalNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      API_KEY: "3cef102b69944b309fdfd2d4d501a697",
      // API_KEY: "f47d4b584f204b09bc5e00beea835305",
      API_KEY_Weather: "aa99e959fec9c49afc55c51e9c046362",
      country: "",
      news: [],
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
        getNews(this.state.country).then((response) => {
          this.setState({ news: response.articles });
        });
      });
    });
  };

  renderNews = (newsArr) => {
    return (
      <div className="news__container">
        {newsArr.slice(0, 5).map((val, index) => {
          return (
            <div className="news__container__card" key={index}>
              <img
                className="news__container__card__img"
                src={val.urlToImage}
              />
              <div className="news__container__card__info">
                <p className="news__container__card__info__title">
                  {val.title}
                </p>
                <p className="news__container__card__info__description">
                  {val.description}
                </p>
                <a
                  className="news__container__card__info__readMore"
                  href={val.url}
                >
                  Read more
                </a>
                <div className="news__container__card__info__whoWhen">
                  <p className="news__container__card__info__whoWhen__who">
                    {val.author}
                  </p>
                  <p className="news__container__card__info__whoWhen__when">
                    {new Date(val.publishedAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return <div className="news">{this.renderNews(this.state.news)}</div>;
  }
}

export default LocalNews;
