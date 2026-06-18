import React from "react";

export type GroupedColumn<T extends object> = {
  header: string;
  key: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type Props<T extends object> = {
  columns: GroupedColumn<T>[];
  data: T[];
  groupField: keyof T;
  getRowKey?: (row: T) => string | number;
  emptyMessage?: string;
};

export default function GroupedTable<T extends object>({
  columns,
  data,
  groupField,
  getRowKey,
  emptyMessage = "No records yet.",
}: Props<T>) {
  const grouped = data.reduce(
    (acc, row) => {
      const group = String(row[groupField] ?? "No Group") || "No Group";

      if (!acc[group]) {
        acc[group] = [];
      }

      acc[group].push(row);

      return acc;
    },
    {} as Record<string, T[]>,
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto simple-scrollbar max-h-100 overflow-y-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="sticky top-0 z-10 bg-slate-50 whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-10 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              Object.entries(grouped).flatMap(([groupName, rows]) => [
                <tr key={`group-${groupName}`}>
                  <td
                    colSpan={columns.length}
                    className="bg-blue-100 px-5 py-4 text-sm font-bold uppercase tracking-wider text-black"
                  >
                    {groupName}
                  </td>
                </tr>,

                ...rows.map((row, rowIndex) => (
                  <tr
                    key={getRowKey ? getRowKey(row) : rowIndex}
                    className="hover:bg-slate-50"
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className="whitespace-nowrap px-5 py-4 text-sm text-slate-700"
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key] ?? "-")}
                      </td>
                    ))}
                  </tr>
                )),
              ])
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
