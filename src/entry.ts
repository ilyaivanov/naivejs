import controller from "./controller";
import { css } from "./infra";

css("body", {
  margin: "0",
  fontFamily: `"Roboto", "Source Sans Pro", "Trebuchet MS", "Lucida Grande", "Bitstream Vera Sans", "Helvetica Neue", sans-serif`,
  color: "white",
});

css("*", {
  boxSizing: "border-box",
});

controller.init();
