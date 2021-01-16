import { galleryView } from "./gallery";
import * as sidebar from "./sidebar";
import * as page from "./page";
import * as dom from "./infra/dom";

export const sidebarItems: Items = {
  home: { id: "home", title: "HOME", children: ["music", "dev"] },
  music: { id: "music", title: "Music", children: [] },
  dev: {
    id: "dev",
    title: "Development",
    children: ["3", "4"],
    isOpenFromSidebar: true,
  },
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

    const homeItems = sidebarItems.home.children.map((id) => sidebarItems[id]);
    const rows = sidebar
      .renderRowChildren1(sidebarItems, homeItems, 0)
      .map((row) => dom.div(row));
    sidebar.renderRows(rows);

    const selectedItem = sidebarItems[selectedItemId];
    galleryView.renderSelectedItem(selectedItem.title);
    sidebar.selectItem(selectedItemId);
  },

  toggleItemVisibility: (item: Item, itemLevel: number) => {
    item.isOpenFromSidebar = !item.isOpenFromSidebar;
    sidebar.updateTogglerButton(item);
    if (item.isOpenFromSidebar) {
      const homeItems = sidebarItems[item.id].children.map(
        (id) => sidebarItems[id]
      );
      const rows = sidebar.renderRowChildren1(sidebarItems, homeItems, itemLevel + 1);
      sidebar.renderChildren(rows, item.id);
    } else {
      sidebar.removeChildren(item.id);
    }
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
