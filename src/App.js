import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

import { getWeather, formatDate, dummyData } from "./Service/WeatherService";

import "./App.css";

// Images & Icons
import bgLight from "./Resources/Images/bg-light.png";
import sun from "./Resources/Images/sun.png";
import searchIcon from './Resources/Icons/Search.svg';
import deleteIcon from './Resources/Icons/Delete.svg';

const useStyles = makeStyles({
  root: {
    // some CSS that accesses the theme
    height: "100vh",
    width: "100vw",
    textAlign: "center",
  },
  bgImageStyle: {
    minHeight: "100%",
    minWidth: "100%",
    backgroundImage: `url(${bgLight})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    "@media(min-width: 769px)": {
      padding: 100,
    },
    "@media(max-width: 768px)": {
      padding: 20,
    },
  },
  todayWeather: {
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    borderRadius: "40px",
    textAlign: "left",
    position: "relative",
    padding: 80,
  },
  searchHistory: {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "24px",
    padding: 18,
  },
  searchedCountry: {
    background: "rgba(255, 255, 255, 0.4)",
    borderRadius: "16px",
    marginBottom: "18px",
    padding: 18,
    paddingBottom: 42,
    "@media(min-width: 769px)": {
      marginRight: 20,
    },
    "@media(max-width: 768px)": {
      marginRight: 13,
    },
  },
  searchDiv: {
    textAlign: "left",
    "@media(min-width: 769px)": {
      paddingTop: 50,
      paddingBottom: 50,
      marginBottom: 80,
    },
    "@media(max-width: 768px)": {
      paddingTop: 20,
      paddingBottom: 20,
      marginBottom: 50,
    },
  },
  searchField: {
    borderRadius: "20px",
    "@media(min-width: 769px)": {
      width: 620,
      height: 60,
    },
    "@media(max-width: 768px)": {
      width: 310,
      height: 40,
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
  tempText: {
    fontWeight: "bold",
    "@media(min-width: 769px)": {
      fontSize: 100,
    },
    "@media(max-width: 768px)": {
      fontSize: 50,
    },
  },
  searchBtn: {
    borderRadius: "20px",
    "@media(min-width: 769px)": {
      width: 60,
      height: 60,
      marginLeft: 20,
    },
    "@media(max-width: 768px)": {
      width: 40,
      height: 40,
      marginRight: 10,
    },
  },
  // *** overlapping
  weatherImageDiv: {
    position: "relative",
    bottom: 0,
    "@media(min-width: 769px)": {
      marginTop: -158,
      left: 360,
    },
    "@media(max-width: 768px)": {
      marginTop: -130,
      left: 120,
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
  divFloatLeft: {
    float: "left",
  },
  divFloatRight: {
    float: "right",
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

const App = (_) => {
  const classes = useStyles();
  const [searchVal, setSearchVal] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const handleSearchValChange = (e) => setSearchVal(e.target.value);

  const insertIntoData = (data) => {
    const currentDate = new Date();
    const weatherArr = [...weatherData];
    weatherArr.unshift({
      ...data,
      searchDate: `${formatDate(currentDate)}`,
    });
    setWeatherData([...weatherArr]);
  };

  // *** Don't delete, original code to fetch api
  const fetchWeather = async (searchVal) => {
    // *** Don't delete,original code to fetch api
    const resultWeather = await getWeather(searchVal);
    console.log("Weather fetched", resultWeather);
    switch (resultWeather.cod) {
      case "404":
      case 404:
        break;
      case "429":
      case 429:
        insertIntoData(dummyData);
        break;
      default:
        insertIntoData(resultWeather);
        break;
    }
  };

  const searchLocation = async (_) => {
    // *** Don't delete, original code to fetch api
    // fetchWeather(searchVal);

    // *** dummy data test just in case, to be deleted
    insertIntoData(dummyData);
  };

  const buttonCircle = {
    width: "34px",
    height: "63px",
    borderRadius: "70%",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    transform: "scale(0.75)",
  };

  return (
    <div className={`App ${classes.root}`}>
      <div className={classes.bgImageStyle}>
        <div className={classes.searchDiv}>
          <TextField
            id="outlined-basic"
            label="Country"
            // variant="outlined"
            className={`${classes.searchField} ${classes.generalColor}`}
            value={searchVal}
            onChange={(e) => handleSearchValChange(e)}
            InputProps={{
              disableUnderline: true,
              className: classes.generalColor,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={searchLocation}
            className={`${classes.searchBtn} ${classes.displayColor}`}
          >
            <Search />
          </Button>
        </div>
        <div className={classes.todayWeather}>
          <div className={classes.weatherImageDiv}>
            <img src={sun} alt="weather" className={classes.weatherImage} />
          </div>
          Today's Weather
          {weatherData.length ? (
            <>
              <div
                className={`${classes.displayColorText} ${classes.tempText}`}
              >
                {weatherData[0].main.temp}&deg;
              </div>
              <div>
                H: {weatherData[0].main.temp_max}&deg; L:{" "}
                {weatherData[0].main.temp_min}&deg;
              </div>
              <div className={classes.weatherInfoDesktop}>
                <Grid container spacing={2} column={10}>
                  <Grid item md={5} lg={5}>
                    {weatherData[0].name}, {weatherData[0].sys.country} {"  "}
                    {weatherData[0].searchDate} {"  "}
                  </Grid>
                  <Grid item md={6} lg={6}>
                    Humidity: {weatherData[0].main.humidity} {"  "}
                    {weatherData[0].weather[0].main}
                  </Grid>
                </Grid>
              </div>
              <div className={classes.weatherInfoMobile}>
                <Grid container spacing={2} column={10}>
                  <Grid item xs={5} s={5}>
                    {weatherData[0].name}, {weatherData[0].sys.country}
                  </Grid>
                  <Grid item xs={6} s={6}>
                    <div>{weatherData[0].weather[0].main}</div>
                    <div>Humidity: {weatherData[0].main.humidity}</div>
                    <div>{weatherData[0].searchDate}</div>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.searchHistory}>
                Search History
                {weatherData.map((weather, wIndex) => {
                  return (
                    <div key={wIndex} className={classes.searchedCountry}>
                      <div className={classes.divFloatLeft}>
                        {weather.name},{weather.sys.country}
                        <div className={classes.weatherInfoMobile}>
                          {weather.searchDate}
                        </div>
                      </div>
                      <div className={classes.divFloatRight}>
                        <span className={classes.weatherInfoDesktop}>
                          {weather.searchDate}
                        </span>
                        <Button
                          variant="contained"
                          onClick={(_) => {
                            // fetchWeather(weather.name);
                            // *** dummy data test just in case, to be deleted
                            insertIntoData(dummyData);
                          }}
                          // className={`${classes.searchBtn} ${classes.displayColor}`}
                          style={buttonCircle}
                        >
                          <img src={searchIcon} alt="delete icon" />
                        </Button>
                        <Button
                          variant="contained"
                          onClick={(_) => {
                            weatherData.splice(wIndex, 1);
                            setWeatherData([...weatherData]);
                          }}
                          // className={`${classes.searchBtn} ${classes.displayColor}`}
                          style={buttonCircle}
                        >
                          <img src={deleteIcon} alt="delete icon" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className={classes.searchHistory}>
              Search History
              <div className={classes.searchedCountry}>No record</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
