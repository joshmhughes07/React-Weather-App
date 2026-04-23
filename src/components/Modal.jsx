import { useState,useRef, useEffect,useContext} from "react";
import "./styling/ModalStyling.css"
import { Loading } from "./Loading";
import { ThemeContext } from "./Context";

const Modal = ({ dialog, citySetter }) => {
  const [searchResults, setSearchResults] = useState({ results: [] });
  const inputEl = useRef(null)
  const Theme = useContext(ThemeContext)

  const handleSearch = (event) => {
    asyncSearch(event.target.value);
  };
  const asyncSearch = async (query) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
      );

      if (response.ok) {
        const JsonResponse = await response.json();
        setSearchResults(JsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };
   useEffect(()=>{
      inputEl.current.focus()


    
   })


  return (
    <>
      <dialog
        className={`locationModal modal ${Theme}`}
        ref={dialog}
        closedby="any"
      >
        <button
          className="close"
          onClick={() => {
            
            dialog.current.close();
            
          }}
        >
          <svg
            fill="grey"
            viewBox="0 0 352 512"
            width="20"
            height="20"
            title="times"
          >
            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
          </svg>
        </button>
        <h3>Select Location: </h3>
        
        <input
          id="SearchQueryInputId"
          className="searchQueryInput"
          type="search"
          placeholder="City or Town."
          onChange={handleSearch}
          minLength={3}
          ref={inputEl}
        ></input> 
        <label htmlFor="SearchQueryInputId">Minimum Of 3 Characters</label>

        <CityListArea
          cities={searchResults.results}
          modalRef={dialog}
          handler={citySetter}
        />
      </dialog>
    </>
  );
};

const CityListArea = ({ cities, modalRef, handler }) => {
  //needs a variable that calls use(asyncSearch(cities)) which shuold 
  const handleCitySelect = (city) => {
    handler(city);
    modalRef.current.close();
  };

  return (
    cities?<div className="CityList">
      {cities?.map((entry,index) => (
        <div className="city" key={index} onClick={() => handleCitySelect(entry)}>
          <h5>{entry.name}</h5>
          <div className="cityInfo">
            {entry.latitude} {entry.longitude} {entry.admin1}{" "}
            {entry.country_code}
          </div>
        </div>
      ))}
    </div>:<Loading/>
  );
};


export { Modal }