import {
  TimeSlotDataTypeExtended,
  TimeSlotSelectionsType,
} from "@root/pages/TimeSlotOverview/TimeSlotOverview.types";
import { css, cx } from "@emotion/css";

import React from "react";
import TimeRangeOptionView from "../TimeRangeOption/TimeRangeOption.view";
import { map as _map } from "lodash-es";
import { colors } from "@root/config/colors";

export interface ITimeRangeOptionsContainerProps {
  className?: string;
  companyData: TimeSlotDataTypeExtended;
  timeSlotSelections: TimeSlotSelectionsType[];
  onTimeSelection: ({
    companyId,
    startTime,
    endTime,
  }: TimeSlotSelectionsType) => void;
}

const TimeRangeOptionsContainer: React.FC<ITimeRangeOptionsContainerProps> = ({
  className,
  companyData,
  timeSlotSelections,
  onTimeSelection,
}) => {
  const getStateClass = (
    companyId: number,
    startTime: string
  ): "active" | "disabled" | undefined => {
    const isDisabled = timeSlotSelections.find(
      (timeSlotSelection) =>
        (timeSlotSelection.startTime === startTime &&
          timeSlotSelection.companyId !== companyId) ||
        (timeSlotSelection.startTime !== startTime &&
          timeSlotSelection.companyId === companyId)
    );

    const isActive = timeSlotSelections.find(
      (timeSlotSelection) =>
        timeSlotSelection.startTime === startTime &&
        timeSlotSelection.companyId === companyId
    );

    if (isDisabled) {
      return "disabled";
    }

    if (isActive) {
      return "active";
    }
  };

  const styles = css`
    .weekday {
      margin-bottom: 32px;

      h3 {
        font-weight: 600;
        margin: 8px 0;
        background: ${colors.aroundHomeGreen};
        color: ${colors.white};
        border-radius: 4px;
        padding: 8px;
      }
    }
  `;

  return (
    <div className={cx(styles, className)}>
      {_map(companyData.transformedTimeSlots, (timeSlotDay, key) => (
        <div className="weekday" key={key}>
          <h3>{timeSlotDay[0].weekday}</h3>

          {timeSlotDay.map((timeSlotRange) => (
            <TimeRangeOptionView
              key={timeSlotRange.start_time}
              startTime={timeSlotRange.start_time}
              endTime={timeSlotRange.end_time}
              stateClass={getStateClass(
                companyData.id,
                timeSlotRange.start_time
              )}
              onClick={() =>
                onTimeSelection({
                  companyId: companyData.id,
                  startTime: timeSlotRange.start_time,
                  endTime: timeSlotRange.end_time,
                })
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimeRangeOptionsContainer;
