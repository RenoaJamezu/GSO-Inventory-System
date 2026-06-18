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

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold">Group</label>

      <div className="flex flex-wrap gap-2 mt-2">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={`rounded-full px-4 py-2 text-sm transition ${
            value == null
              ? "bg-sky-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          No Group
        </button>

        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => onChange(group.id)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              value === group.id
                ? "bg-sky-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder="Create group"
          className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
        />

        <button
          type="button"
          onClick={async () => {
            if (!newGroup.trim()) return;

            await onCreateGroup(newGroup);

            setNewGroup("");
          }}
          className="rounded-xl bg-sky-600 px-4 text-white"
        >
          Add
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
            className="rounded-xl border border-red-200 px-4 py-2 text-red-600"
          >
            Delete Group
          </button>
        )}
      </div>
    </div>
  );
}
