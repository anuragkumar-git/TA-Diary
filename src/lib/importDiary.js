import { getPreferences }
  from "./preferences";

function ensureArray(value) {
  return Array.isArray(value)
    ? value
    : [];
}

function ensureId(item) {
  return {
    id:
      item.id ||
      crypto.randomUUID(),

    ...item,
  };
}

export function normalizeImportedDiary(
  raw
) {
  const preferences =
    getPreferences();

  if (
    !raw.month ||
    !raw.year
  ) {
    throw new Error(
      "Import data must include month and year."
    );
  }

  return {
    month: Number(raw.month),

    year: Number(raw.year),

    user:
      raw.user ||
      preferences.user,

    travelDefaults:
      raw.travelDefaults ||
      preferences.travelDefaults,

    travelEntries:
      ensureArray(
        raw.travelEntries
      ).map(ensureId),

    leaveEntries:
      ensureArray(
        raw.leaveEntries
      ).map(ensureId),

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),

    schemaVersion:
      raw.schemaVersion || 1,
  };
}