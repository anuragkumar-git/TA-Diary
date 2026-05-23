const STORAGE_KEY = "taDiaryPreferences";

export const defaultPreferences = {
  user: {
    name: "નામ",
    role: "હોદ્દો",
    badgeNo: "બકલ નંબર",
  },

  travelDefaults: {
    reason: "ફરજનું કારણ",
    mode: "ફરજ માટે વપરાયેલ વાહન",
    distance: "",
  },
};

export function getPreferences() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultPreferences;
    }

    return {
      ...defaultPreferences,
      ...JSON.parse(stored),
    };
  } catch {
    return defaultPreferences;
  }
}

export function savePreferences(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}