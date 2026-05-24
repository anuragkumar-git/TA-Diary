import { useState } from "react";
import { GUJARATI_MONTHS } from "../../lib/constants";

export default function DiaryCard({ diary, onDelete }) {
  const month =
    GUJARATI_MONTHS.find((m) => m.value === diary.month)?.label || diary.month;
  const [exportText, setExportText] = useState("");
  const [exportDialog, setExportDialog] = useState(false);
  const [exportMessage, setExportMessage] = useState("");

  const getDiaryPayload = (diary) => ({
    month: diary?.month || "",
    year: diary?.year || "",
    user: diary?.user,
    travelEntries: diary?.travelEntries || [],
    leaveEntries: diary?.leaveEntries || [],
    travelDefaults: diary.travelDefaults,
  });

  const writeClipboard = async (text) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return false;
  };

  const handleExportDiary = async (event, diary) => {
    event.stopPropagation();
    setExportDialog(true);
    console.log("handleExportDiary");
    const text = JSON.stringify(getDiaryPayload(diary), null, 2);
    setExportText(text);
    setExportMessage("");

    try {
      const copied = await writeClipboard(text);
      setExportMessage(
        copied ? "Copied to clipboard." : "Copy manually from below.",
      );
    } catch {
      setExportMessage("Copy manually from below.");
    }
  };

  const handleCopyExportText = async () => {
    try {
      const copied = await writeClipboard(exportText);
      setExportMessage(
        copied ? "Copied to clipboard." : "Copy manually from below.",
      );
    } catch {
      setExportMessage("Copy manually from below.");
    }
  };

  {
    exportDialog && (
      <div
        className="no-print fixed inset-0 z-20 grid place-items-center bg-slate-900/40 p-4"
        onClick={() => setExportText("")}
      >
        {/* Added min-w-0 to prevent the container from expanding past the screen */}
        <div
          className="w-full max-w-2xl min-w-0 rounded-2xl bg-white p-4 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Export Diary</h2>
              <p className="text-sm text-slate-500">{exportMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setExportText("")}
              className="px-3  text-sm font-semibold text-red-600 transition  active:scale-95"
            >
              Close
            </button>
          </div>

          {/* Added whitespace-pre and block to the code tag */}
          <pre className="max-h-[55vh] w-full overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-50 whitespace-pre">
            <code className="block min-w-full">{exportText}</code>
          </pre>

          <button
            type="button"
            onClick={handleCopyExportText}
            className={`rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 active:scale-95 mt-3 w-full`}
          >
            Copy JSON
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      className="
        rounded-2xl border border-slate-200
        bg-white p-4 shadow-sm
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">
            {month} - {diary.year}
          </h3>

          {/* <p className="mt-1 text-sm text-slate-500">
            {diary.user?.name}
          </p> */}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(diary.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-red-600 hover:text-red-800 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
