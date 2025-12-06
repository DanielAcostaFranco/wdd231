import "../css/style.css";
import "../css/home.css";
import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";


// =================================================================================
// NUEVA FUNCIÓN CLAVE: Lee la URL y extrae el código del parque
// =================================================================================
function getParkCodeFromURL() {
    // 1. Lee la ruta completa (ej: /yosemite o /acadi/about)
    const path = window.location.pathname;

    // 2. Divide la ruta por las barras (/)
    const segments = path.split('/');

    // 3. Devuelve el último pedazo de la ruta, que es el código del parque (ej: "yosemite")
    let parkCode = segments[segments.length - 1];

    // Si la ruta está vacía (es decir, el usuario fue a misitio.com/), 
    // usa un código por defecto (ej: 'acad'). Ajusta 'acad' si usas otro código.
    if (parkCode === "" || parkCode === "index.html") {
        return 'acad';
    }

    return parkCode;
}
// =================================================================================


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
        // ------------------------------------------------------------------
        // MODIFICACIÓN CLAVE: Llama a la nueva función y pasa el código
        // ------------------------------------------------------------------

        // Obtiene el código del parque de la URL (ej: 'yosemite')
        const parkCode = getParkCodeFromURL();

        // Pasa el código a getParkData(). El servicio ahora usará este código.
        const parkData = await getParkData(parkCode);

        // La lógica restante permanece igual
        const links = getInfoLinks(parkData.images);

        // ------------------------------------------------------------------

        setHeaderFooter(parkData);
        setParkIntro(parkData);
        setParkInfoLinks(links);
    } catch (err) {
        console.error("Error loading park data:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("main.js loaded and DOM ready");

    // Llama a la función principal al cargar la página
    initContent();
});