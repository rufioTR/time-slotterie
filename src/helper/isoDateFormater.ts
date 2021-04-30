import { DateTime } from "luxon";

export const isoDateFormater = (dateIsoString: string, format: string) => {
  return DateTime.fromISO(dateIsoString)
    .setLocale(navigator.languages[0] || navigator.language)
    .toFormat(format);
};
