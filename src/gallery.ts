import { cls, div, cssClass, findFirstByClass } from "./infra";

cssClass(cls.galleryHeader, {
  fontSize: "60px",
  fontWeight: "bold",
});

cssClass(cls.galleryHeader, {
  color: "#998fb1",
});

export const galleryView = {
  renderSelectedItem: (title: string) => {
    const body = findFirstByClass(cls.pageBody);
    const elem = div({ className: cls.galleryHeader });
    elem.innerHTML = title;
    if (body) body.innerHTML = elem.outerHTML;
  },
};
