import { footerTemplate } from "./templates.mjs";
import enableNavigation from "./navigation.mjs";

function setHeaderInfo(data) {
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.textContent = data.fullName;

    document.querySelector("head > title").textContent = data.fullName;

    const bannerImg = document.querySelector("#hero-banner > img");
    bannerImg.src = data.images[0].url;
    bannerImg.alt = data.images[0].altText || data.fullName;

    const heroContent = document.querySelector("#hero-text");
    heroContent.innerHTML = `
      <h1>${data.name}</h1>
      <span>${data.designation}</span>
      <span>${data.states}</span>
  `;
}

function setFooter(data) {
    const footerEl = document.querySelector("#park-footer");
    footerEl.innerHTML = footerTemplate(data);
}

export default function setHeaderFooter(data) {
    setHeaderInfo(data);
    setFooter(data);
    enableNavigation();
}