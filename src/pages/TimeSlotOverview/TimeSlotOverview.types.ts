export type TimeSlotItemType = "company";

export type TimeSlotEntryType = {
  start_time: string;
  end_time: string;
};

export type TimeSlotDataType = {
  id: number;
  name: string;
  type: TimeSlotItemType;
  time_slots: TimeSlotEntryType[];
};

export type TimeSlotDataTypeExtended = TimeSlotDataType & {
  transformedTimeSlots: Record<
    string,
    (TimeSlotEntryType & { start_date: string; weekday: string })[]
  >;
};

export type TimeSlotSelectionsType = {
  companyId: number;
  startTime: string;
  endTime: string;
};
