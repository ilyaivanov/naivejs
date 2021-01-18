import { dom, cls } from "../infra";
const padding = 10;
export const setBoxText = (box: HTMLElement, text: string) => {
  const innerText = dom.findFirstByClass(cls.boxText, box);
  innerText.innerText = text;
  const speed = 0.03; //pixels per milliseconds
  const distance = innerText.scrollWidth - box.clientWidth;
  const distanceToTravel = distance + padding * 2;
  if (distanceToTravel > 0) {
    const time = Math.max(distanceToTravel / speed, 7000);
    innerText.style.setProperty("--my-height", `-${distanceToTravel}px`);
    innerText.style.animation = `rotateTrackTitle ${time}ms cubic-bezier(.3,.06,.69,.97) infinite 2000ms`;
  }
};
