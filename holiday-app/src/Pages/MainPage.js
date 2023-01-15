import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function MainPage() {
  const GetHebrewDates = (startDate, endDate) => {
    // Assuming date params are YYYY-MM-DD STRINGS!!
    startDate = "2023-01-01";
    endDate = "2023-12-30";
    //to implement the function correctly, delete the params above and send into the func the correct dates from input
    try {
      axios
        .get(
          `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&start=${startDate}&end=${endDate}&ss=on&mf=on&c=on&geo=geoname&geonameid=281184&M=on&s=on`
        )
        .then(function (response) {
          // handle success
          console.log("jewish holidays in range: ", response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    } catch (error) {
      console.log(error);
    }

    // fetch(
    //   `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&start=${startDate}&end=${endDate}&ss=on&mf=on&c=on&geo=geoname&geonameid=281184&M=on&s=on`,
    //   {
    //     method: "GET",
    //     headers: new Headers({
    //       "Content-Type": "application/json; charset=UTF-8",
    //       Accept: "application/json; charset=UTF-8",
    //     }),
    //   }
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then(
    //     (result) => {
    //       console.log("jewish holidays in range: ", result);
    //     },
    //     (error) => {
    //       console.log("fetch error: ", error);
    //     }
    //   );
  };

  useEffect(() => {
    GetHebrewDates("", "");
  }, []);

  return <div>MainPage</div>;
}
