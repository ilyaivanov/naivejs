import html from "../../public/index.html";

export const loadHtmlBodyIntoDocument = () => {
  const start = html.indexOf("<body>") + "<body>".length;
  const end = html.indexOf("</body");

  document.body.innerHTML = html.slice(start, end);
};
