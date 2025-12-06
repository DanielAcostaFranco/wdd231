import { router } from "./router.js";
import { home, parkPage, notFound } from "./pages.js";

window.addEventListener("popstate", router);

document.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        history.pushState(null, "", e.target.href);
        router();
    }
});

router(); // ← clave
