import React from "react";

import { css, injectGlobal } from "@emotion/css";
import useLocalStorage from "react-use-localstorage";
import usePromise from "react-use-promise";

import * as AroundHomeFont from "@root/assets/fonts/aroundhome.woff2";

import { colors } from "./config/colors";
import { getTimeSlots } from "./api/timeSlots/getTimeSlots";

import HashLoader from "react-spinners/HashLoader";
import TimeSlotOverview from "./pages/TimeSlotOverview/TimeSlotOverview.container";
import { useTransition, animated as a } from "react-spring";

function App() {
  const [
    timeRangeData,
    timeRangeDataError,
    timeRangeDataLoadingState,
  ] = usePromise(() => getTimeSlots(), []);

  const [, , fakeLoadingState] = usePromise(
    new Promise((res) => setTimeout(res, 300)),
    []
  );

  const [selections] = useLocalStorage("selections", "[]");

  const loadingTransition = useTransition(
    fakeLoadingState === "pending" || timeRangeDataLoadingState === "pending",
    {
      initial: { position: "absolute", opacity: 1 },
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    }
  );

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
        <>
          {loadingTransition(({ opacity }, loading) => (
            <a.div
              style={{
                opacity,
              }}
            >
              {!loading && (
                <TimeSlotOverview
                  timeSlotData={timeRangeData?.data}
                  selectedTimeSlots={JSON.parse(selections)}
                />
              )}
            </a.div>
          ))}
        </>
      ) : timeRangeDataLoadingState === "pending" ||
        fakeLoadingState === "pending" ? (
        <>
          {loadingTransition(({ opacity }, loading) => (
            <a.div
              style={{
                opacity,
              }}
            >
              {loading && <HashLoader color={colors.aroundHomeYellow} />}
            </a.div>
          ))}
        </>
      ) : timeRangeDataError ? (
        <div className={errorStyles}>Could not fetch data</div>
      ) : null}
    </div>
  );
}

export default App;
