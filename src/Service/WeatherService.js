export const getWeather = async (searchVal) => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&APPID=f95ce9d8445f6d87196fbcad895bcf39`
  ).then((resp) => {
    return resp.json();
  });
};

export const formatDate = (date) => {
  const convertHr = (h) => {
    switch ((h < 10) === true) {
      case true:
        return h === 0 ? 12 : `0${h % 12}`;
      default:
        return h > 12 ? h % 12: h;
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
