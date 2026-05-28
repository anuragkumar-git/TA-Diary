import { useEffect, useState } from "react";
import GroupSelect from "./GroupSelect";
import { Share2 } from "lucide-react";

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

  /**
   * New Helper: Updates top-level fields directly on the form object
   * Used for properties like 'companyName' that don't belong to a sub-section
   */
  function updateTopLevelField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
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

        text: "A Travel Allowance diary generator PWA with PDF preview and WhatsApp sharing.",

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
          bg-black/40 backdrop-blur-md
        "
      />

      <aside
        className={`
          fixed left-0 top-0 z-50
          h-full w-[90%] max-w-sm
          overflow-y-auto
          bg-white px-5 pb-5 
          transition-transform duration-300
          

          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <header className="app-header -mx-5 px-4 py-2 backdrop-blur-xs mb-3 mt-1 shadow-[0_4px_15px_rgba(15,23,42,0.2)] ">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Preferences</h1>

            <button
              onClick={onClose}
              className="
              py-2 text-red-600"
            >
              Close
            </button>
          </div>
        </header>

        <div className="space-y-6">
          <section>
            <h3 className="mb-3 font-semibold">Compnay & Group Details</h3>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                value={form?.companyName || ""}
                onChange={(e) =>
                  updateTopLevelField("companyName", e.target.value)
                }
                placeholder="Company Name"
                className="
      w-full rounded-2xl
      border border-slate-300
      bg-white px-4 py-3
    "
              />
              <div className="col-span-2">
                <GroupSelect
                  value={form?.group}
                  onChange={(value) => {
                    console.log(value);
                    setForm({
                      ...form,
                      group: value,
                    });
                  }}
                />
              </div>
            </div>
          </section>
          <section>
            <h3 className="mb-3 font-semibold">User Details</h3>

            <div className="space-y-3">
              <input
                value={form?.user?.name}
                onChange={(e) => updateField("user", "name", e.target.value)}
                placeholder="નામ"
                className="
                  w-full rounded-xl border
                  border-slate-300 p-3
                "
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={form?.user?.role}
                  onChange={(e) => updateField("user", "role", e.target.value)}
                  placeholder="હોદ્દો"
                  className="
                  w-full rounded-xl border
                  border-slate-300 p-3
                "
                />

                <input
                  value={form?.user?.badgeNo}
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
                value={form?.travelDefaults?.reason}
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
              <div className="grid grid-cols-3 gap-3">
                <input
                  value={form?.travelDefaults?.mode}
                  onChange={(e) =>
                    updateField("travelDefaults", "mode", e.target.value)
                  }
                  placeholder="વાહન"
                  className="
                  w-full rounded-xl border
                  border-slate-300 p-3
                  col-span-2
                "
                />

                <input
                  value={form?.travelDefaults?.distance}
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
            className="flex flex-1 items-center justify-center gap-2 w-full rounded-xl bg-emerald-100 px-4 py-4 font-semibold text-teal-800 "
          >
            <Share2 size={20} />
            <span>Share App</span>
          </button>
        </div>
      </aside>
    </>
  );
}
