import { useMemo, useState } from "react";

import { GROUPS } from "../../constants/groups";

export default function GroupSelect({ value, onChange }) {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const normalized = query.toLowerCase();

    return GROUPS.filter(
      (group) =>
        String(group.id).includes(normalized) ||
        group.location.toLowerCase().includes(normalized),
    );
  }, [query]);

  const selectedGroup = GROUPS.find((g) => g.id === value?.id);

  return (
    <div className="relative">
      {/* Input */}
      <input
        type="text"
        value={
          query ||
          (selectedGroup
            ? `${selectedGroup.id}: ${selectedGroup.location}`
            : "")
        }
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Select Group"
        className="
          w-full rounded-2xl
          border border-slate-300
          bg-white px-4 py-3
        "
      />

      {/* Dropdown */}
      {query && (
        <div
          className="
            absolute z-50 mt-2
            max-h-60 w-full
            overflow-y-auto
            rounded-2xl border
            border-slate-200
            bg-white shadow-xl
          "
        >
          {filteredGroups.length === 0 ? (
            <div
              className="
                px-4 py-3 text-sm
                text-slate-500
              "
            >
              No matching groups
            </div>
          ) : (
            filteredGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => {
                  onChange(group);

                  setQuery("");
                }}
                className="
                    flex w-full
                    items-center
                    px-4 py-3
                    text-left text-sm

                    hover:bg-slate-50
                  "
              >
                <span className="font-medium">{group.id}</span>
                <span className="mx-2 text-slate-400">|</span>
                <span>{group.location}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
