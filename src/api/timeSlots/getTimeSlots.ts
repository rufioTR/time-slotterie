import axios from "axios";

import { apiBase } from "@root/config/api";

export const getTimeSlots = () => {
  return axios.get(`${apiBase}/time_slots`);
};
