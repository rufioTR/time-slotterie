import * as AroundHomeFont from "@root/assets/fonts/aroundhome.woff2";

import { css, injectGlobal } from "@emotion/css";

import HashLoader from "react-spinners/HashLoader";
import React from "react";
import TimeSlotOverview from "./pages/TimeSlotOverview/TimeSlotOverview.container";
import { colors } from "./config/colors";
import { getTimeSlots } from "./api/timeSlots/getTimeSlots";
import useLocalStorage from "react-use-localstorage";
import usePromise from "react-use-promise";

function App() {
  const [
    timeRangeData,
    timeRangeDataError,
    timeRangeDataLoadingState,
  ] = usePromise(() => getTimeSlots(), []);

  const [selections] = useLocalStorage("selections", "[]");

  injectGlobal`
    @font-face {
        font-family: AroundHome;
        src: url(${AroundHomeFont.default});
    }

    body {
      font-family: AroundHome;
    }
  `;

  const styles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `;

  const errorStyles = css`
    color: ${colors.danger};
  `;

  return (
    <div className={styles}>
      {timeRangeDataLoadingState === "resolved" ? (
        <TimeSlotOverview
          timeSlotData={timeRangeData?.data}
          selectedTimeSlots={JSON.parse(selections)}
        />
      ) : timeRangeDataLoadingState === "pending" ? (
        <HashLoader color="red" />
      ) : timeRangeDataError ? (
        <div className={errorStyles}>Could not fetch data</div>
      ) : null}
    </div>
  );
}

export default App;
