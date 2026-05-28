import { useEffect, useState } from "react";

export default function ExportModal({ open, onClose, json }) {
  const [copied, setCopied] = useState(false);
  const [exportMessage, setExportMessage] = useState("")

  useEffect(() => {
    if (!open) return;

    async function copyJson() {
      try {
        await navigator.clipboard.writeText(json);
        setExportMessage("Copied to clipboard.");

        setCopied(true);
      } catch {
        setCopied(false);
        setExportMessage("Copy manually from below.");
      }
    }

    copyJson();
  }, [open, json]);

  if (!open) return null;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(json);
      setExportMessage("Copied to clipboard.");
      setCopied(true);
    } catch (error) {
      setCopied(false);
      setExportMessage("Copy manually from below.");
      console.error(error)
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className="
          fixed inset-0 z-40
          bg-black/40 backdrop-blur-md
        "
      />

      <div
        className="
          fixed left-1/2 top-1/2
          z-50 w-[95%] max-w-lg
          -translate-x-1/2
          -translate-y-1/2
          rounded-2xl bg-white
          p-4 shadow-xl
        "
      >
        <div className="mb-4 flex items-center justify-between">
           <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Export Diary
                  </h2>
                  <p className="text-sm text-slate-500">{exportMessage}</p>
                </div>

          <button onClick={onClose} className="px-3 text-red-600">
            Close
          </button>
        </div>

        <textarea
          readOnly
          value={json}
          className="
            h-72 w-full rounded-xl
            border border-slate-300
            p-3 font-mono text-sm
          "
        />

        <button
          onClick={handleCopy}
          className="
            mt-4 w-full rounded-xl
            bg-teal-700 px-4 py-4
            font-semibold text-white
          "
        >
          {copied ? "Copied" : "Copy JSON"}
        </button>
      </div>
    </>
  );
}
