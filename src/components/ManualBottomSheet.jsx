import { useState } from "react";

export default function ManualBottomSheet() {
  const [open, setOpen] = useState(false);

  const [language, setLanguage] = useState("gu");

  const steps = {
    gu: [
      {
        title: "૧. પ્રથમ Preferences સેટ કરો",
        desc: "મેનુ(≡) માં જઈને કંપની નામ, દળ, નામ, હોદ્દો અને મુસાફરીની ડિફોલ્ટ વિગતો સેટ કરો.",
      },

      {
        title: "૨. નવી ડાયરી બનાવો",
        desc: '"+ New Diary" દબાવીને માસિક ડાયરી શરૂ કરો.',
      },

      {
        title: "૩. મુસાફરી એન્ટ્રી ઉમેરો",
        desc: "તારીખ, સમય અને સ્થળ ઉમેરો.",
      },

      {
        title: "૪. રજા એન્ટ્રી ઉમેરો",
        desc: "રજા તારીખ અને સ્થળ ઉમેરો.",
      },

      {
        title: "૫. Preview અને Share કરો",
        desc: "PDF ચેક કરીને WhatsApp માં મોકલો.",
      },

      {
        title: "૬. Export / Import",
        desc: "ડાયરી બેકઅપ માટે Export અને પાછી લાવવા Import વાપરો.",
      },
    ],

    en: [
      {
        title: "1. Configure Preferences",
        desc: "Set company name, group, name, role and default travel details from menu(≡).",
      },

      {
        title: "2. Create New Diary",
        desc: 'Tap "+ New Diary" to start monthly diary.',
      },

      {
        title: "3. Add Travel Entries",
        desc: "Add dates, times and locations.",
      },

      {
        title: "4. Add Leave Entries",
        desc: "Add leave date and location.",
      },

      {
        title: "5. Preview & Share",
        desc: "Check PDF preview and share on WhatsApp.",
      },

      {
        title: "6. Export / Import",
        desc: "Use export for backup and import for restoring diaries.",
      },
    ],
  };

  return (
    <>
      {/* Sticky Footer Trigger */}
      <div
        className="
          fixed bottom-0 left-0 right-0
          z-40 border-t border-slate-200
          bg-white/60
          px-4 py-3
          backdrop-blur 
        "
      >
        <div className=" max-w-md mx-auto">
          <button
            onClick={() => setOpen(true)}
            className="
            w-full rounded-2xl border
            border-dashed border-slate-300  py-4
            text-sm font-medium 
          "
          >
            User Manual / માર્ગદર્શિકા
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed inset-0 z-50
            bg-black/40 backdrop-blur
          "
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`  max-w-md mx-auto
          fixed bottom-0 left-0 right-0
          z-50 rounded-t-3xl
          bg-white
          transition-transform duration-300

          ${open ? "translate-y-0" : "translate-y-full"}

          h-[80vh]
        `}
      >
        {/* Handle */}
        <div className="flex justify-center py-2">
          {/* <div
            className="
              h-1.5 w-16 rounded-full
              bg-slate-300
            "
          /> */}
        </div>

        {/* Header */}
        <div
          className="
            flex items-center
            justify-between
            px-5 pb-4
          "
        >
          {/* <h2 className="text-lg font-bold">User Manual</h2> */}

          <div className="flex">
            <div
              className="relative flex rounded-full bg-gray-950/5"
              role="tablist"
              aria-orientation="horizontal"
            >
              {/* Sliding Background */}
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-4xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 ease-out ${language === "gu" ? "left-1" : "left-[calc(50%)]"} `}
              />

              {/* Gujarati */}
              <button
                role="tab"
                type="button"
                aria-selected={language === "gu"}
                onClick={() => setLanguage("gu")}
                className={`relative z-10 flex-1 rounded-full px-1 py-1.5 mx-1 text-sm font-medium transition-colors duration-200 ${language === "gu" ? "text-black" : "text-slate-600"}`}
              >
                {/* ગુજરાતી  */}
                ગુજ
              </button>
              <button
                role="tab"
                type="button"
                aria-selected={language === "en"}
                onClick={() => setLanguage("en")}
                className={` relative z-10 flex-1 rounded-full px-1 py-1.5 text-sm font-medium transition-colors duration-200 mr-1.5 ${language === "en" ? "text-black" : "text-slate-600"}`}
              >
                {/* English  */}
                En
              </button>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="px-3 text-sm text-red-500"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div
          className="
            h-[calc(80vh-90px)]
            overflow-y-auto
            px-5 pb-10
          "
        >
          <div className="space-y-4">
            {steps[language].map((step, index) => (
              <div
                key={index}
                className="
                    rounded-2xl
                    bg-slate-50 p-4
                  "
              >
                <h3 className="font-semibold">{step.title}</h3>

                <p
                  className="
                      mt-2 text-sm
                      leading-6 text-slate-600
                    "
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
