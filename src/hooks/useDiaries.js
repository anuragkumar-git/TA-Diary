import { useEffect, useState } from "react";

import { db } from "../db/db";

export function useDiaries() {
  const [diaries, setDiaries] = useState([]);

  const [loading, setLoading] = useState(true);

  async function loadDiaries() {
    const data = await db.diaries
      .orderBy("updatedAt")
      .reverse()
      .toArray();

    setDiaries(data);

    setLoading(false);
  }

  async function addDiary(diary) {
    await db.diaries.add(diary);

    await loadDiaries();
  }

  async function updateDiary(id, diary) {
    await db.diaries.update(id, {
      ...diary,
      updatedAt: new Date().toISOString(),
    });

    await loadDiaries();
  }

  async function deleteDiary(id) {
    await db.diaries.delete(id);

    await loadDiaries();
  }

  useEffect(() => {
    loadDiaries();
  }, []);

  return {
    diaries,
    loading,

    addDiary,
    updateDiary,
    deleteDiary,

    reloadDiaries: loadDiaries,
  };
}