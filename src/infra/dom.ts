import { ClassName } from "./keys";

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
