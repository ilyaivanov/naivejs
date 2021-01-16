interface Item {
  id: string;
  title: string;
  children: string[];
}

type Items = {
  [key: string]: Item;
};
