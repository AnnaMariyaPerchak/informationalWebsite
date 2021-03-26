export function getWeather(api_key,lat,lon){
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`,{method: "GET"})
    .then((response) => response.json())
    .then((data) => {return data})
    .catch(error => {
      console.error(error);
  });
  };


  export function getExchange(){
    return fetch(`https://openexchangerates.org/api/currencies.json`,{method: "GET"})
    .then((response) => response.json())
    .then((data) => {return data})
    .catch(error => {
      console.error(error);
  });
  }

  export function getExchangeNumber(api_key){
    return fetch(`https://openexchangerates.org/api/latest.json?app_id=${api_key}`,{method: "GET"})
    .then((response) => response.json())
    .then((data) => {return data})
    .catch(error => {
      console.error(error);
  });
  }

  export async function getNews(country,api_key){ 
    return await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${api_key}`,{method: "GET"})
    .then((response) => response.json())
    .then((data) => {return data})
    .catch(error => {
      console.error(error);
  });
  }