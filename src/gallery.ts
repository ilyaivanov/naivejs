import { cls, cssClass } from "./infra";
import * as dom from "./infra/dom";

cssClass(cls.galleryHeader, {
  fontSize: "60px",
  fontWeight: "bold",
});

cssClass(cls.galleryHeader, {
  color: "#998fb1",
});

export const galleryView = {
  renderSelectedItem: (title: string) => {
    const body = dom.findFirstByClass(cls.pageBody);
    const elem = dom.div({ className: cls.galleryHeader, children: title });
    body.innerHTML = elem.outerHTML;
  },
};
