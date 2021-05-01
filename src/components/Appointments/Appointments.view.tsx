import React, { useMemo } from "react";

import { css, cx } from "@emotion/css";
import { sortBy as _sortBy } from "lodash-es";
import { useTransition, animated as a } from "react-spring";

import {
  TimeSlotDataTypeExtended,
  TimeSlotSelectionsType,
} from "@root/pages/TimeSlotOverview/TimeSlotOverview.types";

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
  const sortedSelectionList = useMemo(
    () =>
      _sortBy(selections, (selection) =>
        isoDateFormater(selection.startTime, "X")
      ),
    [selections]
  );

  const selectionListTransition = useTransition(sortedSelectionList, {
    initial: {
      height: "52px",
      opacity: 1,
    },
    from: { height: "0px", opacity: 0 },
    enter: { height: "52px", opacity: 1 },
    leave: { height: "0px", opacity: 0 },
  });

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
      margin-bottom: 0px;

      h3 {
        margin: 0px 0 0px 0;
      }
    }
  `;

  return (
    <div className={cx(styles, className)}>
      <h2>Appointments</h2>
      {selectionListTransition((styles, item) => (
        <a.div style={styles} className="selected-company">
          <h3>{getCompanyName(item.companyId)}</h3>
          <div>
            {isoDateFormater(item.startTime, "ccc: HH:mm")} -{" "}
            {isoDateFormater(item.endTime, "HH:mm")}
          </div>
        </a.div>
      ))}
    </div>
  );
};

export default Appointments;
