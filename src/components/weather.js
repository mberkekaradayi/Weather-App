import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=47d2c9a35c63b7400c4dbaeb61cb53c1&units=metric`;

  const fetchLocation = async (e = {}) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(URL);
      setData(response.data);
      console.log(response.data); // to check what we have on object
    } catch (error) {
      setLocation("");
      // setData({});
      console.error(error);
      alert("Please enter a valid location ");
    } finally {
      setIsLoading(false);
    }
  };

  // side effect of api request
  useEffect(() => {
    fetchLocation({});
  }, []);

  return (
    <div className="app">
      <div className="title-wrapper">
        <h1 className="title  font-black text-5xl text-stone-50 text-center">
          WeatherNow{" "}
        </h1>
      </div>

      <div className="search">
        <form onSubmit={fetchLocation}>
          <input
            type="text"
            placeholder="Enter Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="bg-sunset text-white py-3 px-6 rounded-full shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl ml-3s">
            Find
          </button>
        </form>
      </div>

      <div className="container">
        <div className="top">
          <a href={`https://en.wikipedia.org/wiki/${location}`}>
            {data.sys ? (
              <p className="city-name">
                {" "}
                {data.name}, {data.sys.country}
              </p>
            ) : null}
          </a>
          <div className="temp">
            {data.main ? (
              <h1>
                {" "}
                {Math.round(data.main.temp)} <span>&deg;C</span>
              </h1>
            ) : null}
            <div className="description">
              {data.weather ? (
                <p>
                  {data.weather[0].description.charAt(0).toUpperCase() +
                    data.weather[0].description.slice(1)}
                  <span>
                    <img
                      className="logo"
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                      alt="weather icon"
                    />
                  </span>
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {" "}
                  {Math.round(data.main.feels_like)} &deg; C
                </p>
              ) : null}
              <p2>Feels Like</p2>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p2>Humidity</p2>
            </div>
            <div className="windy">
              {" "}
              {data.wind ? (
                <p className="bold">{Math.round(data.wind.speed)} km/h</p>
              ) : null}
              <p2>Wind</p2>
            </div>
          </div>
        )}
      </div>

      <div>
        <a
          className="footer fixed bottom-3 antialiased w-full text-center py-2 font-source-sans-pro font-helvetica font-sans text-white text-opacity-20 cursor-default text-s uppercase tracking-wider hover:text-white"
          href="https://mberkekaradayi.com/"
        >
          &copy;MBK
        </a>
      </div>
    </div>
  );
}

export default Weather;
