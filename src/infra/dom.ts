import { ClassName } from "./keys";

export interface DivDefinition {
  id?: string;
  className?: ClassName | (ClassName | undefined)[];
  children?: DivDefinition | DivDefinition[] | string;
  style?: Partial<CSSStyleDeclaration>;

  attributes?: {};

  type?: "button" | "div" | "svg" | "path";
  onClick?: (e: Event) => void;
}

export const div = (divDefinition: DivDefinition): HTMLElement => {
  const type = divDefinition.type || "div";
  var elem: HTMLElement;
  if (type == "svg" || type == "path")
    elem = (document.createElementNS(
      "http://www.w3.org/2000/svg",
      type
    ) as unknown) as HTMLElement;
  else elem = document.createElement(type);
  const { className } = divDefinition;
  if (className) {
    if (typeof className == "string") {
      elem.classList.add(className);
    } else {
      className.forEach((clas) => {
        if (clas !== undefined) elem.classList.add(clas);
      });
    }
  }

  const { children } = divDefinition;
  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        elem.appendChild(div(child));
      });
    } else if (typeof children == "string") {
      elem.textContent = children;
    } else {
      elem.appendChild(div(children));
    }
  }

  if (divDefinition.id) elem.id = divDefinition.id;
  if (divDefinition.style) Object.assign(elem.style, divDefinition.style);
  if (divDefinition.onClick)
    elem.addEventListener("click", divDefinition.onClick);

  const { attributes } = divDefinition;
  if (attributes) {
    Object.keys(attributes).map((key) => {
      if (!!(attributes as any)[key])
        elem.setAttribute(key, (attributes as any)[key] + "");
    });
  }

  return elem as HTMLElement;
};

export const findFirstByClass = (className: ClassName): HTMLElement => {
  const elem = document.getElementsByClassName(className);
  if (elem.length === 0)
    throw new Error(`Couldn't find any element with a class ${className}`);
  return elem.item(0) as HTMLElement;
};

export const findAllByClass = (className: ClassName): Element[] => {
  const elem = document.getElementsByClassName(className);
  if (elem.length === 0)
    throw new Error(`Couldn't find any element with a class ${className}`);
  return Array.from(elem);
};

export const findById = (id: string): Element => {
  const elem = document.getElementById(id);
  if (!elem) throw new Error(`Couldn't find any element with a id ${id}`);
  return elem;
};
export const query = (selector: string): Element => {
  const elem = document.querySelector(selector);
  if (!elem)
    throw new Error(`Couldn't find any element with a selector ${selector}`);
  return elem;
};

export const fragment = (nodes: Element[]) => {
  const fragment = document.createDocumentFragment();
  nodes.forEach((node) => fragment.appendChild(node));
  return fragment;
};
