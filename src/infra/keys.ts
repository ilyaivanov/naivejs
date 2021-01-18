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

  container: "container",
  box: "box",
  boxText: "box-text",

  gallery: "gallery",
  galleryWithoutDrag: "gallery-without-drag",
  galleryDuringDrag: "gallery-during-drag",
  galleryRightGap: "gallery-right-gap",
  card: "card",
  cardDuringDrag: "card-during-drag",
  cardText: "card-text",
  cardImage: "card-image",
} as const;

export type ClassName = valueof<typeof cls>;
