import { useState } from "react";

import {
  getPreferences,
  savePreferences,
} from "../lib/preferences";

export function usePreferences() {
  const [preferences, setPreferences] =
    useState(getPreferences());

  function updatePreferences(data) {
    setPreferences(data);

    savePreferences(data);
  }

  return {
    preferences,
    updatePreferences,
  };
}