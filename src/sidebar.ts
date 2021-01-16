import { cls, cssClass, css, ids } from "./infra";
import * as dom from "./infra/dom";

import controller from "./app";

const horizontalPadding = 4;
cssClass(cls.row, {
  padding: `${horizontalPadding}px 8px`,
  cursor: "pointer",
});

css(`.${cls.row}:hover`, {
  backgroundColor: "#313131",
});

css(`.${cls.row}.${cls.rowSelected}`, {
  backgroundColor: "#313131",
});

export const renderRows = (rows: HTMLElement[]) => {
  dom.findFirstByClass(cls.pageSidebar).append(dom.fragment(rows));
};

export const renderRow = (item: Item, level: number) => {
  const row = dom.div({
    className: cls.row,
    id: ids.sidebarRow(item.id),
    style: {
      paddingLeft: 20 * level + horizontalPadding + "px",
    },
    children: item.title,
  });

  row.addEventListener("click", () => controller.selectItem(item));
  return row;
};

export const selectItem = (itemId: string) => {
  findRowForItem(itemId).classList.add(cls.rowSelected);
};

export const unSelectItem = (itemId: string) => {
  findRowForItem(itemId).classList.remove(cls.rowSelected);
};

export const findRowForItem = (itemId: string): HTMLElement => {
  return dom.findById(ids.sidebarRow(itemId));
};
