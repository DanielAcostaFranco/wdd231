import "../css/style.css";
import "../css/home.css";
import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";


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
        const parkData = await getParkData();
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