import { isoDateFormater } from "./isoDateFormater";

describe("isoDateFormater", () => {
  it("should should return correct formatted string", () => {
    expect(isoDateFormater("2018-07-13T10:30:00.000+02:00", "HH:mm")).toBe(
      "10:30"
    );
  });
});
