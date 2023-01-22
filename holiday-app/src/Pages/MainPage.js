import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CardGrid from "../Components/CardGrid";
import ImageUrl from "../HolidaysImages";
import HolidayDate from "../Styles/HolidayDate.scss";
import DateRangePicker from "../Components/DateRangePicker.js";

export default function MainPage() {
  const [HolidaysInRange, setHolidaysInRange] = useState([]);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  function setImage(tmpImagesArray) {
    for (let key in tmpImagesArray) {
      for (let key2 in ImageUrl) {
        if (tmpImagesArray[key].title.includes(key2)) {
          tmpImagesArray[key]["ImageLink"] = ImageUrl[key2];
        }
      }
    }
    setHolidaysInRange(tmpImagesArray);
  }

  const GetHebrewDates = async (startDate, endDate) => {
    // Assuming startDate & endDate are YYYY-MM-DD string formated
    try {
      const url = `https://www.hebcal.com/hebcal?v=1&mod=on&cfg=json&maj=on&start=${startDate}&end=${endDate}`;
      const response = await axios.get(url);
      setImage(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const SearchHolidays = () => {
    // DIANA --> here I would validate that startDate is earlier then endDate
    console.log(
      "Main page 44, start date: ",
      StartDate,
      " end date: ",
      EndDate
    );
    GetHebrewDates(StartDate, EndDate);
  };
  const ResetData = () => {
    setHolidaysInRange([]);
    setStartDate("");
    setEndDate("");
  };
  return (
    <div>
      <div className="HolidayDate">
        <div className="center">
          <header>Holidays Search</header>
          <h3>Pick Date:</h3>

          <DateRangePicker
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={StartDate}
            endDate={EndDate}
          />

          {/* <input
            type="text"
            placeholder="Start Date"
            onChange={StartDateChanged}
          ></input>
          <input
            type="text"
            placeholder="End Date"
            onChange={EndDateChanged}
          ></input> */}

          <button className="button-85" role="button" onClick={SearchHolidays}>
            SEARCH HOLIDAYS
          </button>
          <button className="button-6" role="button" onClick={ResetData}>
            RESET
          </button>
          <br />
        </div>
      </div>

      <div className="bg">
        {Object.keys(HolidaysInRange).length
          ? HolidaysInRange.map((item, ind) => (
              <CardGrid
                key={ind}
                HebName={item.hebrew}
                Date={item.date}
                ImageLink={item.ImageLink}
                EngName={item.title}
                Info={item.memo}
              />
            ))
          : "There are no holidays"}
        <br />
      </div>
    </div>
  );
}
