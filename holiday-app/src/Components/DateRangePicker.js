import React, { useEffect, useRef, useState } from "react";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import DatePicker from "../Styles/DatePicker.scss";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export const DateRangePicker = ({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}) => {
  // Date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // Open/close calendat state
  const [open, setOpen] = useState(false);
  // Get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // Hide dropdown calendar on ESC key press
  const hideOnEscape = (e) => {
    console.log(e.key);
    if (e.key == "Escape") {
      setOpen(false);
    }
  };
  // Hide dropdown calendar on outside click
  const hideOnClickOutside = (event) => {
    // console.log(refOne.current);
    // console.log(event.target);
    if (refOne.current && !refOne.current.contains(event.target)) {
      setOpen(false);
    }
  };

  // on date change, store date in state
  const handleSelect = (event) => {
    // console.log(event.selection.startDate);
    console.log(event);
    //setRange([event.selection]);

    // console.log(`${format(range[0].startDate, "yyyy-MM-dd")}`);
    // console.log(`${format(range[0].endDate, "yyyy-MM-dd")}`);

    setStartDate(`${format(event[0].startDate, "yyyy-MM-dd")}`);
    setEndDate(`${format(event[0].endDate, "yyyy-MM-dd")}`);
  };

  return (
    <div className="p-5">
      <div className="container">
        <div className="box">
          <input
            value={`${startDate} to ${endDate}`}
            readOnly
            className="datepicker-here form-control"
            onClick={() => setOpen((open) => !open)}
          />
          <div ref={refOne} className="calendar-popup">
            {open && (
              <DateRange
                onChange={(item) => handleSelect([item.selection])}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={1}
                direction="horizontal"
                className="calendarElement"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DateRangePicker;
