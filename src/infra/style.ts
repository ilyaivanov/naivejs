import { ClassName } from "./keys";


const s = document.createElement("style");
document.head.appendChild(s);

export const cssClass = (clas: ClassName, styles: Partial<CSSStyleDeclaration>) => {
  const text = cssToString("." + clas, styles);
  s.innerHTML += text;
  return text;
};
export const css = (
  selector: string,
  styles: Partial<CSSStyleDeclaration>
) => {
  const text = cssToString(selector, styles);
  s.innerHTML += text;
  return text;
};
const cssToString = (selector: string, props: Partial<CSSStyleDeclaration>) => {
  const div = document.createElement("div");
  Object.assign(div.style, props);
  return formatStyle(selector, div.style.cssText);
};

const formatStyle = (selector: string, body: string) =>
  `${selector}{
  ${body}
}
`;
