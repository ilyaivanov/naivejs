import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import controller, { sidebarView } from "./app";

const renderHtml = () =>
  (document.body.innerHTML = `
      <div class="page">
        <div class="page__sidebar"></div>
        <div class="page__body"></div>
      </div>


      <template id="sidebar-row">
        <div class="sidebar-row">

        </div>
      </template>
  `);

describe("app", () => {
  beforeEach(function () {
    renderHtml();
  });
  it("should be", function () {
    controller.init();
    const musicRow = sidebarView.findRowForItem("music");
    userEvent.click(musicRow);
    expect(document.getElementsByClassName("sidebar-row")).toHaveLength(4);
    expect(musicRow).toHaveClass("sidebar-row--selected");
    expect(musicRow).toHaveTextContent("Music");
  });

  it("selecting an item should render it details", function () {
    controller.init();
    userEvent.click(sidebarView.findRowForItem("dev"));
    expect(sidebarView.findRowForItem("music")).not.toHaveClass(
      "sidebar-row--selected"
    );
    expect(sidebarView.findRowForItem("dev")).toHaveClass(
      "sidebar-row--selected"
    );
  });
});
