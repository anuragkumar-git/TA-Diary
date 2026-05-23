import dayjs from "dayjs";

const gujaratiDigits = [
  "૦",
  "૧",
  "૨",
  "૩",
  "૪",
  "૫",
  "૬",
  "૭",
  "૮",
  "૯",
];

export function toGujaratiDigits(
  value
) {
  return String(value).replace(
    /[0-9]/g,
    (digit) =>
      gujaratiDigits[
      Number(digit)
      ]
  );
}

export function formatGujaratiDate(
  date,
  time = ""
) {
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

const weekdays = [
  "રવિવાર",
  "સોમવાર",
  "મંગળવાર",
  "બુધવાર",
  "ગુરુવાર",
  "શુક્રવાર",
  "શનિવાર",
];

export function getGujaratiWeekday(
  date
) {
  return weekdays[
    new Date(date).getDay()
  ];
}