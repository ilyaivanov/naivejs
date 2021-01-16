import controller from "../app";
import {cls, findFirstByClass} from "../infra";
import * as gallery from "../gallery";

describe('In Gallery', () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("selected item should have a font 60px", function () {
    controller.init();
    expect(findFirstByClass(cls.galleryHeader)).toHaveStyle("font-size: 60px");
  });
})