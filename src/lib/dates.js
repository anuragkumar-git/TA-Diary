import dayjs from "dayjs";

export function formatInputDate(date) {
  return dayjs(date).format("YYYY-MM-DD");
}

export function formatInputTime(time) {
  return dayjs(time, "HH:mm").format(
    "HH:mm"
  );
}