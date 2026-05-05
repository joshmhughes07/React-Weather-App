import { useState,useRef,useEffect,useContext} from 'react'
import './App.css'
import { MainForecast } from "./components/MainForecast.jsx"
import { ExtendedForecast } from "./components/ExtendedForecast.jsx"
import { Modal } from "./components/Modal.jsx"
import { Button } from './components/Button.jsx'
import { UnitSelection } from './components/UnitSelection.jsx'
import { ThemeContext } from './components/Context.jsx'


function App() {
  
  const [weatherData, setWeatherData] = useState(null);
  const [detailedForecastData, setDetailedForecastData] = useState([]);
  const [currentCity, setCurrentCity] = useState();
  const unitPrefs = useRef([{name:'Celsuis',value:''},{name:'Millimeter',value:''},{name:'Km/h',value:''}])
  const dialog = useRef(null);
  const [themePref,setThemePref] = useState(localStorage.getItem("WeatherAppThemePref")||"Background")
  console.log("THEME",themePref)
  const changeTheme = (isChecked)=>{
    isChecked? localStorage.setItem("WeatherAppThemePref","DarkBackground"):localStorage.setItem("WeatherAppThemePref","Background")
    isChecked? setThemePref("DarkBackground"):setThemePref("Background")
  }

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
        `https://api.open-meteo.com/v1/forecast?latitude=${currentCity?.latitude}&longitude=${currentCity?.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code,wind_speed_10m_max&hourly=temperature_2m,precipitation_probability,wind_speed_10m,showers,rain&timezone=auto${unitPrefs.current[0].value}${unitPrefs.current[1].value}${unitPrefs.current[2].value}`
      );
        setWeatherData(null)
      if (response.ok) {
        const myResponse = await response.json();
        setWeatherData(myResponse);
      }
      // throw new Error("Error with request");
    } catch (error) {
      console.log("MY ERROR",error);
    }
  };
  useEffect(() => {  
    if (localStorage.getItem("weatherDataCity")) { 
      setCurrentCity(JSON.parse(localStorage.getItem("weatherDataCity")));
    } else {
      //No previous Cities. Open city selection screen
      dialog.current.showModal();
    }
  }, []);

  useEffect(() => {
   
    if (currentCity) {
         localStorage.setItem("weatherDataCity", JSON.stringify(currentCity));
      asyncReq();
    }
  }, [currentCity]);

  return (
   <ThemeContext value={themePref}>
   <div className={`rootDiv ${themePref==="DarkBackground" ? "darkmode":"lightmode"}`}>
    {weatherData == null ? (
        <div className={`noPrevCityComp ${themePref}`}>
          <h3>No Previous Selected City Found</h3>
          <div>
          <Button onClick={()=>dialog.current.showModal()}><svg viewBox="0 0 512 512" width="25%" height="50%" title="flag">
          <path d="M349.565 98.783C295.978 98.783 251.721 64 184.348 64c-24.955 0-47.309 4.384-68.045 12.013a55.947 55.947 0 0 0 3.586-23.562C118.117 24.015 94.806 1.206 66.338.048 34.345-1.254 8 24.296 8 56c0 19.026 9.497 35.825 24 45.945V488c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-94.4c28.311-12.064 63.582-22.122 114.435-22.122 53.588 0 97.844 34.783 165.217 34.783 48.169 0 86.667-16.294 122.505-40.858C506.84 359.452 512 349.571 512 339.045v-243.1c0-23.393-24.269-38.87-45.485-29.016-34.338 15.948-76.454 31.854-116.95 31.854z" />
        </svg>{" "}
        Select City</Button></div></div>
      ) : (
      <>
        <MainForecast
          data={weatherData}
          cityName={currentCity?.name}
          dialog={dialog}
          handler={handleForecastChange}
          refreshHandler={asyncReq}
        />
        <UnitSelection
          dialog={dialog}
          refreshHandler={asyncReq}
          unitPrefs={unitPrefs}
          changeTheme={changeTheme}
          />
        </>
 )}
     <Modal dialog={dialog} citySetter={citySetter}></Modal>
    {detailedForecastData.length == 0 ? (
        <div></div>
      ) : (
        <ExtendedForecast data={detailedForecastData} />
      )}
      
   </div>
      </ThemeContext>
  )
}

export default App
