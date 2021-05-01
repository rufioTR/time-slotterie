import React from "react";

import { css, cx } from "@emotion/css";

import { colors } from "@root/config/colors";
import { isoDateFormater } from "@root/helper/isoDateFormater";

export interface ITimeRangeOptionViewProps {
  className?: string;
  stateClass?: "active" | "disabled";
  startTime: string;
  endTime: string;
  onClick: () => void;
}

const TimeRangeOptionView: React.FC<ITimeRangeOptionViewProps> = ({
  className,
  stateClass,
  startTime,
  endTime,
  onClick,
}) => {
  const styles = css`
    padding: 6px 16px 4px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &.active {
      background-color: ${colors.aroundHomeYellow};
      font-weight: 600;
    }

    &.disabled {
      color: ${colors.lightGrey};
      cursor: not-allowed;

      &:hover {
        background-color: initial;
      }
    }
  `;

  return (
    <div
      className={cx(styles, "time-range", stateClass, className)}
      onClick={onClick}
    >
      {isoDateFormater(startTime, "HH:mm")} -{" "}
      {isoDateFormater(endTime, "HH:mm")}
    </div>
  );
};

export default TimeRangeOptionView;
