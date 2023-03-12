import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@mui/material";
import { Search } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

import { TodayWeather } from "./WeatherComp/TodaWeather";
import { getWeather, formatDate } from "./Service/WeatherService";

import "./App.css";

// Images & Icons
import bgLight from "./Resources/Images/bg-light.png";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  bgImageStyle: {
    backgroundImage: `url(${bgLight})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    "@media(min-width: 769px)": {
      padding: 100,
    },
    "@media(max-width: 768px)": {
      padding: 20,
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
    minWidth: "80vw",
    "@media(min-width: 769px)": {
      height: 60,
    },
    "@media(max-width: 768px)": {
      height: 40,
    },
  },
  generalColor: {
    background: "rgba(255, 255, 255, 0.2)",
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
});

const App = (_) => {
  const classes = useStyles();
  const [searchVal, setSearchVal] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [alertDataNotFound, setAlertDataNotFound] = useState(false);

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

  const fetchWeather = async (searchVal) => {
    const resultWeather = await getWeather(searchVal);
    console.log("Weather fetched", resultWeather);
    switch (resultWeather.cod) {
      case "200":
      case 200:
        setAlertDataNotFound(false);
        insertIntoData(resultWeather);
        break;
      default:
        setAlertDataNotFound(true);
        break;
    }
  };

  const searchLocation = async (_) => fetchWeather(searchVal);

  return (
    <div className={`App ${classes.root}`}>
      <div className={classes.bgImageStyle}>
        {/* Search bar on top */}
        <div className={classes.searchDiv}>
          <TextField
            id="outlined-basic"
            label="Country"
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
          {alertDataNotFound && <Alert severity="error">Not Found</Alert>}
          <div style={{marginBottom: 120}}/>
          <TodayWeather
            currWeatherData={weatherData}
            fetchWeather={fetchWeather}
            handleSetWeatherData={(data) => setWeatherData([...data])}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
