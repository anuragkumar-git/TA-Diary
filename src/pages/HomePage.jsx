import PreferencesDrawer from "../components/preferences/PreferencesDrawer";

import { useDiaries } from "../hooks/useDiaries";
import { usePreferences } from "../hooks/usePreferences";

import { createDiary } from "../lib/createDiary";
import DiaryCard from "../components/diary/DairyCard";
import ExportModal from "../components/diary/ExportModal";

import { exportDiaryAsJson } from "../lib/exportDiary";
import { useState } from "react";

export default function HomePage({ onOpenDiary }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { diaries, addDiary, deleteDiary } = useDiaries();

  const { preferences, updatePreferences } = usePreferences();
  const [exportOpen, setExportOpen] = useState(false);

  const [exportJson, setExportJson] = useState("");
  async function handleCreateDiary() {
    const diary = createDiary();

    await addDiary(diary);
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
  return (
    <>
      <main className="mx-auto max-w-md p-4">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Diaries</h1>

          <button
            onClick={() => setDrawerOpen(true)}
            className="
              rounded-xl border
              border-slate-300 bg-white
              px-4 py-2
            "
          >
            Menu
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
          <h2 className="mb-3 text-sm font-semibold text-slate-500">
            Old Diaries
          </h2>

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
                      <DiaryCard diary={diary} onDelete={handleDelete} />
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExport(diary);
                      }}
                      className="
      w-full rounded-xl
      bg-emerald-100 px-4 py-3
      text-sm font-medium
      text-teal-800
    "
                    >
                      Export
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
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
    </>
  );
}
