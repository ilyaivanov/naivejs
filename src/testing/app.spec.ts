import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import controller from "../app";
import { cls, sidebar } from "../infra";
import * as sidebarView from "../sidebar";

describe("app", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should be", function () {
    controller.init();
    const musicRow = sidebarView.findRowForItem("music");
    userEvent.click(musicRow);
    expect(document.getElementsByClassName(sidebar.row)).toHaveLength(4);
    expect(musicRow).toHaveClass(sidebar.rowSelected);
    expect(musicRow).toHaveTextContent("Music");
  });

  it("selecting an item should render it details", function () {
    controller.init();
    userEvent.click(sidebarView.findRowForItem("dev"));
    expect(sidebarView.findRowForItem("music")).not.toHaveClass(
      sidebar.rowSelected
    );
    expect(sidebarView.findRowForItem("dev")).toHaveClass(sidebar.rowSelected);

    expect(sidebarView.findRowForItem("3")).toHaveStyle("padding-left: 24px");
  });

  it("Selected should have some styles", function () {
    controller.init();
    const item = document.getElementsByClassName(cls.selectedItem)[0];
    expect(item).toHaveStyle("font-size: 60px");
  });
});
