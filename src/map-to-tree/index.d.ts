export interface TMapTreeItem {
  [key: string]: string | number;
}

export interface TMapToTreeConfig {
  id: string;
  pid: string;
  labelKey: string;
  valueKey: string;
  rootid: string | string[];
  deep: number;
  parentLabel: string;
  parentValue: string;
  symbolOfLabel: string;
  symbolOfValue: string;
  transform: (node: TMapTreeItem) => TMapTreeItem;
  sort: (node: any) => any;
}
