//An area where the unit selection and future settings will be




//THEN CHANGE USEREF TO STORE THE VALUES WITHOUT CAUSING RENDERS UNTIL THE RELOAD DATA BUTTON IS PRESSED
//THEN TAKE THE VALUES FOR THE API CALL


import "./styling/UnitSelectionStyling.css"
import { Button } from "./Button"
import { useRef,useState } from "react"

const UnitSelection = ({dialog,refreshHandler,unitPrefs,themeBool})=>{
  const TempDD = useRef(null)
  const RainDD = useRef(null)
  const WindDD = useRef(null)
  
  const [TempPreference,setTempPreference] = useState(unitPrefs.current[0].name)
  const [RainPreference,setRainPreference] = useState(unitPrefs.current[1].name)
  const [WindPreference,setWindPreference] = useState(unitPrefs.current[2].name)
  //const TempPreference = useRef({name:'Celsuis',value:''})
  //const RainPreference = useRef({name:'Millimeter',value:''})
  //const WindPreference = useRef({name:'Km/h',value:''})
  const handleDD=(DDID)=>{
    DDID.current.classList.toggle("hidden")

  }
  const preferenceUpdater = (type,unit,value)=>{
    switch (type){
        case "Temp":
            unitPrefs.current[0]={name:unit,value:value}
            setTempPreference(unit)
            break;
        case "Rain":
            unitPrefs.current[1]={name:unit,value:value}
            setRainPreference(unit)
            break;
        case "Wind":
            unitPrefs.current[2]={name:unit,value:value}
            setWindPreference(unit)
            break
    }
    
  }
    return (
       
        <div className="unitSelection Background">
            <h3>Settings:</h3>
            <label for="TempDD">Temperature Unit:</label>
            <div className="OuterDD Background">
                <Button className="DDControlButton" onClick={()=>handleDD(TempDD)}>{TempPreference}</Button>
                <div ref={TempDD} className="InnerDD hidden">
                    <Button onClick={()=>{preferenceUpdater("Temp","Celsius",''); handleDD(TempDD)}}>Celsius</Button>
                    <Button onClick={()=>{preferenceUpdater("Temp","Fahrenheit",'&temperature_unit=fahrenheit'); handleDD(TempDD)}}>Fahrenheit</Button>
                </div>
            </div>
            <label for="RainDD">Rain Unit:</label>
            <div className="OuterDD Background">
                <Button className="DDControlButton" onClick={()=>handleDD(RainDD)}>{RainPreference}</Button>
                <div ref={RainDD} className="InnerDD hidden">
                    <Button onClick={()=>{preferenceUpdater("Rain","Millimeter",''); handleDD(RainDD)}}>Millimeter</Button>
                    <Button onClick={()=>{preferenceUpdater("Rain","Inch",'&precipitation_unit=inch'); handleDD(RainDD)}}>Inch</Button>
                </div>
            </div>
            <label for="WindDD">Wind Unit:</label>
            <div className="OuterDD Background">
                <Button className="DDControlButton" onClick={()=>handleDD(WindDD)}>{WindPreference}</Button>
                <div ref={WindDD} className="InnerDD hidden">
                    <Button onClick={()=>{preferenceUpdater("Wind","Km/h",''); handleDD(WindDD)}}>Km/h</Button>
                    <Button onClick={()=>{preferenceUpdater("Wind","M/S",'&wind_speed_unit=ms'); handleDD(WindDD)}}>M/S</Button>
                    <Button onClick={()=>{preferenceUpdater("Wind","MPH",'&wind_speed_unit=mph'); handleDD(WindDD)}}>MPH</Button>
                    <Button onClick={()=>{preferenceUpdater("Wind","Knots",'&wind_speed_unit=kn'); handleDD(WindDD)}}>Knots</Button>
                </div>
            </div>
            <div className="ButtonParentDiv">
      <Button onClick={refreshHandler}>
        <svg
          viewBox="0 0 512 512"
          width="25%"
          height="50%"
          title="Refresh Data"
        >
          <path d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z" />
        </svg>{" "}
        Refresh Data
      </Button>
      
        <div className="outerToggle">
            <input type="checkbox" id="toggleId" onChange={()=>console.log("Test")} className="toggleTheme hidden"></input>
            <label for="toggleId" className="toggleLabel"><svg viewBox="0 0 512 512" width="60%" stroke="#000000" stroke-width="20" fill="none" height="100%" title="moon"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z" /></svg></label>
        </div>
       
      <Button
        
        onClick={() => {
          dialog.current.showModal();
        }}
      >
        <svg viewBox="0 0 512 512" width="25%" height="50%" title="flag">
          <path d="M349.565 98.783C295.978 98.783 251.721 64 184.348 64c-24.955 0-47.309 4.384-68.045 12.013a55.947 55.947 0 0 0 3.586-23.562C118.117 24.015 94.806 1.206 66.338.048 34.345-1.254 8 24.296 8 56c0 19.026 9.497 35.825 24 45.945V488c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-94.4c28.311-12.064 63.582-22.122 114.435-22.122 53.588 0 97.844 34.783 165.217 34.783 48.169 0 86.667-16.294 122.505-40.858C506.84 359.452 512 349.571 512 339.045v-243.1c0-23.393-24.269-38.87-45.485-29.016-34.338 15.948-76.454 31.854-116.95 31.854z" />
        </svg>{" "}
        Select City
      </Button>
        </div>
        </div>

         /*<div className="unitSelection Background">
            <div className="UnitSelector">
                <label for="TempTypeSelector">
                    <select id="TempTypeSelector" class="selectors">
                        <option class="options" value="">Celsius</option>
                        <option class="options" value='&temperature_unit="FahrenHeit"'>Fahrenheit</option>
                    </select>
                </label>
            </div>
              <div className="UnitSelector">
                <label for="RainTypeSelector">
                    <select id="RainTypeSelector" class="selectors">
                        <option value="">Millimeter</option>
                        <option value='&precipitation_unit="inch"'>Inch</option>
                    </select>
                </label>
            </div>
               <div className="UnitSelector">
                <label for="WindTypeSelector">
                    <select id="WindTypeSelector" class="selectors">
                        <option value="">km/h</option>
                        <option value='&wind_speed_unit="ms"'>m/s</option>
                        <option value='&wind_speed_unit="mph"'>mph</option>
                        <option value='&wind_speed_unit="kn"'>knots</option>
                    </select>
                </label>
            </div>
            </div>*/
    )
}

export {UnitSelection}