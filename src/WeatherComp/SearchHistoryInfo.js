import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import searchIcon from "../Resources/Icons/Search.svg";
import deleteIcon from "../Resources/Icons/Delete.svg";

const useStyles = makeStyles({
  searchHistory: {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "24px",
    padding: 18,
  },
  searchedCountry: {
    background: "rgba(255, 255, 255, 0.4)",
    borderRadius: "16px",
    marginBottom: 18,
    padding: 10,
    "@media(min-width: 769px)": {
      marginRight: 20,
    },
    "@media(max-width: 768px)": {
      marginRight: 13,
    },
  },
  generalColor: {
    background: "rgba(255, 255, 255, 0.2)",
  },
  displayColor: {
    background: "#6C40B5",
  },
  displayColorText: {
    color: "#6C40B5",
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
});

export const SearchHistory = (
  { currWeatherData, fetchWeather, handleSetWeatherData },
  ...props
) => {
  const classes = useStyles();
  const [weatherData, setWeatherData] = useState([]);

  const searchHistoryText = { marginBottom: 26 };

  useEffect(() => {
    setWeatherData(currWeatherData);
  }, [currWeatherData]);

  return (
    <div className={classes.searchHistory}>
      <div style={searchHistoryText}>Search History</div>
      {weatherData.length ? (
        weatherData.map((weather, wIndex) => {
          return (
            <SearchedCountryCard
              wIndex={wIndex}
              weather={weather}
              fetchWeather={fetchWeather}
              weatherData={weatherData}
              handleSetWeatherData={handleSetWeatherData}
            />
          );
        })
      ) : (
        <div className={classes.searchedCountry}>No record</div>
      )}
    </div>
  );
};

const SearchedCountryCard = (
  { wIndex, weather, fetchWeather, weatherData, handleSetWeatherData },
  ...props
) => {
  const classes = useStyles();

  const flexRow = { display: "flex", flexDirection: "row" };

  const buttonCircle = {
    width: "34px",
    height: "63px",
    borderRadius: "70%",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transform: "scale(0.7)",
  };

  return (
    <div key={wIndex} className={classes.searchedCountry}>
      <Grid
        container
        spacing={2}
        column={12}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={6} s={6} md={6} lg={6}>
          {weather.name},{weather.sys.country}
          <div className={classes.weatherInfoMobile}>{weather.searchDate}</div>
        </Grid>
        <Grid item xs={6} s={6} md={6} lg={6}>
          <div style={{ ...flexRow, alignItems: "center" }}>
            <div className={classes.weatherInfoDesktop}>
              {weather.searchDate}
            </div>
            <div style={flexRow}>
              <Button
                variant="contained"
                onClick={(_) => {
                  fetchWeather(weather.name);
                }}
                style={buttonCircle}
              >
                <img src={searchIcon} alt="delete icon" />
              </Button>
              <Button
                variant="contained"
                onClick={(_) => {
                  weatherData.splice(wIndex, 1);
                  handleSetWeatherData([...weatherData]);
                }}
                style={buttonCircle}
              >
                <img src={deleteIcon} alt="delete icon" />
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
