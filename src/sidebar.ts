import {
  cls,
  div,
  cssClass,
  css,
  findById,
  ids,
  findFirstByClass,
} from "./infra";
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
  const sidebar = findFirstByClass(cls.pageSidebar);
  const fragment = document.createDocumentFragment();
  rows.forEach((v) => fragment.appendChild(v));
  sidebar.append(fragment);
};

export const renderRow = (item: Item, level: number) => {
  const row = getRowFromATemplate();

  if (row) {
    row.innerHTML = item.title;
    row.id = ids.sidebarRow(item.id);
    row.style.paddingLeft = 20 * level + horizontalPadding + "px";
    row.addEventListener("click", () => controller.selectItem(item));
  }
  return row;
};

export const selectItem = (itemId: string) => {
  findRowForItem(itemId).classList.add(cls.rowSelected);
};

export const unSelectItem = (itemId: string) => {
  findRowForItem(itemId).classList.remove(cls.rowSelected);
};

export const findRowForItem = (itemId: string): HTMLElement => {
  return findById(ids.sidebarRow(itemId));
};

export const getRowFromATemplate = (): HTMLElement => {
  return div({
    className: cls.row,
  });
};
