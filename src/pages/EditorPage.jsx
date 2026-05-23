import { useEffect, useRef, useState } from "react";

import TravelEntryForm from "../components/diary/TravelEntryForm";
import LeaveEntryForm from "../components/diary/LeaveEntryForm";

import { db } from "../db/db";

import { GUJARATI_MONTHS } from "../lib/constants";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import PdfDocument from "../pdf/PdfDocument";

 

export default function EditorPage({ diary, onBack }) {
  const [form, setForm] = useState(diary);

  const [saving, setSaving] = useState(false);

  const [previewMode, setPreviewMode] = useState(false);

  const printRef = useRef(null);

  useEffect(() => {
    setForm(diary);
  }, [diary]);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function addTravelEntry(entry) {
    setForm((prev) => ({
      ...prev,

      travelEntries: [...prev.travelEntries, entry],
    }));
  }

  function removeTravelEntry(id) {
    setForm((prev) => ({
      ...prev,

      travelEntries: prev.travelEntries.filter((entry) => entry.id !== id),
    }));
  }

  function addLeaveEntry(entry) {
    setForm((prev) => ({
      ...prev,

      leaveEntries: [...prev.leaveEntries, entry],
    }));
  }

  function removeLeaveEntry(id) {
    setForm((prev) => ({
      ...prev,

      leaveEntries: prev.leaveEntries.filter((entry) => entry.id !== id),
    }));
  }

  async function handleSave() {
    try {
      setSaving(true);

      await db.diaries.update(diary.id, {
        ...form,

        updatedAt: new Date().toISOString(),
      });

      alert("Diary saved");
    } finally {
      setSaving(false);
    }
  }

  async function handleShare() {
    const blob = await pdf(<PdfDocument diary={form} />).toBlob();

    const filename = `T.A.${form.user.badgeNo}-${form.month}${form.year}.pdf`;

    const file = new File([blob], filename, {
      type: "application/pdf",
    });

    if (
      navigator.canShare?.({
        files: [file],
      })
    ) {
      await navigator.share({
        title: "T.A. Diary",

        files: [file],
      });
    }
  }

  if (previewMode) {
    return (
      <>
        <div
          className="
          fixed inset-0
          bg-slate-200
        "
        >
          <PDFViewer width="100%" height="100%">
            <PdfDocument diary={form} />
          </PDFViewer>
        </div>

        <div
          className="
          fixed bottom-0 left-0
          right-0 z-50
          border-t border-slate-200
          bg-white p-4
        "
        >
          <div className="mx-auto flex max-w-md gap-3">
            <button
              onClick={() => setPreviewMode(false)}
              className="
              flex-1 rounded-xl
              bg-slate-200 px-4 py-4
            "
            >
              Back
            </button>

            <button
              onClick={handleShare}
              className="
              flex-1 rounded-xl
              bg-teal-700 px-4 py-4
              text-white
            "
            >
              Share PDF
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <main className="safe-bottom mx-auto max-w-md p-4">
      <header className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="
            rounded-xl border
            border-slate-300 bg-white
            px-4 py-2
          "
        >
          Back
        </button>

        <h1 className="text-xl font-bold">Editor</h1>

        <button
          className="
            rounded-xl border
            border-slate-300 bg-white
            px-4 py-2
          "
        >
          Import
        </button>
      </header>

      <div className="space-y-6">
        <section
          className="
            rounded-2xl border
            border-slate-200 bg-white
            p-4 shadow-sm
          "
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Month</label>

              <select
                value={form.month}
                onChange={(e) => updateField("month", Number(e.target.value))}
                className="
                  w-full rounded-xl border
                  border-slate-300 p-3
                "
              >
                {GUJARATI_MONTHS.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Year</label>

              <input
                type="number"
                value={form.year}
                onChange={(e) => updateField("year", Number(e.target.value))}
                className="
                  w-full rounded-xl border
                  border-slate-300 p-3
                "
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Travel</h2>
          </div>

          <TravelEntryForm onAdd={addTravelEntry} />

          <div className="mt-4 space-y-3">
            {form.travelEntries.map((entry) => (
              <div
                key={entry.id}
                className="
                    rounded-2xl border
                    border-slate-200
                    bg-white p-4
                  "
              >
                <div className="space-y-2 text-sm">
                  <p>
                    {entry.from} → {entry.to}
                  </p>

                  <p>
                    {entry.startDate} {entry.startTime}
                  </p>

                  <p>
                    {entry.endDate} {entry.endTime}
                  </p>
                </div>

                <button
                  onClick={() => removeTravelEntry(entry.id)}
                  className="
                      mt-3 rounded-lg
                      bg-red-50 px-3 py-2
                      text-sm text-red-600
                    "
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Leave</h2>
          </div>

          <LeaveEntryForm onAdd={addLeaveEntry} />

          <div className="mt-4 space-y-3">
            {form.leaveEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="
                    rounded-2xl border
                    border-slate-200
                    bg-white p-4
                  "
              >
                <div className="space-y-2 text-sm">
                  <p>#{index + 1}</p>

                  <p>{entry.date}</p>

                  <p>{entry.location}</p>
                </div>

                <button
                  onClick={() => removeLeaveEntry(entry.id)}
                  className="
                      mt-3 rounded-lg
                      bg-red-50 px-3 py-2
                      text-sm text-red-600
                    "
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div
        className="
          fixed bottom-0 left-0 right-0
          border-t border-slate-200
          bg-white p-4
        "
      >
        <div className="mx-auto flex max-w-md gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="
              flex-1 rounded-xl
              bg-teal-700 px-4 py-4
              font-semibold text-white
            "
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            onClick={() => setPreviewMode(true)}
            className="
              flex-1 rounded-xl
              bg-emerald-100 px-4 py-4
              font-semibold text-teal-800
            "
          >
            Preview
          </button>
        </div>
      </div>
    </main>
  );
}
