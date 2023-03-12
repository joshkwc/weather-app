import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { WeatherInfo } from "./WeatherInfo";
import sun from "../Resources/Images/sun.png";

const useStyles = makeStyles({
  todayWeather: {
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    borderRadius: "40px",
    textAlign: "left",
    position: "relative",
    padding: 80,
  },
  // *** overlapping
  weatherImageDiv: {
    position: "relative",
    bottom: 0,
    width: '20%',
    "@media(min-width: 769px)": {
      marginTop: -158,
    },
    "@media(max-width: 768px)": {
      marginTop: -130,
    },
    "@media(min-width: 1280px)": {
      left: "60vw",
    },
    "@media(min-width: 1024px) and (max-width: 1279px)": {
      left: "40vw",
    },
    "@media(min-width: 849px) and (max-width: 1023px)": {
      left: "30vw",
    },
    "@media(min-width: 769px) and (max-width: 848px)": {
      left: "22vw",
    },
    "@media(min-width: 480px) and (max-width: 768px)": {
      left: "55vw",
    },
    "@media(max-width: 479px)": {
      left: "25vw",
    },
  },
  weatherImage: {
    position: "relative",
    bottom: 0,
    "@media(min-width: 769px)": {
      width: 281.67,
      height: 251.11,
    },
    "@media(max-width: 768px)": {
      width: 157,
      height: 157,
    },
  },
});

export const TodayWeather = (
  { currWeatherData, fetchWeather, handleSetWeatherData },
  ...props
) => {
  const classes = useStyles();
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    setWeatherData(currWeatherData);
  }, [currWeatherData]);

  return (
    <div className={classes.todayWeather}>
      <div className={classes.weatherImageDiv}>
        <img src={sun} alt="weather" className={classes.weatherImage} />
      </div>
      <div style={{ marginBottom: weatherData.length ? 0 : 10 }}>
        Today's Weather
      </div>
      <WeatherInfo
        fetchWeather={fetchWeather}
        handleSetWeatherData={handleSetWeatherData}
        currWeatherData={currWeatherData}
      />
    </div>
  );
};
