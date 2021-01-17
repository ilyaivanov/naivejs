export const ids = {
  sidebarRow: (itemId: string) => "row-" + itemId,
  sidebarRowChildren: (itemId: string) => "row-children-" + itemId,
} as const;

export const cls = {
  galleryHeader: "gallery-header",
  row: "sidebar-row",
  rowToggleButton: "sidebar-row__toggler",
  rowToggleButtonOpen: "sidebar-row__toggler--open",
  rowToggleButtonInactive: "sidebar-row__toggler--inactive",
  rowSelected: "sidebar-row--selected",
  page: "page",
  pageSidebar: "page__sidebar",
  pageBody: "page__body",
} as const;

export type ClassName = valueof<typeof cls>;
