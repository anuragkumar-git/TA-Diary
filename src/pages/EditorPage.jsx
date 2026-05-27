import { useEffect, useRef, useState } from "react";

import TravelEntryForm from "../components/diary/TravelEntryForm";
import LeaveEntryForm from "../components/diary/LeaveEntryForm";

import { db } from "../db/db";

import { GUJARATI_MONTHS } from "../lib/constants";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import PdfDocument from "../pdf/PdfDocument";
import { Trash2 } from "lucide-react";
import {
  formatGujaratiDate,
  getGujaratiWeekday,
  toGujaratiDigits,
} from "../pdf/pdfUtils";
import dayjs from "dayjs";
import TravelAndLeaveDiary from "../components/diary/TravelAndLeaveDiary";

export default function EditorPage({ diary, onBack }) {
  const [form, setForm] = useState(diary);

  const [saving, setSaving] = useState(false);

  const [previewMode, setPreviewMode] = useState(false);

  const [saveStatus, setSaveStatus] = useState("saved");

  const printRef = useRef(null);
  const hasMounted = useRef(false);
  const savingRef = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;

      return;
    }

    setSaveStatus("unsaved");
  }, [form]);

  useEffect(() => {
    if (saveStatus !== "unsaved") {
      return;
    }

    const timeout = setTimeout(() => {
      handleSave();
    }, 800);

    return () => clearTimeout(timeout);
  }, [form, saveStatus]);

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

  async function handleSave(updatedForm = form) {
    if (savingRef.current) {
      return;
    }
    try {
      savingRef.current = true;
      // setSaving(true);
      setSaveStatus("saving");
      await db.diaries.update(diary.id, {
        ...updatedForm,

        updatedAt: new Date().toISOString(),
      });
      setSaveStatus("saved");
    } catch (error) {
      console.error(error);

      setSaveStatus("unsaved");
    } finally {
      savingRef.current = false;
    }
  }

  async function handleShare() {
    try {
      await handleSave(form);
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
        onBack();
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (previewMode) {
    return (
      <>
        {/* Main Preview Container */}
        <div className="fixed inset-0 z-40 overflow-y-auto bg-slate-200 pb-28 pt-4">
          <div className="pdf-preview-shell">
            {/* CRITICAL WRAPPER 2: Applies CSS zoom scaling to fit standard A4 down to mobile viewports */}
            <div className="pdf-print-area flex flex-col gap-6">
              <TravelAndLeaveDiary dairy={form} />
            </div>
          </div>
        </div>

        {/* Floating Sticky Action Footer */}
        <div
          className="
          fixed bottom-0 left-0 right-0 z-50
          border-t border-slate-200
          bg-white p-4 shadow-lg
        "
        >
          <div className="mx-auto flex max-w-md gap-3">
            <button
              onClick={() => setPreviewMode(false)}
              className="
              flex-1 rounded-xl
              bg-slate-200 px-4 py-4 font-medium text-slate-700
              hover:bg-slate-300 transition-colors
            "
            >
              Back
            </button>

            <button
              onClick={handleShare}
              className="
              flex-1 rounded-xl
              bg-teal-700 px-4 py-4 font-medium
              text-white hover:bg-teal-800 transition-colors
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
    <>
      <main className="safe-bottom mx-auto max-w-md px-4 pb-4 pt-0.5">
        <header className="mb-6 app-header -mx-4 px-4 py-2 font-bold">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="font-medium text-teal-700 py-2">
              ← Back
            </button>

            <h1 className="text-xl font-bold">Editor</h1>
            {/* <div className="w-18" /> */}
            <div className="w-13" />
          </div>
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

            <div className="mb-4 space-y-3">
              {form.travelEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="
        group flex items-start
        justify-between gap-3
        rounded-2xl border
        border-slate-200
        bg-white p-4
        shadow-sm transition-all

        hover:border-teal-200
        hover:shadow-md
      "
                >
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    {/* Route */}
                    <div
                      className="
            flex items-center gap-2
            text-base font-semibold
            text-slate-800
          "
                    >
                      <span className="truncate">{entry.from}</span>

                      <span className="text-slate-400">→</span>

                      <span className="truncate">{entry.to}</span>
                    </div>

                    {/* Date + Time Grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                      {/* Start */}
                      <div>
                        <p
                          className="
        flex items-center gap-2
        text-slate-600
      "
                        >
                          {/* <span>📅</span> */}

                          <span className="text-base">
                            {formatGujaratiDate(entry?.startDate)}
                          </span>
                        </p>
                        {entry?.startTime && (
                          <p
                            className="
        flex items-center gap-2
        text-xs text-slate-400
      "
                          >
                            {/* <span>🕒</span> */}

                            <span className="text-base">
                              {toGujaratiDigits(entry?.startTime)}
                            </span>
                          </p>
                        )}
                      </div>

                      {/* End */}
                      <div>
                        <p
                          className="
        flex items-center gap-2
        text-slate-600
      "
                        >
                          {/* <span>📅</span> */}

                          <span className="text-base">
                            {formatGujaratiDate(entry?.endDate)}
                          </span>
                        </p>
                        {entry?.endTime && (
                          <p
                            className="
          flex items-center gap-2
        text-xs text-slate-400
      "
                          >
                            {/* <span>🕒</span> */}

                            <span className="text-base">
                              {toGujaratiDigits(entry.endTime)}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeTravelEntry(entry.id)}
                    className="
          flex  
          shrink-0 items-center
          justify-center
          rounded-xl text-red-500
          transition-colors

          hover:bg-red-50
          hover:text-red-600
        "
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <TravelEntryForm onAdd={addTravelEntry} />
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">Leave</h2>
            </div>

            <div className="mb-4 space-y-3">
              {form.leaveEntries.map((entry, index) => (
                <div
                  key={entry.id}
                  className="
          group flex items-start
          justify-between gap-3
          rounded-2xl border
          border-slate-200
          bg-white p-4
          shadow-sm transition-all

          hover:border-teal-200
          hover:shadow-md
        "
                >
                  {/* Left Content */}
                  <div className="flex min-w-0 flex-1 gap-3">
                    {/* Index Badge */}
                    <div
                      className="
              flex 
              shrink-0 items-center
              justify-center
              
              text-sm font-semibold
              text-slate-700
            "
                    >
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      {/* Date + Weekday */}
                      <div
                        className="
                        flex flex-wrap
                        items-center gap-x-3
                gap-y-1 text-sm
                text-slate-600
              "
                      >
                        <span className="text-base">
                          {dayjs(entry.date).format("DD MMM YYYY")},
                        </span>
                        <span className="text-base">
                          {getGujaratiWeekday(entry.date)}
                        </span>
                        {/* Location */}
                        <p
                          className="ml-1
                truncate text-base
               
                text-slate-800
              "
                        >
                          {entry.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeLeaveEntry(entry.id)}
                    className="
            flex 
            shrink-0 items-center
            justify-center
            rounded-xl text-red-500
            transition-colors

            hover:bg-red-50
            hover:text-red-600
          "
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <LeaveEntryForm onAdd={addLeaveEntry} />
          </section>
        </div>

        <div className=" mx-auto fixed bottom-0 left-0 right-0 shadow-[0_-4px_20px_rgba(15,23,42,0.2)] backdrop-blur-sm bg-white/75 p-4">
          <div className="mx-auto max-w-md  flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="
              flex-1 rounded-xl
              bg-teal-800/75 px-4 py-4
              font-semibold text-white
              backdrop-blur 
            "
            >
              {saveStatus === "saving"
                ? "Saving..."
                : saveStatus === "saved"
                  ? "Saved"
                  : "Save"}
            </button>

            <button
              onClick={() => setPreviewMode(true)}
              className="
              flex-1 rounded-xl
              bg-emerald-100/75 px-4 py-4
              font-semibold backdrop-blur text-teal-800
            "
            >
              Preview
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
