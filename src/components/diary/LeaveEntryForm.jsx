import { useState } from "react";

export default function LeaveEntryForm({
  onAdd,
}) {
  const [date, setDate] = useState("");

  const [location, setLocation] =
    useState("");

  function handleAdd() {
    if (!date || !location.trim()) {
      return;
    }

    onAdd({
      id: crypto.randomUUID(),

      date,

      location,

      remarks: "",
    });

    setDate("");
    setLocation("");
  }

  return (
    <div
      className=" relative mt-4 space-y-3 overflow-hidden
        rounded-2xl border
        border-slate-200 bg-white
        p-4 shadow-sm
      "
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-teal-600"></div>
                          <p className="ml-2 text-xs font-bold uppercase text-teal-700">
                            New Leave Entry
                          </p>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="
            rounded-xl border
            border-slate-300 p-3
          "
        />

        <input
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          placeholder="ફરજ સ્થળ"
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
        + Add Leave
      </button>
    </div>
  );
}