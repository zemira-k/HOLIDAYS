import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {
  const [HolidaysInRange, setHolidaysInRange] = useState([]);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  const GetHebrewDates = async (startDate, endDate) => {
    // Assuming startDate & endDate are YYYY-MM-DD string formated
    try {
      const url = `https://www.hebcal.com/hebcal?v=1&mod=on&cfg=json&maj=on&start=${startDate}&end=${endDate}`;
      const response = await axios.get(url);
      console.log("Holidays: ", response.data.items);
      setHolidaysInRange(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const StartDateChanged = (event) => {
    setStartDate(event.target.value);
  };

  const EndDateChanged = (event) => {
    setEndDate(event.target.value);
  };

  const SearchHolidays = () => {
    // DIANA --> here I would validate that startDate is earlier then endDate
    GetHebrewDates(StartDate, EndDate);
  };
  const ResetData = () => {
    setHolidaysInRange([]);
    setStartDate("");
    setEndDate("");
  };
  return (
    <div>
      <h1>DATES FORMAT "YYYY-MM-DD"</h1>
      <input
        type="text"
        placeholder="Start Date"
        onChange={StartDateChanged}
      ></input>
      <input
        type="text"
        placeholder="End Date"
        onChange={EndDateChanged}
      ></input>
      <button style={{ background: "green" }} onClick={SearchHolidays}>
        SEARCH HOLIDAYS
      </button>
      <button style={{ background: "red" }} onClick={ResetData}>
        RESET
      </button>
      <br />

      {Object.keys(HolidaysInRange).length
        ? HolidaysInRange.map((item, ind) => (
            <div id={ind}>
              Holiday: {item.hebrew}, Date: {item.date} <br />
            </div>
          ))
        : "There are no holidays"}
      <br />
    </div>
  );
}
