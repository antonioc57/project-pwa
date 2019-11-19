import { Workbox } from "workbox-window";

const skipWaitingMessage = { type: "SKIP_WAITING" };

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/service-worker.js");
  const footer = document.getElementsByClassName("footer-container").item(0);

  wb.addEventListener("waiting", () => {
    const link = document.createElement("a");
    link.text = "Click here to reload the cache";
    link.className = "footer";

    link.onclick = () => {
      wb.addEventListener("controlling", () => {
        window.location.reload();
      });

      wb.messageSW(skipWaitingMessage);
    };

    //https://www.igvita.com/2015/11/20/dont-lose-user-and-app-state-use-page-visibility/
    //Refresh para Chrome e Firefox.
    window.addEventListener("beforeunload", () => {
      wb.messageSW(skipWaitingMessage);
    });

    //Refresh para Internet Explorer e Edge
    window.addEventListener("unload", () => {
      wb.messageSW(skipWaitingMessage);
    });

    //Refresh para Safari
    document.addEventListener("visibilitychange", function() {
      wb.messageSW(skipWaitingMessage);
    });

    footer.textContent = "";
    footer.appendChild(link);
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });

  wb.register();
}
