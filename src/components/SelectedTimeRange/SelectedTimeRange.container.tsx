import React, { useMemo } from "react";

import { TimeSlotSelectionsType } from "@root/pages/TimeSlotOverview/TimeSlotOverview.types";

import SelectedTimeRangeView from "./SelectedTimeRange.view";

export interface ISelectedTimeRangeContainerProps {
  className?: string;
  selectedTimeRanges: TimeSlotSelectionsType[];
  companyId: number;
}

const SelectedTimeRangeContainer: React.FC<ISelectedTimeRangeContainerProps> = ({
  selectedTimeRanges,
  companyId,
}) => {
  const relevantTimeRange = useMemo(() => {
    return selectedTimeRanges.find(
      (selectedTimeRange) => selectedTimeRange.companyId === companyId
    );
  }, [selectedTimeRanges, companyId]);

  return (
    <SelectedTimeRangeView
      from={relevantTimeRange?.startTime}
      to={relevantTimeRange?.endTime}
    />
  );
};

export default SelectedTimeRangeContainer;
