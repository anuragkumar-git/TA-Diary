import { useState } from "react";

export default function ImportModal({ open, onClose, onImport }) {
  const [text, setText] = useState("");

  const [error, setError] = useState("");

  if (!open) return null;

  function handleImport() {
    try {
      const parsed = JSON.parse(text);

      onImport(parsed);

      setText("");
      setError("");

      onClose();
    } catch {
      setError("Invalid JSON. Please paste exported diary data.");
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className="
          fixed inset-0 z-40
          bg-black/40 backdrop-blur
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
          <h2 className="text-lg font-bold">Import Diary</h2>

          <button
            onClick={onClose}
            className="
              rounded-lg bg-red-50
              px-3 py-2 text-red-600
            "
          >
            Close
          </button>
        </div>

        <textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste diary JSON here..."
          className="
            h-72 w-full rounded-xl
            border border-slate-300
            p-3 font-mono text-sm
          "
        />

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          onClick={handleImport}
          className="
            mt-4 w-full rounded-xl
            bg-teal-700 px-4 py-4
            font-semibold text-white
          "
        >
          Import Diary
        </button>
      </div>
    </>
  );
}
