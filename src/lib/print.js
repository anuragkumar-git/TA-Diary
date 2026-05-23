import dayjs from "dayjs";

import { toGujaratiDigits } from "./gujarati";

export function formatGujaratiDate(
  date,
  time = ""
) {
  if (!date) return "";

  const formatted = dayjs(date).format(
    "DD/MM/YYYY"
  );

  if (!time) {
    return toGujaratiDigits(formatted);
  }

  return toGujaratiDigits(
    `${formatted} ${time}`
  );
}