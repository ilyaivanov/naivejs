export const traverseItems = <T>(
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