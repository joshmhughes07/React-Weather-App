import { useState } from "react";

const Modal = ({ dialog, citySetter }) => {
  const [searchResults, setSearchResults] = useState({ results: [] });

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

  return (
    <div>
      <dialog
        className="Background modal locationModal"
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
        ></input>

        <CityListArea
          cities={searchResults.results}
          modalRef={dialog}
          handler={citySetter}
        />
      </dialog>
    </div>
  );
};

const CityListArea = ({ cities, modalRef, handler }) => {
  const handleCitySelect = (city) => {
    handler(city);
    modalRef.current.close();
  };

  return (
    <div className="CityList">
      {cities?.map((entry) => (
        <div className="city" onClick={() => handleCitySelect(entry)}>
          <h5>{entry.name}</h5>
          <div className="cityInfo">
            {entry.latitude} {entry.longitude} {entry.admin1}{" "}
            {entry.country_code}
          </div>
        </div>
      ))}
    </div>
  );
};


export { Modal }