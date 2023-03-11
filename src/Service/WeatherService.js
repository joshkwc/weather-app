export const getWeather = async (searchVal) => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&APPID=f95ce9d8445f6d87196fbcad895bcf39`
  ).then((resp) => {
    return resp.json();
  });
};

export const formatDate = (date) => {
  const convertHr = (h) => {
    switch (h < 10 === true) {
      case true:
        return h === 0 ? 12 : `0${h % 12}`;
      default:
        return h < 12 ? h % 12: h;
    }
  };
  let hr = date.getHours();
  let min = date.getMinutes();
  return `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${convertHr(hr)}:${min >= 10 ? min : `0${min}`}${
    hr >= 12 ? "pm" : "am"
  }`;
};

export const dummyData = {
  coord: {
    lon: -0.1257,
    lat: 51.5085,
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04n",
    },
  ],
  base: "stations",
  main: {
    temp: 272.96,
    feels_like: 271.05,
    temp_min: 270.72,
    temp_max: 274.31,
    pressure: 1006,
    humidity: 84,
  },
  visibility: 10000,
  wind: {
    speed: 1.58,
    deg: 56,
    gust: 2.82,
  },
  clouds: {
    all: 99,
  },
  dt: 1678495997,
  sys: {
    type: 2,
    id: 2075535,
    country: "GB",
    sunrise: 1678515882,
    sunset: 1678557406,
  },
  timezone: 0,
  id: 2643743,
  name: "London",
  cod: 200,
};
