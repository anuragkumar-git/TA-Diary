const STORAGE_KEY = "taDiaryPreferences";

export const defaultPreferences = {
  user: {
    name: "",
    role: "",
    badgeNo: "",
  },

  travelDefaults: {
    reason: "",
    mode: "",
    distance: "",
  },
  // user: {
  //   name: "નામ ",
  //   role: "હોદ્દો",
  //   badgeNo: "બકલ નંબર",
  // },

  // travelDefaults: {
  //   reason: "મુસાફરીનું કારણ",
  //   mode: "રેલગાડી થી કે પગ રસ્તે",
  //   distance: "",
  // },
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