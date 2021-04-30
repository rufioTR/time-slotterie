import {
  TimeSlotDataTypeExtended,
  TimeSlotSelectionsType,
} from "./TimeSlotOverview.types";
import { css, cx } from "@emotion/css";

import Appointments from "@root/components/Appointments/Appointments.view";
import Company from "@root/components/Company/Company.view";
import React from "react";
import TimeRangeOptionsContainer from "@root/components/TimeRangeOptionsContainer/TimeRangeOption.container";

export interface ITimeSlotOverviewViewProps {
  className?: string;
  timeSlotData: TimeSlotDataTypeExtended[];
  timeSlotSelections: TimeSlotSelectionsType[];
  onTimeSelection: ({
    companyId,
    startTime,
    endTime,
  }: TimeSlotSelectionsType) => void;
}

const TimeSlotOverviewView: React.FC<ITimeSlotOverviewViewProps> = ({
  className,
  timeSlotData,
  timeSlotSelections,
  onTimeSelection,
}) => {
  const styles = css`
    width: 85vw;
    height: 85vh;
    overflow: hidden;
    display: flex;
    position: relative;

    .appointments {
      position: sticky;

      left: 0;
      top: 0;
      margin-right: 32px;
    }

    .timeslot-selection {
      display: flex;
      overflow: auto;
    }
  `;

  return (
    <div className={cx(styles, className)}>
      <Appointments
        companyData={timeSlotData}
        className="appointments"
        selections={timeSlotSelections}
      />
      <div className="timeslot-selection">
        {timeSlotData.map((company) => (
          <Company
            title={company.name}
            id={company.id}
            selectedTimeRanges={timeSlotSelections}
            key={company.id}
          >
            <TimeRangeOptionsContainer
              companyData={company}
              timeSlotSelections={timeSlotSelections}
              onTimeSelection={onTimeSelection}
            />
          </Company>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotOverviewView;
