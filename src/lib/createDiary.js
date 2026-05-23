import dayjs from "dayjs";

import { getPreferences } from "./preferences";

export function createDiary() {
  const now = dayjs();

  const preferences = getPreferences();

  return {
    month: now.month() + 1,
    year: now.year(),

    user: preferences.user,

    travelDefaults:
      preferences.travelDefaults,

    travelEntries: [],

    leaveEntries: [],

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),

    schemaVersion: 1,
  };
}