import { apiBase } from "@root/config/api";
import axios from "axios";

export const getTimeSlots = () => {
  return axios.get(`${apiBase}/time_slots`);
};
