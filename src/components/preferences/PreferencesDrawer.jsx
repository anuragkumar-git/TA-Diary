import { useEffect, useState } from "react";

export default function PreferencesDrawer({
  open,
  onClose,
  preferences,
  onSave,
}) {
  const [form, setForm] = useState(preferences);

  useEffect(() => {
    setForm(preferences);
  }, [preferences]);

  if (!open) return null;

  function updateField(section, field, value) {
    setForm((prev) => ({
      ...prev,

      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }

  function handleSave() {
    onSave(form);

    onClose();
  }

  async function handleShareApp() {
    try {
      await navigator.share({
        title: "T.A. Diary",

        text: "T.A. Diary App",

        url: window.location.href,
      });
    } catch (error) {
      console.error(error);
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

      <aside
        className="
          fixed left-0 top-0 z-50
          h-full w-[90%] max-w-sm
          overflow-y-auto
          bg-white p-5 shadow-xl
        "
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Preferences</h2>

          <button
            onClick={onClose}
            className="
              
               text-red-600
            "
          >
            Close
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="mb-3 font-semibold">User Details</h3>

            <div className="space-y-3">
              <input
                value={form.user.name}
                onChange={(e) => updateField("user", "name", e.target.value)}
                placeholder="નામ"
                className="
                  w-full rounded-xl border
                  border-slate-300 p-3
                "
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={form.user.role}
                  onChange={(e) => updateField("user", "role", e.target.value)}
                  placeholder="હોદ્દો"
                  className="
                  w-full rounded-xl border
                  border-slate-300 p-3
                "
                />

                <input
                  value={form.user.badgeNo}
                  onChange={(e) =>
                    updateField("user", "badgeNo", e.target.value)
                  }
                  placeholder="બ. નં."
                  className="
                  w-full rounded-xl border
                  border-slate-300 p-3
                "
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3 font-semibold">Travel Defaults</h3>

            <div className="space-y-3">
              <textarea
                value={form.travelDefaults.reason}
                onChange={(e) =>
                  updateField("travelDefaults", "reason", e.target.value)
                }
                placeholder="મુસાફરીનું કારણ"
                rows={4}
                className="
                  w-full rounded-xl border
                  border-slate-300 p-3
                "
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={form.travelDefaults.mode}
                  onChange={(e) =>
                    updateField("travelDefaults", "mode", e.target.value)
                  }
                  placeholder="વાહન"
                  className="
                  w-full rounded-xl border
                  border-slate-300 p-3
                "
                />

                <input
                  value={form.travelDefaults.distance}
                  onChange={(e) =>
                    updateField("travelDefaults", "distance", e.target.value)
                  }
                  placeholder="કેટલા માઈલ"
                  className="
                  w-full rounded-xl border
                  border-slate-300 p-3
                "
                />
              </div>
            </div>
          </section>

          <button
            onClick={handleSave}
            className="
              w-full rounded-xl
              bg-teal-700 px-4 py-4
              font-semibold text-white
            "
          >
            Save Preferences
          </button>
          <button
            onClick={handleShareApp}
            className="
    w-full rounded-xl
    bg-emerald-100 px-4 py-4
    font-semibold text-teal-800
  "
          >
            Share App
          </button>
        </div>
      </aside>
    </>
  );
}
