export const ids = {
  sidebarRow: (itemId: string) => "row-" + itemId,
} as const;

export const cls = {
  galleryHeader: "gallery-header",
  row: "sidebar-row",
  rowSelected: "sidebar-row--selected",
  page: "page",
  pageSidebar: "page__sidebar",
  pageBody: "page__body",
} as const;

export type ClassName = valueof<typeof cls>;
