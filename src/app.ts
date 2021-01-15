import "./bem/page.css";
import "./bem/sidebarRow.css";
import "./app.css";

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
      row.id = "row-" + item.id;
      row.addEventListener("click", () => controller.selectItem(item));
    }
    return row;
  },

  selectItem(itemId: string) {
    this.findRowForItem(itemId).classList.add("sidebar-row--selected");
  },
  unSelectItem(itemId: string) {
    this.findRowForItem(itemId).classList.remove("sidebar-row--selected");
  },

  findRowForItem(itemId: string): HTMLElement {
    return document.getElementById("row-" + itemId) as HTMLElement;
  },

  getRowFromATemplate(): HTMLElement {
    const template = document.getElementById(
      "sidebar-row"
    ) as HTMLTemplateElement;
    const itemNode = template.content.cloneNode(true) as HTMLElement;
    return itemNode.querySelector(".sidebar-row") as HTMLElement;
  },
};

const pageView = {
  renderSelectedItem: (item: Item) => {
    const body = document.querySelector(".page__body");
    if (body) body.innerHTML = item.title;
  },
};

export default controller;
