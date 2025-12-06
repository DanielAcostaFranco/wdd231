import "../css/style.css";
import "../css/home.css";
import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

// AÑADE ESTO en la parte superior de tu archivo main.js (debajo de los "imports")

function getParkCodeFromURL() {
    // 1. Lee la ruta completa (ej: /yosemite o /everglades)
    const path = window.location.pathname;

    // 2. Divide la ruta por las barras (/)
    const segments = path.split('/');

    // 3. Devuelve el último pedazo, que es el código del parque (ej: "yosemite")
    let parkCode = segments[segments.length - 1];

    // Si la ruta está vacía (solo /), devuelve algo que tu código entienda como "Home"
    if (parkCode === "") {
        // Asume que tu código usa un código de parque por defecto (ej: "home" o "acad") 
        // Si no sabes cuál es el código por defecto, tendrás que investigarlo.
        return 'acad'; // Reemplaza 'acad' si tu código usa otro por defecto
    }

    return parkCode;
}

function setParkIntro(data) {
    const introEl = document.querySelector(".intro");
    if (!introEl) return;

    introEl.innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
  `;
}

function setParkInfoLinks(data) {
    const infoEl = document.querySelector(".info");
    if (!infoEl) return;

    const html = data.map(mediaCardTemplate);
    infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

async function initContent() {
    try {
        const parkCode = getParkCodeFromURL();

        const parkData = await getParkData(parkCode);
        const links = getInfoLinks(parkData.images);

        setHeaderFooter(parkData);
        setParkIntro(parkData);
        setParkInfoLinks(links);

    } catch (err) {
        console.error("Error loading park data:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("main.js loaded and DOM ready");

    initContent();
});