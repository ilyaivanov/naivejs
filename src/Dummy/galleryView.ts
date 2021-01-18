import * as controller from "./app";
import { cls, dom, css, cssClass, cssText } from "../infra";

//Constants
export const cardTransitionDuration = 100;
export const cardTransition = `left ${cardTransitionDuration}ms linear, top ${cardTransitionDuration}ms linear`;
const gap = 20;

//STYLE
cssClass(cls.gallery, {
  height: "100vh",
  backgroundColor: "#181818",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  alignContent: "flex-start",
  overflowX: "overlay",
  overflowY: "hidden",
  paddingBottom: gap + "px",
  position: "relative",
  userSelect: "none",
});

cssClass(cls.galleryDuringDrag, {
  cursor: "grabbing",
});
css(`.${cls.galleryDuringDrag} .${cls.card}`, {
  cursor: "unset",
});
cssClass(cls.galleryHeader, {
  overflow: "hidden",
});
cssClass(cls.cardText, {
  color: "white",
  padding: "8px",
  fontSize: "16px",
  fontWeight: "500",
});
cssClass(cls.cardImage, {
  display: "block",
});
cssClass(cls.card, {
  backgroundColor: "#232325",
  marginTop: gap + "px",
  marginLeft: gap + "px",
  width: "320px",
  borderRadius: "4px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "1px 2px 5px 0px rgba(0, 0, 0, 0.53)",
  overflow: "hidden",
  cursor: "pointer",
});

css(
  [`.${cls.galleryWithoutDrag} .${cls.card}:hover`, `.${cls.cardDuringDrag}`],
  {
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backgroundColor: "#333336",
  }
);

cssClass(cls.cardImage, {
  display: "block",
});

cssClass(cls.galleryRightGap, {
  height: "100%",
  width: gap + "px",
});

cssText(`
*::-webkit-scrollbar {
  height: 12px;
}

*::-webkit-scrollbar-thumb {
  background-color: rgb(63, 63, 97);
}
`);

//VIEW
export const renderGallery = (items: CardItem[]) => {
  const gallery = dom.div({
    className: cls.gallery,
    children: items
      .map(renderCard)
      .concat([{ className: cls.galleryRightGap }]),
  });
  const root = dom.findById("root");
  root.appendChild(dom.div({ className: cls.galleryHeader }));
  root.appendChild(gallery);
};

export const onStartDrag = (gallery?: HTMLElement) => {
  if (gallery) {
    gallery.classList.add(cls.galleryDuringDrag);
    gallery.classList.remove(cls.galleryWithoutDrag);
  }
};

export const onEndDrag = (gallery?: HTMLElement) => {
  if (gallery) {
    gallery.classList.add(cls.galleryWithoutDrag);
    gallery.classList.remove(cls.galleryDuringDrag);
  }
};

export const convertCardPositionToAbsolute = (): ClientRect[] => {
  const positions = dom.findAllByClass(cls.card).map((card) => ({
    card,
    rect: card.getBoundingClientRect(),
  }));
  positions.forEach(({ card, rect }) => {
    card.style.position = "absolute";
    card.style.width = rect.width + "px";
    card.style.height = rect.height + "px";
    card.style.left = rect.x + "px";
    card.style.top = rect.y + "px";
    card.style.margin = "0";
    card.style.transition = cardTransition;
  });
  return positions.map(({ rect }) => rect);
};
export const removeAbsolutePositioning = () => {
  dom.findAllByClass(cls.card).forEach((card) => {
    card.removeAttribute("style");
  });
};

export const captureItemForDrag = (box: HTMLElement) => {
  box.classList.add(cls.cardDuringDrag);
  box.style.zIndex = "200";
  box.style.pointerEvents = "none";
  box.style.removeProperty("transition");
};
export const releseItemForDrag = (box: HTMLElement) => {
  box.classList.remove(cls.cardDuringDrag);
  //style props are remove at removeAbsolutePositioning
};

export const renderCard = (
  item: CardItem,
  index: number
): dom.DivDefinition => ({
  className: cls.card,
  on: {
    mousedown: (e) => controller.onMouseDown(e.currentTarget as HTMLElement),
  },
  children: [
    {
      className: cls.cardImage,
      type: "img",
      attributes: { src: item.image, draggable: "false" },
    },
    {
      className: cls.cardText,
      children: item.text,
    },
  ],
});

export const shiftBoxByMovement = (
  box: HTMLElement,
  movementX: number,
  movementY: number
) => {
  box.style.left = parseInt(box.style.left) + movementX + "px";
  box.style.top = parseInt(box.style.top) + movementY + "px";
};

export const setCardCoordinates = (
  card: HTMLElement,
  position: { left: number; top: number }
) => {
  card.style.top = position.top + "px";
  card.style.left = position.left + "px";
};
