import { ClassName, Id } from "./keys";

interface DivDefinition {
  id?: string;
  className?: ClassName | ClassName[];
  children?: DivDefinition | DivDefinition[];
}

export const div = (divDefinition: DivDefinition): HTMLElement => {
  const elem = document.createElement("div");
  const { className } = divDefinition;
  if (className) {
    if (typeof className == "string") {
      elem.classList.add(className);
    } else {
      className.forEach((clas) => elem.classList.add(clas));
    }
  }

  const { children } = divDefinition;
  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        elem.appendChild(div(child));
      });
    } else {
      elem.appendChild(div(children));
    }
  }

  if (divDefinition.id) elem.id = divDefinition.id;

  return elem;
};

export const findFirstByClass = (className: ClassName): HTMLElement => {
  const elem = document.getElementsByClassName(className);
  if (elem.length === 0)
    throw new Error(`Couldn't find any element with a class ${className}`);
  return elem.item(0) as HTMLElement;
};

export const findById = (id: string): HTMLElement => {
  const elem = document.getElementById(id);
  if (!elem) throw new Error(`Couldn't find any element with a id ${id}`);
  return elem;
};
