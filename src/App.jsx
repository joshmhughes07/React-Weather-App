import { useState,useRef,useEffect,use,Suspense } from 'react'
import './App.css'
import { MainForecast } from "./components/MainForecast.jsx"
import { PlaceHolder } from "./components/Placeholder.jsx"
import { ExtendedForecast } from "./components/ExtendedForecast.jsx"
import { Modal } from "./components/Modal.jsx"
import { Loading } from './components/Loading.jsx'

//need a way to select cities if no data is available -- refactor the buttons out of mainForecast to use when mainforecast doesnt load due to errors or no city selection ()
//mainforecast has more than JUST mainforecast duties (wrong)
//loading component used when needed using conditional rendering 
function App() {
  
   const [weatherData, setWeatherData] = useState(null);
  const [detailedForecastData, setDetailedForecastData] = useState([]);
  const [currentCity, setCurrentCity] = useState();
  const dialog = useRef(null);
  console.log(currentCity);

  const handleForecastChange = (date) => {
    let dayAndTime = weatherData.hourly.time.map((dayTime) =>
      dayTime.split("T")
    );

    let hourPacker = weatherData.hourly.time.map((el, index) => {
      return {
        date: dayAndTime[index][0],
        time: dayAndTime[index][1],
        temp: weatherData.hourly.temperature_2m[index],
        precipProb: weatherData.hourly.precipitation_probability[index],
        rain: weatherData.hourly.rain[index],
        showers: weatherData.hourly.showers[index],
        wind: weatherData.hourly.wind_speed_10m[index],
        tempUnit: weatherData.hourly_units.temperature_2m,
        rainUnit: weatherData.hourly_units.rain,
        precipUnit: weatherData.hourly_units.precipitation_probability,
        windUnit: weatherData.hourly_units.wind_speed_10m,
        showerUnit: weatherData.hourly_units.showers
      }; //,
    });

    let singleDay = hourPacker.filter((entry) => entry.date.includes(date[0]));

    setDetailedForecastData(singleDay);
  };

  const citySetter = (city) => {
    setCurrentCity(city);
  };
  const asyncReq = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${currentCity?.latitude}&longitude=${currentCity?.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code,wind_speed_10m_max&hourly=temperature_2m,precipitation_probability,wind_speed_10m,showers,rain&timezone=auto`
      );

      if (response.ok) {
        const myResponse = await response.json();
        console.log(myResponse);
        setWeatherData(myResponse);
      }
      // throw new Error("Error with request");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {  
    if (localStorage.getItem("weatherDataCity")==true) { 
      console.log("Previously Selected City Found. " + localStorage.getItem('weatherDataCity'));
      setCurrentCity(JSON.parse(localStorage.getItem("weatherDataCity")));
    } else {
      //No previous Cities. Open city selection screen
      dialog.current.showModal();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("weatherDataCity", JSON.stringify(currentCity));
    if (currentCity) {
      asyncReq();
    }
  }, [currentCity]);



  return (
   <div>
    <Modal dialog={dialog} citySetter={citySetter}></Modal>
    {weatherData == null ? (
        <Loading/>
      ) : (
      
        <MainForecast
          data={weatherData}
          cityName={currentCity?.name}
          dialog={dialog}
          handler={handleForecastChange}
          refreshHandler={asyncReq}
        />
 )}
    {detailedForecastData.length == 0 ? (
        <PlaceHolder />
      ) : (
        <ExtendedForecast data={detailedForecastData} />
      )}
   </div>
  )
}

export default App
