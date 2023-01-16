import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {
  const GetHebrewDates = async (startDate, endDate) => {
    // Assuming startDate & endDate are YYYY-MM-DD string formated
    startDate = "2023-01-01";
    endDate = "2023-12-31";
    try {
      const url = `https://www.hebcal.com/hebcal?v=1&mod=on&cfg=json&maj=on&min=on&start=${startDate}&end=${endDate}`;
      const response = await axios.get(url);
      console.log("jewish holidays in range: ", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetHebrewDates("", "");
  }, []);

  return <div>MainPage</div>;
}
