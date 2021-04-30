import Company from "./Company.view";
import React from "react";
import { render } from "@testing-library/react";

describe("Company", () => {
  const mockSelectedTimeRanges: React.ComponentProps<
    typeof Company
  >["selectedTimeRanges"] = [
    {
      companyId: 1,
      endTime: "2018-07-09T13:00:00.000+02:00",
      startTime: "2018-07-09T11:30:00.000+02:00",
    },
  ];

  it("should render component correctly", () => {
    // arrange
    const { asFragment } = render(
      <Company
        title="Mock Title"
        id={1}
        selectedTimeRanges={mockSelectedTimeRanges}
      >
        Mock Content
      </Company>
    );
    // act
    // assert
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render component correctly without selected time range", () => {
    // arrange
    const { asFragment } = render(
      <Company
        title="Mock Title"
        id={2}
        selectedTimeRanges={mockSelectedTimeRanges}
      >
        Mock Content
      </Company>
    );
    // act
    // assert
    expect(asFragment()).toMatchSnapshot();
  });
});
