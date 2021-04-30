import React, { useMemo, useState } from "react";
import {
  TimeSlotDataType,
  TimeSlotDataTypeExtended,
  TimeSlotSelectionsType,
} from "./TimeSlotOverview.types";

import { DateTime } from "luxon";
import TimeSlotOverviewView from "./TimeSlotOverview.view";
import { groupBy as _groupBy } from "lodash-es";
import { isoDateFormater } from "@root/helper/isoDateFormater";
import useLocalStorage from "react-use-localstorage";

export interface ITimeSlotOverviewProps {
  timeSlotData: TimeSlotDataType[];
  selectedTimeSlots: TimeSlotSelectionsType[];
}

const TimeSlotOverview: React.FC<ITimeSlotOverviewProps> = ({
  timeSlotData,
  selectedTimeSlots,
}) => {
  const [, setStorageSelections] = useLocalStorage("selections", "[]");
  const [selections, setSelections] = useState<TimeSlotSelectionsType[]>(
    selectedTimeSlots
  );

  const handleTimeSelection = ({
    companyId,
    startTime,
    endTime,
  }: TimeSlotSelectionsType) => {
    // theres a current selection given within one company
    const currentCompanySelection = selections.find(
      (selection) => selection.companyId === companyId
    );

    // theres is already a time range selection
    const currentTimeRange = selections.find(
      (selection) => selection.startTime === startTime
    );

    if (!currentCompanySelection && !currentTimeRange) {
      setSelections((oldSelections) => {
        const updatedSelections = [
          ...oldSelections,
          { companyId, startTime, endTime },
        ];

        // update values in local storage to keep state on refresh
        setStorageSelections(JSON.stringify(updatedSelections));

        return updatedSelections;
      });
    } else if (
      currentCompanySelection &&
      currentCompanySelection.startTime === startTime
    ) {
      setSelections((oldSelections) => {
        const updatedSelections = oldSelections.filter(
          (oldSelection) => oldSelection.companyId !== companyId
        );

        // update values in local storage to keep state on refresh
        setStorageSelections(JSON.stringify(updatedSelections));

        return updatedSelections;
      });
    }
  };

  const transformedData: TimeSlotDataTypeExtended[] = useMemo(() => {
    return timeSlotData.map((timeSlotCompany) => {
      const extendedTimeSlots = timeSlotCompany.time_slots.map((timeSlot) => {
        const dateString = DateTime.fromISO(timeSlot.start_time).toFormat(
          "yyyy-MM-dd"
        );

        return {
          ...timeSlot,
          start_date: dateString,
          weekday: isoDateFormater(timeSlot.start_time, "ccc"),
        };
      });

      const transformedTimeSlotCompany = {
        ...timeSlotCompany,
        transformedTimeSlots: _groupBy(extendedTimeSlots, "start_date"),
      };

      return transformedTimeSlotCompany;
    });
  }, [timeSlotData]);

  return (
    <TimeSlotOverviewView
      timeSlotData={transformedData as any}
      timeSlotSelections={selections}
      onTimeSelection={handleTimeSelection}
    />
  );
};

export default TimeSlotOverview;
