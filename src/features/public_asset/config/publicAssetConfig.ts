export type PublicField = {
  label: string;
  key: string;
  format?: (value: unknown) => string;
};

export type PublicAssetConfig = {
  table: string;
  title: string;
  fields: PublicField[];
};

export const publicAssetConfig: Record<string, PublicAssetConfig> = {
  land: {
    table: "land",
    title: "Land Information",
    fields: [
      { label: "Lot No", key: "lot_no" },
      { label: "Land", key: "land" },
      { label: "Land Improvements", key: "land_improvements" },
      { label: "Location", key: "location" },
      { label: "Description", key: "description" },
      {
        label: "Carrying Amount",
        key: "carrying_amount",
        format: (value) =>
          Number(value ?? 0).toLocaleString(),
      },
      { label: "Condition / Land Title", key: "land_title" },
      { label: "Remarks", key: "remarks" },
    ],
  },

  "other-land-improvement": {
    table: "other_land_improvement",
    title: "Other Land Improvement Information",
    fields: [
      { label: "Land", key: "land" },
      { label: "Land Improvements", key: "land_improvements" },
      { label: "Location", key: "location" },
      { label: "Description", key: "description" },
      {
        label: "Carrying Amount",
        key: "carrying_amount",
        format: (value) =>
          Number(value ?? 0).toLocaleString(),
      },
      { label: "Date Acquired", key: "date_acq" },
      { label: "Remarks", key: "remarks" },
    ],
  },
};