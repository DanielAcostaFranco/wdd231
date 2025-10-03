import { getParkData, getVisitorCenterData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

function setParkIntro(data) {
    const introEl = document.querySelector(".intro");
    introEl.innerHTML = `<h1>${data.fullName}</h1><p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
    const infoEl = document.querySelector(".info");
    const html = data.map(mediaCardTemplate);
    infoEl.innerHTML = html.join("");
}

function setVisitorCenters(list) {
    const el = document.querySelector(".visitor-centers");
    if (!el) return;
    el.innerHTML = list
        .map(vc => `<li><a href="${vc.url || "#"}">${vc.name}</a></li>`)
        .join("");
}

async function init() {
    const parkCode = "glac"; // cambia a "yell", "zion", etc.
    const park = await getParkData(parkCode);
    const links = getInfoLinks(park.images);
    const visitorCenters = await getVisitorCenterData(parkCode);

    setHeaderFooter(park);
    setParkIntro(park);
    setParkInfoLinks(links);
    setVisitorCenters(visitorCenters);
}

init();
