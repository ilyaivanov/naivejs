import userEvent from "@testing-library/user-event";
import controller from "../controller";
import { cls, ids } from "../infra";
import * as dom from "../infra/dom";
import * as sidebarView from "../sidebar";
import { fireEvent } from "@testing-library/dom";

describe("Having a sidebar in an app", () => {
  beforeEach(() => {
    document.body.innerHTML = "<div id=\"root\"></div>";
    controller.init();
  });

  it("there are 7 rows", function () {
    expect(getAllRows()).toHaveLength(4);
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

  it("dev toggle button should have -", function () {
    expect(getToggleButton("dev")).toHaveTextContent("-");
  });

  describe("hiding dev nodes", () => {
    beforeEach(() => fireEvent.click(getToggleButton("dev")));

    it("leaves only 2 nodes on the screen", function () {
      expect(getAllRows()).toHaveLength(2);
    });

    it("set + as a button title for dev", function () {
      expect(getToggleButton("dev")).toHaveTextContent("+");
    });

    describe("showing again dev nodes", () => {
      beforeEach(() => fireEvent.click(getToggleButton("dev")));

      it("shows again 4 nodes", function () {
        expect(getAllRows()).toHaveLength(4);
      });

      it("set + as a button title for dev", function () {
        expect(getToggleButton("dev")).toHaveTextContent("-");
      });
    });
  });
});

const getAllRows = () => dom.findAllByClass(cls.row);

const getToggleButton = (itemId: string) =>
  dom.query(`#${ids.sidebarRow(itemId)} .${cls.rowToggleButton}`);
