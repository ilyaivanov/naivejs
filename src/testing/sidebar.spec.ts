import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import controller from "../app";
import { cls, findFirstByClass } from "../infra";
import * as sidebarView from "../sidebar";

describe("Having a sidebar in an app", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should be", function () {
    controller.init();
    const musicRow = sidebarView.findRowForItem("music");
    userEvent.click(musicRow);
    expect(document.getElementsByClassName(cls.row)).toHaveLength(7);
    expect(musicRow).toHaveClass(cls.rowSelected);
    expect(musicRow).toHaveTextContent("Music");
  });

  it("selecting an item should render it details", function () {
    controller.init();
    userEvent.click(sidebarView.findRowForItem("dev"));
    expect(sidebarView.findRowForItem("music")).not.toHaveClass(
      cls.rowSelected
    );
    expect(sidebarView.findRowForItem("dev")).toHaveClass(cls.rowSelected);

    expect(sidebarView.findRowForItem("3")).toHaveStyle("padding-left: 24px");
  });

  it("Selected should have some styles", function () {
    controller.init();
    expect(findFirstByClass(cls.galleryHeader)).toHaveStyle("font-size: 60px");
  });
});
