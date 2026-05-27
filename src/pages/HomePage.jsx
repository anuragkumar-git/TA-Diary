import PreferencesDrawer from "../components/preferences/PreferencesDrawer";

import { useDiaries } from "../hooks/useDiaries";
import { usePreferences } from "../hooks/usePreferences";

import { createDiary } from "../lib/createDiary";
import DiaryCard from "../components/diary/DairyCard";
import ExportModal from "../components/diary/ExportModal";

import { exportDiaryAsJson } from "../lib/exportDiary";
import { useState } from "react";
import { db } from "../db/db";
import ImportModal from "../components/diary/ImportModal";
import { normalizeImportedDiary } from "../lib/importDiary";
import { Menu } from "lucide-react";
import ManualBottomSheet from "../components/ManualBottomSheet";

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
      <main className="safe-bottom mx-auto max-w-md pt-0.5 px-4 pb-28">
        <header className="app-header -mx-4 mb-6 px-4 py-2 ">
          <div className="flex items-center justify-between">
            <div className="flex">
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
          </div>
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
                  border-slate-300 bg-white p-5
                  text-sm text-slate-500
                "
              >
                No diaries saved yet. Create your first one!
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
        <ManualBottomSheet />
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
