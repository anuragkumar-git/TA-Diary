export function createExportPayload(
  diary
) {
  return {
    month: String(diary.month),

    year: String(diary.year),

    user: diary.user || {},

    travelDefaults:
      diary.travelDefaults || {},

    travelEntries:
      diary.travelEntries || [],

    leaveEntries:
      diary.leaveEntries || [],

    schemaVersion: 1,
  };
}

export function exportDiaryAsJson(
  diary
) {
  return JSON.stringify(
    createExportPayload(diary),
    null,
    2
  );
}