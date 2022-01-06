import React from "react";
import {  MdClose } from "react-icons/md";
import CountrySelect from 'react-bootstrap-country-select';
import { City } from 'country-state-city';
import Autocomplete from 'react-autocomplete';

const SearchBox = ({ country,setCountry,city,setCity,submitHandler}) => {
    return (
        <div className="mt-3 d-flex flex-row justify-content-between align-items-center">
        <div>
          <label for="country-code" class="col-form-label">
            Country
          </label>
        </div>
        <div className="d-flex flex-row">
          <CountrySelect
            placeholder=""
            value={country}
            onChange={setCountry}
            valueAs='id'
          />
          {country && <button className="btn" onClick={() => setCountry("")}>
            <MdClose />
          </button>}
        </div>
        <div>
          <label for="city-name" class="col-form-label">
            City
          </label>
        </div>
        <div className="d-flex flex-row">
          <Autocomplete
            inputProps={{ className: "form-control" }}
            getItemValue={(item) => item}
            items={City.getCitiesOfCountry(country ? country.toUpperCase() : "").map(cityitem => cityitem.name)}
            renderMenu={(items, values, style) =>
              <div className="Dropdown-selection country-select__overlay-content" style={{ ...style, position: "fixed", maxHeight: "225px" }}>
                <ul className="country-select__list" children={items} />
              </div>
            }
            renderItem={(item, isHighlighted) =>
              <li className={isHighlighted ? "active country-select__list-item" : "country-select__list-item"}>
                {item}
              </li>
            }
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onSelect={(val) => setCity(val)}
          />
          {city && <button className="btn" onClick={() => setCity("")}>
            <MdClose />
          </button>}
        </div>
        <button className="btn btn-primary" onClick={submitHandler}>
          Search
        </button>
      </div>
    );
};

export default SearchBox;
