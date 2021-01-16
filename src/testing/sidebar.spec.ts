import userEvent from "@testing-library/user-event";
import controller from "../controller";
import { cls } from "../infra";
import * as dom from "../infra/dom";
import * as sidebarView from "../sidebar";

describe("Having a sidebar in an app", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  beforeEach(() => controller.init());

  it("there are 7 rows", function () {
    expect(dom.findAllByClass(cls.row)).toHaveLength(7);
  });

  it("music has text 'Music'", function () {
    expect(sidebarView.findRowForItem("music")).toContainHTML("Music");
  });

  it("music is selected by default", function () {
    expect(sidebarView.findRowForItem("music")).toHaveClass(cls.rowSelected);
  });

  describe("clicking on dev item", () => {
    beforeEach(() => userEvent.click(sidebarView.findRowForItem("dev")));

    it("unselects music", function () {
      expect(sidebarView.findRowForItem("music")).not.toHaveClass(
        cls.rowSelected
      );
    });

    it("selects dev", function () {
      expect(sidebarView.findRowForItem("dev")).toHaveClass(cls.rowSelected);
    });
  });
});
