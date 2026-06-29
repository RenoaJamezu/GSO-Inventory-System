import React from "react";

export type GroupedColumn<T extends object> = {
  header: string;
  key: keyof T;
  group?: string;
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

  const hasGroupedHeaders = columns.some((column) => column.group);

  const groupedHeaders = columns.reduce(
    (acc, column) => {
      if (!column.group) {
        return acc;
      }

      if (!acc[column.group]) {
        acc[column.group] = [];
      }

      acc[column.group].push(column);

      return acc;
    },
    {} as Record<string, GroupedColumn<T>[]>,
  );

  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="simple-scrollbar min-h-0 flex-1 overflow-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            {hasGroupedHeaders ? (
              <>
                <tr>
                  {columns.map((column) => {
                    if (column.group) {
                      const firstColumn =
                        groupedHeaders[column.group][0] === column;

                      if (!firstColumn) return null;

                      return (
                        <th
                          key={column.group}
                          colSpan={groupedHeaders[column.group].length}
                          className="
                  sticky top-0 z-20
                  border-x border-slate-200
                  bg-slate-50
                  px-5 py-3
                  text-center
                  text-xs font-semibold uppercase tracking-[0.2em]
                  text-slate-500
                "
                        >
                          {column.group}
                        </th>
                      );
                    }

                    return (
                      <th
                        key={String(column.key)}
                        rowSpan={2}
                        className="
                sticky top-0 z-20
                border-x border-slate-200
                bg-slate-50
                whitespace-nowrap
                px-5 py-3
                text-left
                text-xs font-semibold uppercase tracking-[0.2em]
                text-slate-500
              "
                      >
                        {column.header}
                      </th>
                    );
                  })}
                </tr>

                <tr>
                  {columns
                    .filter((column) => column.group)
                    .map((column) => (
                      <th
                        key={String(column.key)}
                        className="
                sticky top-10 z-10
                border-x border-b border-slate-200
                bg-slate-50
                whitespace-nowrap
                px-5 py-3
                text-left
                text-xs font-semibold uppercase tracking-[0.2em]
                text-slate-500
              "
                      >
                        {column.header}
                      </th>
                    ))}
                </tr>
              </>
            ) : (
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className="
            sticky top-0 z-20
            border-x border-b border-slate-200
            bg-slate-50
            whitespace-nowrap
            px-5 py-4
            text-left
            text-xs font-semibold uppercase tracking-[0.2em]
            text-slate-500
          "
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            )}
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
                    className="bg-blue-100/70 px-5 py-4 text-sm font-bold text-center uppercase tracking-wider text-black"
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
                        className="whitespace-nowrap px-5 py-4 text-sm text-slate-700 border-x border-slate-200"
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
