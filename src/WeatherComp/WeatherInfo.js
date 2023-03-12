import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { SearchHistory } from "./SearchHistoryInfo";

const useStyles = makeStyles({
  displayColorText: {
    color: "#6C40B5",
  },
  tempText: {
    fontWeight: "bold",
    "@media(min-width: 769px)": {
      fontSize: 80,
    },
    "@media(max-width: 768px)": {
      fontSize: 40,
    },
  },
  weatherInfoDesktop: {
    "@media(max-width: 768px)": {
      visibility: "hidden",
    },
  },
  weatherInfoMobile: {
    verticalAlign: "bottom",
    "@media(min-width: 769px)": {
      visibility: "hidden",
    },
  },
  font700: {
    fontWeight: 700,
  },
  color6: {
    color: "#666666",
  },
});

export const WeatherInfo = (
  { currWeatherData, fetchWeather, handleSetWeatherData },
  ...props
) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    setWeatherData(currWeatherData);
  }, [currWeatherData]);

  return (
    <>
      {weatherData.length ? (
        <WeatherInfoGrid weatherData={currWeatherData} />
      ) : (
        ""
      )}
      <SearchHistory
        fetchWeather={fetchWeather}
        handleSetWeatherData={handleSetWeatherData}
        currWeatherData={currWeatherData}
      />
    </>
  );
};

const WeatherInfoGrid = ({ weatherData }, ...props) => {
  const classes = useStyles();

  const weatherInfoSpacing = { marginRight: "3vw" };

  return (
    <>
      <div className={`${classes.displayColorText} ${classes.tempText}`}>
        {weatherData[0].main.temp}&deg;
      </div>
      {/* Temperature info */}
      <div className={classes.weatherInfoDesktop}>
        H: {weatherData[0].main.temp_max}&deg; L: {weatherData[0].main.temp_min}
        &deg;
      </div>
      {/* Desktop version info */}
      <div className={classes.weatherInfoDesktop}>
        <Grid container spacing={2} column={12}>
          <Grid item md={8} lg={8}>
            {/* Location */}
            <span className={classes.font700}>
              <span className={classes.color6} style={weatherInfoSpacing}>
                {weatherData[0].name}, {weatherData[0].sys.country}
              </span>
            </span>
            {/* Date */}
            <span className={classes.color6}>{weatherData[0].searchDate}</span>
          </Grid>
          <Grid item md={4} lg={4}>
            <span className={classes.color6}>
              {/* Humidity */}
              <span style={weatherInfoSpacing}>
                Humidity: {weatherData[0].main.humidity}
              </span>
              {/* Weather condition */}
              {weatherData[0].weather[0].main}
            </span>
          </Grid>
        </Grid>
      </div>
      {/* Mobile version info */}
      <div className={classes.weatherInfoMobile}>
        <Grid container spacing={2} column={7}>
          <Grid item xs={3} s={3}>
            {/* Temperature info */}
            <div className={classes.weatherInfoMobile}>
              H: {weatherData[0].main.temp_max}&deg; L:{" "}
              {weatherData[0].main.temp_min}&deg;
            </div>
            {/* Location */}
            <div
              className={`${classes.font700} ${classes.color6}`}
              style={{ marginRight: "5vw" }}
            >
              {weatherData[0].name}, {weatherData[0].sys.country}
            </div>
          </Grid>
          <Grid item xs={4} s={4} md={4} lg={4}>
            <div className={classes.color6}>
              {/* Weather condition */}
              <div>{weatherData[0].weather[0].main}</div>
              {/* Humidity */}
              <div>Humidity: {weatherData[0].main.humidity}</div>
              {/* Date */}
              <div>{weatherData[0].searchDate}</div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
