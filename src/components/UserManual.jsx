import { useState } from "react";

export default function UserManual() {
  const [open, setOpen] =
    useState(false);

  return (
    <section className="mt-10">
      <button
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className="
          w-full rounded-2xl
          border border-slate-300
          bg-white p-4
          text-left shadow-sm
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">
              User Guide
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              એપ કેવી રીતે વાપરવી
            </p>
          </div>

          <span className="text-sm text-slate-500">
            {open ? "Hide" : "Show"}
          </span>
        </div>
      </button>

      {open && (
        <div
          className="
            mt-4 space-y-4 rounded-2xl
            bg-white p-4 shadow-sm
          "
        >
          <div>
            <h3 className="font-semibold">
              1. Create Diary
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              <strong>English:</strong>{" "}
              Tap "+ New Diary" to create a monthly diary.
            </p>

            <p className="mt-1 text-sm text-slate-600">
              <strong>ગુજરાતી:</strong>{" "}
              નવી ડાયરી બનાવવા માટે "+ New Diary" દબાવો.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              2. Add Travel Entries
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              <strong>English:</strong>{" "}
              Add travel dates, times and locations in Travel section.
            </p>

            <p className="mt-1 text-sm text-slate-600">
              <strong>ગુજરાતી:</strong>{" "}
              મુસાફરી વિભાગમાં તારીખ, સમય અને સ્થળ ઉમેરો.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              3. Add Leave Entries
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              <strong>English:</strong>{" "}
              Add leave date and location in Leave section.
            </p>

            <p className="mt-1 text-sm text-slate-600">
              <strong>ગુજરાતી:</strong>{" "}
              રજા વિભાગમાં તારીખ અને સ્થળ ઉમેરો.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              4. Preview & Share PDF
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              <strong>English:</strong>{" "}
              Use Preview to check the A4 diary and Share to send PDF on WhatsApp.
            </p>

            <p className="mt-1 text-sm text-slate-600">
              <strong>ગુજરાતી:</strong>{" "}
              Preview થી PDF તપાસો અને Share થી WhatsApp માં મોકલો.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              5. Import / Export
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              <strong>English:</strong>{" "}
              Export creates backup JSON. Import restores old diaries.
            </p>

            <p className="mt-1 text-sm text-slate-600">
              <strong>ગુજરાતી:</strong>{" "}
              Export બેકઅપ બનાવે છે અને Import જૂની ડાયરી પાછી લાવે છે.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}