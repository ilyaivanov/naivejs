import { cls } from "../infra";
import * as dom from "../infra/dom";
import * as view from "./galleryView";

const item = (text: string, videoId: string): CardItem => ({
  text,
  image: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
});

const selectedItems: CardItem[] = [
  item("Piano and Night", "tEPJrEuISlA"),
  item("A Simple Life", "zp3nEwbZCDw"),
  item("Piano Opus", "hkwttdKEQRo"),
  item(
    "Carbon Based Lifeforms - Hydroponic ",
    "5AAbrmLOV8k"
  ),
  item("Songs for the Sienna", "16BN8jNsK1Y"),
  item("Piano and Light", "bbC8LZ_3rO4"),
  item("Boris Brejcha", "vqz8c4ZP3Wg"),
  item("Isometric Pixel Art", "A0SvOecD5DM"),
  item("Carbon Based Lifeforms - Derelicts", "5o_uF1L5l6o"),
  item(
    "Carbon Based Lifeforms - Interloper",
    "-9pgIVcB3rk"
  ),
  item(
    "Carbon Based Lifeforms - World",
    "KQE29az48gM"
  ),
  item(
    "Carbon Based Lifeforms - Hydroponic",
    "5AAbrmLOV8k"
  ),
  item(
    "Carbon Based Lifeforms 5 hours",
    "aKTlGo7QyK0"
  ),
  item("Best of Brian Crain", "turfgqgUiig"),
];

let boxBeingDragged: HTMLElement | undefined;
let positions: ClientRect[] = [];

export const init = () => {
  view.renderGallery(selectedItems);
};

//current box index is used purely for optimization
//in order to avoid redudant dom traversal
let currentBoxIndex = -1;
document.addEventListener("mousemove", (e) => {
  if (boxBeingDragged) {
    view.shiftBoxByMovement(boxBeingDragged, e.movementX, e.movementY);
    const mousePoint = { x: e.clientX, y: e.clientY };
    const targetCellIndex = positions.findIndex((rect) =>
      isPointInsideRect(mousePoint, rect)
    );

    if (targetCellIndex >= 0 && currentBoxIndex !== targetCellIndex) {
      moveBoxToAPosition(boxBeingDragged, targetCellIndex);
      currentBoxIndex = targetCellIndex;
    }
  }
});

document.addEventListener("mouseup", () => {
  if (boxBeingDragged) {
    const capturedBox: HTMLElement = boxBeingDragged;
    const currentBoxIndex = dom
      .findAllByClass(cls.card)
      .indexOf(boxBeingDragged);
    boxBeingDragged = undefined;
    capturedBox.style.transition = view.cardTransition;
    view.setCardCoordinates(capturedBox, positions[currentBoxIndex]);
    setTimeout(() => {
      if (capturedBox) {
        view.releseItemForDrag(capturedBox);
        view.onEndDrag(dom.findFirstByClass(cls.gallery));
        onMouseUp();
      }
    }, view.cardTransitionDuration);
  }
});

export const onMouseDown = (box: HTMLElement) => {
  boxBeingDragged = box;
  const boxIndex = dom.findAllByClass(cls.card).indexOf(box);
  view.onStartDrag(dom.findFirstByClass(cls.gallery));
  positions = view.convertCardPositionToAbsolute();
  currentBoxIndex = boxIndex;
  view.captureItemForDrag(boxBeingDragged);
};

const onMouseUp = () => {
  boxBeingDragged = undefined;
  view.removeAbsolutePositioning();
};

const moveBoxToAPosition = (
  boxBeingDragged: HTMLElement,
  nextIndex: number
) => {
  const boxes = dom.findAllByClass(cls.card);
  const currentIndex = boxes.indexOf(boxBeingDragged);

  //WOW, this is super ugly, refactor and write unit tests for this
  if (nextIndex < currentIndex) {
    const boxToMove = boxes[currentIndex];
    const boxToMoveBefore = boxes[nextIndex];
    boxToMove.remove();
    dom.findFirstByClass(cls.gallery).insertBefore(boxToMove, boxToMoveBefore);
    boxes.slice(nextIndex, currentIndex).forEach((box) => {
      if (box !== boxBeingDragged)
        view.setCardCoordinates(box, positions[boxes.indexOf(box) + 1]);
    });
  } else {
    const boxToMove = boxes[currentIndex];
    const boxToMoveBefore = boxes[nextIndex + 1];
    boxToMove.remove();
    dom.findFirstByClass(cls.gallery).insertBefore(boxToMove, boxToMoveBefore);
    boxes.slice(currentIndex + 1, nextIndex + 1).forEach((box) => {
      if (box !== boxBeingDragged)
        view.setCardCoordinates(box, positions[boxes.indexOf(box) - 1]);
    });
  }
};

//Create a component for
// 1. Text animation
// 2. Tree
// 3. Gallery
// 3.1 Reorder
// 3.2 Collapse/Expand
// 3.3 Show details to the right
// 4. Transition  (component composition)

//UTILS
const isPointInsideRect = (point: Point, rect: ClientRect) => {
  const rectBottom = rect.top + rect.height;
  const rectRight = rect.left + rect.width;
  return (
    point.x >= rect.left &&
    point.x <= rectRight &&
    point.y >= rect.top &&
    point.y <= rectBottom
  );
};
