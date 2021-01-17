import { cls, cssClass, css, ids, findById, fragment } from "./infra";
import * as dom from "./infra/dom";

import controller from "./controller";
import { DivDefinition } from "./infra/dom";

const horizontalPadding = 4;
cssClass(cls.row, {
  padding: `0 8px`,
  cursor: "pointer",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

css(`.${cls.row}:hover`, {
  backgroundColor: "#313131",
});

css(`.${cls.row}.${cls.rowSelected}`, {
  backgroundColor: "#313131",
});

cssClass(cls.rowToggleButton, {
  transition: "transform 200ms ease-out",
  height: "19px",
  width: "19px",
  color: "darkGray",
  padding: "1px 4px",
  margin: "2px 0",
  marginRight: "4px",
  borderRadius: "14px",
});
css(`.${cls.rowToggleButton}:hover`, {
  backgroundColor: "#4f4f4f",
});
cssClass(cls.rowToggleButtonOpen, {
  transform: "rotateZ(90deg)",
});
cssClass(cls.rowToggleButtonInactive, {
  visibility: "hidden",
  pointerEvents: "none",
});

export const renderRows = (rows: Element[]) => {
  dom.findFirstByClass(cls.pageSidebar).append(dom.fragment(rows));
};

export const renderRowChildren1 = (
  allItems: Items,
  items: Item[],
  level: number
): DivDefinition[] => {
  return items.map((item) => renderRow1(allItems, item, level)).flat();
};

export const renderRow1 = (
  allItems: Items,
  item: Item,
  level: number
): DivDefinition[] => {
  const row: DivDefinition = {
    className: cls.row,
    id: ids.sidebarRow(item.id),
    style: {
      paddingLeft: 20 * level + horizontalPadding + "px",
    },
    children: [chevron(item, level), { children: item.title }],
    onClick: () => controller.selectItem(item),
  };
  return [
    row,
    {
      id: ids.sidebarRowChildren(item.id),
      children: item.isOpenFromSidebar
        ? renderRowChildren1(
            allItems,
            item.children.map((id) => allItems[id]),
            level + 1
          )
        : [],
    },
  ];
};
const chevron = (item: Item, level: number): DivDefinition => ({
  type: "svg",
  id: "foo",
  className: [
    cls.rowToggleButton,
    item.isOpenFromSidebar ? cls.rowToggleButtonOpen : undefined,
    item.children.length == 0 ? cls.rowToggleButtonInactive : undefined,
  ],
  attributes: {
    viewBox: "0 0 256 512",
  },
  children: {
    type: "path",
    attributes: {
      fill: "currentColor",
      d:
        "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z",
    },
  },
  onClick: (e) => {
    e.stopPropagation();
    controller.toggleItemVisibility(item, level);
  },
});

export const renderChildren = (elem: DivDefinition[], rootId: string) => {
  const n = elem.map((e) => dom.div(e));
  findById(ids.sidebarRowChildren(rootId)).appendChild(fragment(n));
};

export const removeChildren = (rootId: string) => {
  findById(ids.sidebarRowChildren(rootId)).innerHTML = "";
};

export const updateTogglerButton = (item: Item) => {
  const chev = dom.query(`#${ids.sidebarRow(item.id)} .${cls.rowToggleButton}`);
  if (item.isOpenFromSidebar) chev.classList.add(cls.rowToggleButtonOpen);
  else chev.classList.remove(cls.rowToggleButtonOpen);
};

export const selectItem = (itemId: string) => {
  findRowForItem(itemId).classList.add(cls.rowSelected);
};

export const unSelectItem = (itemId: string) => {
  findRowForItem(itemId).classList.remove(cls.rowSelected);
};

export const findRowForItem = (itemId: string): Element => {
  return dom.findById(ids.sidebarRow(itemId));
};
