import { cls, cssClass, css, ids, findById, fragment } from "./infra";
import * as dom from "./infra/dom";

import controller from "./controller";
import { DivDefinition } from "./infra/dom";

const horizontalPadding = 4;
cssClass(cls.row, {
  padding: `${horizontalPadding}px 8px`,
  cursor: "pointer",
  display: "flex",
  flexDirection: "row",
});

css(`.${cls.row}:hover`, {
  backgroundColor: "#313131",
});

css(`.${cls.row}.${cls.rowSelected}`, {
  backgroundColor: "#313131",
});

export const renderRows = (rows: Element[]) => {
  dom.findFirstByClass(cls.pageSidebar).append(dom.fragment(rows));
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
    children: [
      {
        type: "button",
        className: cls.rowToggleButton,
        children: item.isOpenFromSidebar ? "-" : "+",
        onClick: (e) => {
          e.stopPropagation();
          controller.toggleItemVisibility(item, level);
        },
      },
      { children: item.title },
    ],
    onClick: () => controller.selectItem(item),
  };

  return [
    row,
    {
      id: ids.sidebarRowChildren(item.id),
      children: renderRowChildren1(
        allItems,
        item.children
          .map((id) => allItems[id]),
        level + 1
      ),
    },
  ];
};

export const renderChildren = (elem: DivDefinition[], rootId: string) => {
  const n = elem.map((e) => dom.div(e));
  findById(ids.sidebarRowChildren(rootId)).appendChild(fragment(n));
};

export const removeChildren = (rootId: string) => {
  findById(ids.sidebarRowChildren(rootId)).innerHTML = "";
};

export const updateTogglerButton = (item: Item) => {
  dom.query(
    `#${ids.sidebarRow(item.id)} .${cls.rowToggleButton}`
  ).textContent = item.isOpenFromSidebar ? "-" : "+";
};

export const renderRowChildren1 = (
  allItems: Items,
  items: Item[],
  level: number
): DivDefinition[] => {
  return items.map((item) => renderRow1(allItems, item, level)).flat();
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
