import "./pwa";
import { changeRoute, applyRoute } from "./routing";

const app = document.getElementsByClassName("content-container")[0];
const falsyValues = [undefined, null, ""];

export const transfer = () => {
  const html = changeRoute(location.hash);
  const trustedHml = !falsyValues.includes(html) ? html : "";

  return applyRoute(app, trustedHml);
};

window.onhashchange = transfer;

location.hash = location.hash || "#/home";
if (app.innerHTML === "") transfer();
