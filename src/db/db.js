import Dexie from "dexie";

export const db = new Dexie("TADiaryDatabase");

db.version(1).stores({
  diaries: "++id, [year+month], updatedAt",
});