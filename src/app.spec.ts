import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import controller, { sidebarView } from "./app";
import { loadHtmlBodyIntoDocument } from "./testing/loadHtml";
import * as ids from "./bem";

describe("app", () => {
  beforeEach(loadHtmlBodyIntoDocument);

  it("should be", function () {
    controller.init();
    const musicRow = sidebarView.findRowForItem("music");
    userEvent.click(musicRow);
    expect(document.getElementsByClassName(ids.sidebar.row)).toHaveLength(4);
    expect(musicRow).toHaveClass(ids.sidebar.rowSelected);
    expect(musicRow).toHaveTextContent("Music");
  });

  it("selecting an item should render it details", function () {
    controller.init();
    userEvent.click(sidebarView.findRowForItem("dev"));
    expect(sidebarView.findRowForItem("music")).not.toHaveClass(
      ids.sidebar.rowSelected
    );
    expect(sidebarView.findRowForItem("dev")).toHaveClass(
      ids.sidebar.rowSelected
    );
  });
});
