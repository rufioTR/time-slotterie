import React from "react";

import { css, cx } from "@emotion/css";

import { TimeSlotSelectionsType } from "@root/pages/TimeSlotOverview/TimeSlotOverview.types";

import { colors } from "@root/config/colors";

import SelectedTimeRangeContainer from "../SelectedTimeRange/SelectedTimeRange.container";

export interface ICompanyProps {
  className?: string;
  title: string;
  id: number;
  selectedTimeRanges: TimeSlotSelectionsType[];
}

const Company: React.FC<ICompanyProps> = ({
  className,
  title,
  children,
  id,
  selectedTimeRanges,
}) => {
  const styles = css`
    flex: 0 0 300px;
    width: 300px;
    height: 100%;
    background-color: ${colors.white};
    color: ${colors.black};
    margin-right: 32px;
    border-radius: 4px;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;

    .top_content {
      height: 112px;
      padding: 32px;

      h2 {
        margin-bottom: 16px;
      }

      border-bottom: 1px solid ${colors.lightGrey};
    }

    .time_range_content {
      padding: 32px;
      height: calc(100% - 100px);
      overflow: auto;
    }
  `;

  return (
    <div className={cx(styles, className)}>
      <div className="top_content">
        <h2>{title}</h2>
        <SelectedTimeRangeContainer
          selectedTimeRanges={selectedTimeRanges}
          companyId={id}
        />
      </div>
      <div className="time_range_content">{children}</div>
    </div>
  );
};

export default Company;
