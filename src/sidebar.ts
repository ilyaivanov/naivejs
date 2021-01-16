import * as ids from "./infra/style";
import { cls, div, cssClass, css, sidebar } from "./infra";
import controller from "./app";

cssClass(cls.row, {
  padding: "4px 8px",
  cursor: "pointer",
});

css(`.${cls.row}:hover`, {
  backgroundColor: "#313131",
});

css(`.${cls.row}.${cls.rowSelected}`, {
  backgroundColor: "#313131",
});

export const renderRows = (rows: HTMLElement[]) => {
  const sidebar = document.querySelector(".page__sidebar") as HTMLElement;
  const fragment = document.createDocumentFragment();
  rows.forEach((v) => fragment.appendChild(v));
  sidebar.append(fragment);
};

export const renderRow = (item: Item, level: number) => {
  const row = getRowFromATemplate();

  if (row) {
    row.innerHTML = item.title;
    row.id = sidebar.rowId(item.id);
    row.style.paddingLeft = 20 * level + 4 + "px";
    row.addEventListener("click", () => controller.selectItem(item));
  }
  return row;
};

export const selectItem = (itemId: string) => {
  findRowForItem(itemId).classList.add(sidebar.rowSelected);
};

export const unSelectItem = (itemId: string) => {
  findRowForItem(itemId).classList.remove(sidebar.rowSelected);
};

export const findRowForItem = (itemId: string): HTMLElement => {
  return document.getElementById(sidebar.rowId(itemId)) as HTMLElement;
};

export const getRowFromATemplate = (): HTMLElement => {
  return div({
    className: cls.row,
  });
};
