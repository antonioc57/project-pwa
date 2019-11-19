import home from "../home";
import faq from "../faq";
import aboutUs from "../about-us";

const routes = [home, faq, aboutUs];

export function changeRoute(hash) {
  const routeFound = routes.find(x => x.route === hash);

  //Faz tracking de página visitada se caso o ga tenha sido carregado
  if (routeFound) {
    if (typeof gtag !== "undefined") {
      gtag("config", "UA-148827148-1", { page_path: `/${hash}` });
    }

    return routeFound.content;
  } else {
    return "";
  }
}

export function applyRoute(app, content) {
  app.innerHTML = content;
}
