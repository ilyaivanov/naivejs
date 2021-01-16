

type valueof<T> = T[keyof T];

export type ClassName = valueof<typeof cls>;

export const sidebar = {
  root: "",
  row: "sidebar-row",
  rowSelected: "sidebar-row--selected",
  rowTemplateId: "sidebar-row",
  rowId: (itemId: string) => "row-" + itemId,
};

export const cls = {
  selectedItem: "selected-item",
  row: "sidebar-row",
  rowSelected: "sidebar-row--selected",
  page: "page",
  pageSidebar: "page__sidebar",
  pageBody: "page__body",
} as const;
