import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {
  const [HolidaysInRange, setHolidaysInRange] = useState([]);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [holidayImages, setHolidayImages] = useState({});

  const getHolidayImages = async (holiday) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${holiday}&client_id=cceo9DOk_I2Pw-WpqHyXdhPxQto1rWwBysFmolMO5SQ`
      );
      return Object.values(response.data.results[0].urls.small).join("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    var tmpImagesArray = HolidaysInRange;
    for (let key in HolidaysInRange) {
      tmpImagesArray[key]["ImageLink"] = getHolidayImages(
        tmpImagesArray[key].title
      );
    }
    setHolidayImages(tmpImagesArray);
    console.log("HolidaysInRange --> With Images: ", HolidaysInRange);
    console.log("tmpImagesArray --> With Images: ", tmpImagesArray);
  }, [HolidaysInRange]);

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
            <div key={ind}>
              Holiday: {item.hebrew}, Date: {item.date} <br />
              <img src={item.ImageLink} alt={item.title} />
            </div>
          ))
        : "There are no holidays"}
      <br />
    </div>
  );
}
