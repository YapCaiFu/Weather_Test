import React from "react";
import { MdDelete, MdClose } from "react-icons/md";
import SearchHistoryItem from "./SearchHistoryItem";

const SearchHistory = ({ setShowDelete, setCurrentWeather, deleteWeatherHistory, showDelete, weatherHistory }) => {
    return (
        <div className="container">
            {weatherHistory.length !== 0 &&
                <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
                    {!showDelete ? <button type="button" onClick={() => setShowDelete(true)} class="btn btn-light">Manage</button> : <>
                        <button type="button" onClick={() => setShowDelete(false)} class="btn btn-outline-primary">Manage <MdClose /></button>
                        <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <MdDelete />
                        </button>
                    </>}
                </div>}
            <div className="card">
                {weatherHistory.length !== 0 ?
                    weatherHistory.sort(function (firstItem, secondItem) { return secondItem.searchDate - firstItem.searchDate }).map((item, index) =>
                    <SearchHistoryItem item={item} index={index} setCurrentWeather={setCurrentWeather} deleteWeatherHistory={deleteWeatherHistory} showDelete={showDelete}/>
                    ) :
                    <div class="card-body text-center">
                        <p className="h4 Theme-grey">
                            No Record
                        </p>
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchHistory;
