export interface AssetGroup {
  id: number;
  name: string;
  module_key: string;
}

export type AssetGroupInput = {
  name: string;
  module_key: string;
};
