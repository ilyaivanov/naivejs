import { galleryView } from "./gallery";
import * as sidebar  from "./sidebar";
import * as page from "./page";

export const sidebarItems: Items = {
  home: { id: "home", title: "HOME", children: ["music", "dev"] },
  music: { id: "music", title: "Music", children: [] },
  dev: { id: "dev", title: "Development", children: ["3", "4"] },
  "3": { id: "3", title: "Learning", children: [] },
  "4": { id: "4", title: "On Quality", children: [] },
};

var selectedItemId = "music";

const controller = {
  init: () => {
    page.renderPageLayout();
    const rows = traverseTree(sidebarItems, "home", (item, level) =>
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

//Utils
const traverseTree = <T>(
  items: Items,
  rootKey: string,
  mapper: (item: Item, level: number) => T,
  filter: (item: Item, level: number) => boolean = () => true
): T[] => {
  const mapItem = (key: string, level: number): any => {
    if (filter(items[key], level) && items[key].children.length > 0)
      return [
        mapper(items[key], level),
        ...items[key].children.map((i) => mapItem(i, level + 1)),
      ];
    else return mapper(items[key], level);
  };
  if (items[rootKey])
    return items[rootKey].children
      .map((i) => mapItem(i, 0))
      .flat(Number.MAX_VALUE);
  else return [];
};

export default controller;
