import { cls, div, cssClass } from "./infra";

cssClass("selected-item", {
  fontSize: "60px",
  fontWeight: "bold",
});

cssClass("selected-item", {
  color: "#998fb1",
});

export const galleryView = {
  renderSelectedItem: (title: string) => {
    const body = document.querySelector(".page__body");
    const elem = div({ className: cls.selectedItem });
    elem.innerHTML = title;
    if (body) body.innerHTML = elem.outerHTML;
  },
};
