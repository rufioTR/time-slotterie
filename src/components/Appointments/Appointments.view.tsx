import {
  TimeSlotDataTypeExtended,
  TimeSlotSelectionsType,
} from "@root/pages/TimeSlotOverview/TimeSlotOverview.types";
import { css, cx } from "@emotion/css";

import React from "react";
import { sortBy as _sortBy } from "lodash-es";
import { colors } from "@root/config/colors";
import { isoDateFormater } from "@root/helper/isoDateFormater";

export interface IAppointmentsProps {
  className?: string;
  selections: TimeSlotSelectionsType[];
  companyData: TimeSlotDataTypeExtended[];
}

const Appointments: React.FC<IAppointmentsProps> = ({
  className,
  selections,
  companyData,
}) => {
  const getCompanyName = (id: number) => {
    const foundCompany = companyData.find((timeSlot) => timeSlot.id === id);

    return foundCompany?.name;
  };

  const styles = css`
    z-index: 2;
    flex: 0 0 180px;

    h2 {
      border-radius: 4px;
      padding: 4px 0;
      color: ${colors.aroundHomeYellow};
      margin: 24px 0 16px 0;
    }

    .selected-company {
      margin-bottom: 8px;

      h3 {
        margin: 4px 0;
      }
    }
  `;

  return (
    <div className={cx(styles, className)}>
      <h2>Appointments</h2>
      {/* sort by timestamp then list */}
      {_sortBy(selections, (selection) =>
        isoDateFormater(selection.startTime, "X")
      ).map((selection) => (
        <div key={selection.companyId} className="selected-company">
          <h3>{getCompanyName(selection.companyId)}</h3>
          <div>
            {isoDateFormater(selection.startTime, "ccc: HH:mm")} -{" "}
            {isoDateFormater(selection.endTime, "HH:mm")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointments;
