import { cls, div, cssClass } from "./infra";

cssClass(cls.page, {
  height: "100vh",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gridTemplateAreas: '"sidebar body"',
});

cssClass(cls.pageBody, {
  gridArea: "body",
  backgroundColor: "#181818",
});

cssClass(cls.pageSidebar, {
  gridArea: "sidebar",
  width: "300px",
  backgroundColor: "#232325",
});

export const renderPageLayout = () => {
  const root = document.body;
  root.appendChild(
    div({
      className: cls.page,
      children: [{ className: cls.pageSidebar }, { className: cls.pageBody }],
    })
  );
};
