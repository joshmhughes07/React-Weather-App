import { DailyTile } from "./DailyTile.jsx"
import { useRef,useEffect } from "react";
import "./styling/MainForecastStyling.css";

const MainForecast = ({ data, cityName ,handler})=>{
    const MainForecastScrollBox = useRef(null);
    
    // //Resets the scroll to 0 for every render
      useEffect(()=>{
      MainForecastScrollBox.current.scrollTo({
          top: 0,
          left: MainForecastScrollBox.current.scrollLeft = 0,
          behavior: "smooth"
        })
    })

    const scroller = (direction) => {
    direction == "left"
      ? MainForecastScrollBox.current.scrollTo({
          top: 0,
          left: MainForecastScrollBox.current.scrollLeft - 220,
          behavior: "smooth"
        })
      : MainForecastScrollBox.current.scrollTo({
          top: 0,
          left: MainForecastScrollBox.current.scrollLeft + 220,
          behavior: "smooth"
        });
  };
    
    return(
        <>
      <div className="MainForecastHeading Background">
        <h3>
          This is the Weekly Forecast for ({cityName}) ({data.timezone} - {data.timezone_abbreviation})
        </h3>
      </div>
      <div className="MainForecastParentDiv">
        <button className="left" onClick={() => scroller("left")}>
          <svg
            viewBox="0 0 256 512"
            width="40"
            title="arrow-left"
            fill="rgba(0,0,0,0.2)"
          >
            <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
          </svg>
        </button>
        <div className="MainForecastDiv" ref={MainForecastScrollBox}>
          {data.daily.time.map((day, index) => (
            <DailyTile key={index}
              tempInfo={[
                Object.values(data.daily)[1][index],
                Object.values(data.daily)[2][index],
                Object.values(data.daily_units)[1],
                Object.values(data.daily_units)[2]
              ]}
              rainInfo={[
                Object.values(data.daily)[3][index],
                Object.values(data.daily_units)[3]
              ]}
              weatherCode={[Object.values(data.daily)[4][index]]}
              date={[Object.values(data.daily)[0][index]]}
              isToday={index == 0}
              clickHandler={handler}
              windInfo={[
                Object.values(data.daily)[5][index],
                Object.values(data.daily_units)[5]
              ]}
            />
          ))}
        </div>
        <button className="right" onClick={() => scroller("right")}>
          <svg
            viewBox="0 0 256 512"
            width="40"
            title="arrow-right"
            fill="rgba(0,0,0,0.2)"
          >
            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
          </svg>
        </button>
      </div>
    </>
    )
}

export { MainForecast }