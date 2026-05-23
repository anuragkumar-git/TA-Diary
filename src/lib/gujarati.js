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

export function toGujaratiDigits(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).replace(
    /[0-9]/g,
    (digit) => gujaratiDigits[Number(digit)]
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

export function getGujaratiWeekday(date) {
  return weekdays[new Date(date).getDay()];
}