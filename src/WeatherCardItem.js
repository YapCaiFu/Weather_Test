import React from "react";


const WeatherCardItem = ({ title, description }) => {
    return (
        <div className="col-md-6">
            <p className="h6 Theme-grey">
                {title}:
            </p>
            <p className="h5">
                {description}
            </p>
        </div>
    );
};

export default WeatherCardItem;
