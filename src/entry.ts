import controller from "./controller";
import { css } from "./infra";
import * as dummy from './Dummy/app';
css("body", {
  margin: "0",
  fontFamily: `"Roboto", "Source Sans Pro", "Trebuchet MS", "Lucida Grande", "Bitstream Vera Sans", "Helvetica Neue", sans-serif`,
});

css("*", {
  boxSizing: "border-box",
});

// controller.init();
dummy.init();
