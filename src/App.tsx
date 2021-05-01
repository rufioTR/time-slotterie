import React from "react";

import { css, injectGlobal } from "@emotion/css";
import useLocalStorage from "react-use-localstorage";
import usePromise from "react-use-promise";

import * as AroundHomeFont from "@root/assets/fonts/aroundhome.woff2";

import { colors } from "./config/colors";
import { getTimeSlots } from "./api/timeSlots/getTimeSlots";

import HashLoader from "react-spinners/HashLoader";
import TimeSlotOverview from "./pages/TimeSlotOverview/TimeSlotOverview.container";

function App() {
  const [
    timeRangeData,
    timeRangeDataError,
    timeRangeDataLoadingState,
  ] = usePromise(() => getTimeSlots(), []);

  const [, , fakeLoadingState] = usePromise(
    new Promise((res) => setTimeout(res, 1000)),
    []
  );

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
      {timeRangeDataLoadingState === "resolved" &&
      fakeLoadingState === "resolved" ? (
        <TimeSlotOverview
          timeSlotData={timeRangeData?.data}
          selectedTimeSlots={JSON.parse(selections)}
        />
      ) : timeRangeDataLoadingState === "pending" ||
        fakeLoadingState === "pending" ? (
        <HashLoader color={colors.aroundHomeYellow} />
      ) : timeRangeDataError ? (
        <div className={errorStyles}>Could not fetch data</div>
      ) : null}
    </div>
  );
}

export default App;
