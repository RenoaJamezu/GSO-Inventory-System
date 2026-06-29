import { useState } from "react";

type Props = {
  value?: number | null;
  groups: {
    id: number;
    name: string;
  }[];
  onChange: (value: number | null) => void;
  onCreateGroup: (name: string) => Promise<void>;
  onDeleteGroup?: (id: number) => Promise<void>;
};

export default function GroupSelector({
  value,
  groups,
  onChange,
  onCreateGroup,
  onDeleteGroup,
}: Props) {
  const [newGroup, setNewGroup] = useState("");

  const search = newGroup.trim().toLowerCase();
  const selectedGroup = groups.find((group) => group.id === value);
  const filteredGroups = search
    ? groups.filter((group) => group.name.toLowerCase().includes(search))
    : groups;

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold uppercase text-slate-700">
          Group
        </label>

        <span className="max-w-[60%] truncate text-xs font-medium text-slate-500">
          {selectedGroup?.name ?? "No Group"}
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <input
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder="Search or create group"
          className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
        />

        <button
          type="button"
          onClick={async () => {
            if (!newGroup.trim()) return;

            await onCreateGroup(newGroup.trim());
            setNewGroup("");
          }}
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm text-white"
        >
          Create
        </button>

        {value && onDeleteGroup && (
          <button
            type="button"
            onClick={async () => {
              const confirmed = window.confirm("Delete this group?");
              if (!confirmed) return;

              await onDeleteGroup(value);
              onChange(null);
            }}
            className="rounded-xl border border-red-200 px-4 py-2 text-sm text-red-600"
          >
            Delete
          </button>
        )}
      </div>

      <div className="max-h-44 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-1">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
            value == null
              ? "bg-sky-600 text-white"
              : "text-slate-700 hover:bg-white"
          }`}
        >
          <span>No Group</span>
          {value == null && <span className="text-xs">Selected</span>}
        </button>

        {filteredGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => onChange(group.id)}
            className={`mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
              value === group.id
                ? "bg-sky-600 text-white"
                : "text-slate-700 hover:bg-white"
            }`}
          >
            <span className="min-w-0 truncate">{group.name}</span>
            {value === group.id && <span className="text-xs">Selected</span>}
          </button>
        ))}

        {filteredGroups.length === 0 && (
          <p className="px-3 py-4 text-center text-sm text-slate-500">
            No matching group. Click Create to add it.
          </p>
        )}
      </div>
    </div>
  );
}
