import { galleryView } from "./gallery";
import * as sidebar from "./sidebar";
import * as page from "./page";
import { traverseItems } from "./infra/items";

export const sidebarItems: Items = {
  home: { id: "home", title: "HOME", children: ["music", "dev"] },
  music: { id: "music", title: "Music", children: [] },
  dev: { id: "dev", title: "Development", children: ["3", "4"] },
  "3": { id: "3", title: "Learning", children: ["piano", "elm", "typescript"] },
  "4": { id: "4", title: "On Quality", children: [] },
  piano: { id: "piano", title: "Piano", children: [] },
  elm: { id: "elm", title: "Elm", children: [] },
  typescript: { id: "typescript", title: "TypeScript", children: [] },
};

var selectedItemId = "music";

const controller = {
  init: () => {
    page.renderPageLayout();
    const rows = traverseItems(sidebarItems, "home", (item, level) =>
      sidebar.renderRow(item, level)
    );
    sidebar.renderRows(rows);

    const selectedItem = sidebarItems[selectedItemId];
    galleryView.renderSelectedItem(selectedItem.title);
    sidebar.selectItem(selectedItemId);
  },

  selectItem: (item: Item) => {
    if (item.id != selectedItemId) {
      sidebar.unSelectItem(selectedItemId);
      sidebar.selectItem(item.id);
      selectedItemId = item.id;
      galleryView.renderSelectedItem(item.title);
    }
  },
};

export default controller;
