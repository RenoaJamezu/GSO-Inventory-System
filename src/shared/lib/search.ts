export function searchItems<T extends object>(
  items: T[],
  search: string,
  fields: (keyof T)[],
): T[] {
  const query = search.trim().toLowerCase();

  if (!query) return items;

  return items.filter((item) =>
    fields.some((field) =>
      String(item[field] ?? "")
        .toLowerCase()
        .includes(query),
    ),
  );
}
