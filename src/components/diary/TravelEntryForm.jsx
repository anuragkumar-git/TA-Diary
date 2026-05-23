import { useState } from "react";

export default function TravelEntryForm({
  onAdd,
}) {
  const [draft, setDraft] = useState({
    startDate: "",
    endDate: "",

    startTime: "",
    endTime: "",

    from: "",
    to: "",
  });

  function updateField(field, value) {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleAdd() {
    const hasLocation =
      draft.from.trim() ||
      draft.to.trim();
    
    const hasDate = draft.startDate || draft.endDate 
    if (!hasLocation || !hasDate) {
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      ...draft,
    });

    setDraft({
      startDate: "",
      endDate: "",

      startTime: "",
      endTime: "",

      from: "",
      to: "",
    });
  }

  return (
    <div
      className="
        rounded-2xl border
        border-slate-200 bg-white
        p-4 shadow-sm
      "
    >
      <div className="grid grid-cols-2 gap-3">
        <input
          type="date"
          value={draft.startDate}
          onChange={(e) =>
            updateField(
              "startDate",
              e.target.value
            )
          }
          className="
            rounded-xl border
            border-slate-300 p-3
          "
        />

        <input
          type="date"
          value={draft.endDate}
          onChange={(e) =>
            updateField(
              "endDate",
              e.target.value
            )
          }
          className="
            rounded-xl border
            border-slate-300 p-3
          "
        />

        <input
          type="time"
          value={draft.startTime}
          onChange={(e) =>
            updateField(
              "startTime",
              e.target.value
            )
          }
          className="
            rounded-xl border
            border-slate-300 p-3
          "
        />

        <input
          type="time"
          value={draft.endTime}
          onChange={(e) =>
            updateField(
              "endTime",
              e.target.value
            )
          }
          className="
            rounded-xl border
            border-slate-300 p-3
          "
        />

        <input
          value={draft.from}
          onChange={(e) =>
            updateField(
              "from",
              e.target.value
            )
          }
          placeholder="ક્યાંથી"
          className="
            rounded-xl border
            border-slate-300 p-3
          "
        />

        <input
          value={draft.to}
          onChange={(e) =>
            updateField(
              "to",
              e.target.value
            )
          }
          placeholder="ક્યાં સુધી"
          className="
            rounded-xl border
            border-slate-300 p-3
          "
        />
      </div>

      <button
        onClick={handleAdd}
        className="
          mt-4 w-full rounded-xl
          bg-teal-700 px-4 py-3
          font-semibold text-white
        "
      >
        + Add Row Data
      </button>
    </div>
  );
}