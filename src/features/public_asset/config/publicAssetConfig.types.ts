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
