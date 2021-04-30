import { css, cx } from "@emotion/css";

import React from "react";
import { TimeSlotSelectionsType } from "@root/pages/TimeSlotOverview/TimeSlotOverview.types";
import { isoDateFormater } from "@root/helper/isoDateFormater";

export interface ISelectedTimeRangeViewProps {
  className?: string;
  from: TimeSlotSelectionsType["startTime"] | undefined;
  to: TimeSlotSelectionsType["endTime"] | undefined;
}

const SelectedTimeRangeView: React.FC<ISelectedTimeRangeViewProps> = ({
  className,
  from,
  to,
}) => {
  const styles = css`
    font-weight: 100;

    .selected_range {
      display: flex;
      justify-content: space-between;
    }

    .day {
      font-weight: 600;
    }
  `;

  return (
    <div className={cx(styles, className)}>
      {from && to ? (
        <div className="selected_range">
          <div className="day">{isoDateFormater(from, "cccc")}</div>
          <div>
            {isoDateFormater(from, "HH:mm")} - {isoDateFormater(to, "HH:mm")}
          </div>
        </div>
      ) : (
        <div>nothing selected yet</div>
      )}
    </div>
  );
};

export default SelectedTimeRangeView;
