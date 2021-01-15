import "./bem/page.css";
import "./bem/sidebarRow.css";
import "./app.css";
import * as ids from "./bem";

interface Item {
  id: string;
  title: string;
}
export const sidebarItems: Item[] = [
  { id: "music", title: "Music" },
  { id: "dev", title: "Development" },
  { id: "3", title: "Learning" },
  { id: "4", title: "On Quality" },
];

var selectedItemId = sidebarItems[0].id;

const controller = {
  init: () => {
    sidebarView.render(sidebarItems);
    const selectedItem = sidebarItems.find(
      (i) => i.id == selectedItemId
    ) as Item;
    pageView.renderSelectedItem(selectedItem);
    sidebarView.selectItem(selectedItemId);
  },
  selectItem: (item: Item) => {
    sidebarView.unSelectItem(selectedItemId);
    sidebarView.selectItem(item.id);
    selectedItemId = item.id;
    pageView.renderSelectedItem(item);
  },
};

export const sidebarView = {
  render(items: Item[]) {
    const sidebar = document.querySelector(".page__sidebar") as HTMLElement;
    const fragment = document.createDocumentFragment();
    items
      .map((item) => this.renderRow(item))
      .forEach((view) => fragment.appendChild(view));
    sidebar.append(fragment);
  },

  renderRow(item: Item) {
    const row = this.getRowFromATemplate();

    if (row) {
      row.innerHTML = item.title;
      row.id = ids.sidebar.rowId(item.id);
      row.addEventListener("click", () => controller.selectItem(item));
    }
    return row;
  },

  selectItem(itemId: string) {
    this.findRowForItem(itemId).classList.add(ids.sidebar.rowSelected);
  },
  unSelectItem(itemId: string) {
    this.findRowForItem(itemId).classList.remove(ids.sidebar.rowSelected);
  },

  findRowForItem(itemId: string): HTMLElement {
    return document.getElementById(ids.sidebar.rowId(itemId)) as HTMLElement;
  },

  getRowFromATemplate(): HTMLElement {
    return createDiv(ids.sidebar.row);
  },
};

const pageView = {
  renderSelectedItem: (item: Item) => {
    const body = document.querySelector(".page__body");
    if (body) body.innerHTML = item.title;
  },
};

const createDiv = (className?: string): HTMLElement => {
  const div = document.createElement("div");
  if (className) div.classList.add(ids.sidebar.row);
  return div;
};



export default controller;
