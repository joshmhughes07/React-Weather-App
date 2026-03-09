import { DailyTile } from "./DailyTile.jsx"

const MainForecast = ({ data, cityName, dialog, handler, refreshHandler })=>{
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
        <div>
      <div class="MainForecastHeading Background">
        <h3>
          This is the Weekly Forecast for {cityName} ({data.timezone} - {data.timezone_abbreviation})
        </h3>
      </div>
      <div class="ButtonParentDiv">
      <button class="Button Background" onClick={refreshHandler}>
        <svg
          viewBox="0 0 512 512"
          width="25%"
          height="50%"
          title="Refresh Data"
        >
          <path d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z" />
        </svg>{" "}
        Refresh Data
      </button>
      <button
        class="Background Button"
        onClick={() => {
          dialog.current.showModal();
        }}
      >
        <svg viewBox="0 0 512 512" width="25%" height="50%" title="flag">
          <path d="M349.565 98.783C295.978 98.783 251.721 64 184.348 64c-24.955 0-47.309 4.384-68.045 12.013a55.947 55.947 0 0 0 3.586-23.562C118.117 24.015 94.806 1.206 66.338.048 34.345-1.254 8 24.296 8 56c0 19.026 9.497 35.825 24 45.945V488c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-94.4c28.311-12.064 63.582-22.122 114.435-22.122 53.588 0 97.844 34.783 165.217 34.783 48.169 0 86.667-16.294 122.505-40.858C506.84 359.452 512 349.571 512 339.045v-243.1c0-23.393-24.269-38.87-45.485-29.016-34.338 15.948-76.454 31.854-116.95 31.854z" />
        </svg>{" "}
        Select City
      </button>
        </div>
      <div class="MainForecastParentDiv">
        <button class="left" onClick={() => scroller("left")}>
          <svg
            viewBox="0 0 256 512"
            width="40"
            title="arrow-left"
            fill="rgba(0,0,0,0.2)"
          >
            <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
          </svg>
        </button>
        <div class="MainForecastDiv" ref={MainForecastScrollBox}>
          {data.daily.time.map((day, index) => (
            <DailyTile
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
        <button class="right" onClick={() => scroller("right")}>
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
    </div>
    )
}

export { MainForecast }