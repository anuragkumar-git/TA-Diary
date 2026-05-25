import PreferencesDrawer from "../components/preferences/PreferencesDrawer";

import { useDiaries } from "../hooks/useDiaries";
import { usePreferences } from "../hooks/usePreferences";

import { createDiary } from "../lib/createDiary";
import DiaryCard from "../components/diary/DairyCard";
import ExportModal from "../components/diary/ExportModal";

import { exportDiaryAsJson } from "../lib/exportDiary";
import { useState } from "react";
import UserManual from "../components/UserManual";
import { db } from "../db/db";
import ImportModal from "../components/diary/ImportModal";
import { normalizeImportedDiary } from "../lib/importDiary";
import { Menu } from "lucide-react";

export default function HomePage({ onOpenDiary, onCreateDiary }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { diaries, addDiary, deleteDiary } = useDiaries();

  const { preferences, updatePreferences } = usePreferences();

  const [exportOpen, setExportOpen] = useState(false);

  const [exportJson, setExportJson] = useState("");

  const [importOpen, setImportOpen] = useState(false);

  async function handleCreateDiary() {
    const diary = createDiary();

    const insertedId = await addDiary(diary);

    const savedDiary = await db.diaries.get(insertedId);

    onCreateDiary(savedDiary);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this diary?");

    if (!confirmed) return;

    await deleteDiary(id);
  }

  function handleExport(diary) {
    const json = exportDiaryAsJson(diary);

    setExportJson(json);

    setExportOpen(true);
  }

  async function handleImport(rawData) {
    try {
      const normalized = normalizeImportedDiary(rawData);

      const insertedId = await db.diaries.add(normalized);

      const savedDiary = await db.diaries.get(insertedId);

      // setForm(savedDiary);
      setImportOpen(false);
      onOpenDiary(savedDiary);
    } catch (error) {
      alert(error.message || "Import failed.");
    }
  }

  return (
    <>
      <main className="mx-auto max-w-md p-4">
        <header className="mb-6 flex items-center font-semibold  justify-between">
          <div className="flex">
            {/* <button
              onClick={() => setDrawerOpen(true)}
              // className="font-bold text-6xl  p-1"
              className="  p-2 place-items-center rounded-xl bg-white text-2xl text-slate-700 "
              // className="w-9 place-items-center   text-2xl text-slate-700 "
              aria-label="Open preferences"
            >
              ≡
            </button> */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="pb-1"
              aria-label="Open preferences"
            >
              <Menu size={20} />
            </button>

            <h1 className="text-2xl p-2 font-bold">My Diaries</h1>
          </div>

          <button
            onClick={() => setImportOpen(true)}
            className="p-3 font-semibold text-teal-700"
          >
            Import
          </button>
        </header>

        <button
          onClick={handleCreateDiary}
          className="
            w-full rounded-xl
            bg-teal-700
            px-4 py-4
            text-lg font-semibold
            text-white shadow-sm
          "
        >
          + New Diary
        </button>

        <section className="mt-8">
          <h2 className="mb-3 text-md font-bold text-slate-500">Old Diaries</h2>

          <div className="space-y-3">
            {diaries.length === 0 ? (
              <div
                className="
                  rounded-2xl border border-dashed
                  border-slate-300 bg-white p-8
                  text-center text-slate-500
                "
              >
                No diaries saved yet.
              </div>
            ) : (
              diaries.map((diary) => (
                <div key={diary.id} onClick={() => onOpenDiary(diary)}>
                  <div key={diary.id} className="space-y-2">
                    <div onClick={() => onOpenDiary(diary)}>
                      <DiaryCard
                        diary={diary}
                        onDelete={handleDelete}
                        onExport={handleExport}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        <UserManual />
      </main>

      <PreferencesDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        preferences={preferences}
        onSave={updatePreferences}
      />
      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        json={exportJson}
      />
      <ImportModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={handleImport}
      />
    </>
  );
}
