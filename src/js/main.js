// ===== Imports (Vite) =====
import "../css/style.css"; // we can do this because we are using Vite...
import "../css/home.css";
import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

/* ===========================
   CONTENIDO DE LA PÁGINA
=========================== */
function setParkIntro(data) {
    const introEl = document.querySelector(".intro");
    if (!introEl) return;
    introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
    const infoEl = document.querySelector(".info");
    if (!infoEl) return;
    const html = data.map(mediaCardTemplate);
    infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

async function init() {
    const parkData = await getParkData();
    const links = getInfoLinks(parkData.images);
    setHeaderFooter(parkData);
    setParkIntro(parkData);
    setParkInfoLinks(links);
}

init();

const navBtn = document.getElementById("global-nav-toggle");
const nav = document.getElementById("global-nav");

function closeMenu() {
    if (!navBtn || !nav) return;
    navBtn.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
}

function toggleMenu() {
    if (!navBtn || !nav) return;
    const isOpen = navBtn.getAttribute("aria-expanded") === "true";
    navBtn.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
}

if (navBtn && nav) {
    navBtn.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");

    navBtn.addEventListener("click", toggleMenu);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (e) => {
        const clickDentroMenu = nav.contains(e.target);
        const clickEnBoton = navBtn.contains(e.target);
        if (!clickDentroMenu && !clickEnBoton) closeMenu();
    });
}
