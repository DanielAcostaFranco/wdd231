// js/templates.mjs → COMPLETE AND FINAL FILE (CORRECTED amenitiesTemplate)

import spritePath from "../images/sprite.symbol.svg"; //

import { DEFAULT_PARK_CODE } from "./parkService.mjs";

export function parkInfoTemplate(info) { //
  return `<a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>`; //
}

export function mediaCardTemplate(info) { //
  return `<div class="media-card">
    <a href="${info.link}">
    <img src="${info.image}" alt="${info.name}" class="media-card__img">
    <h3 class="media-card__title">${info.name}</h3>
    </a>
   <p>${info.description}</p>
     </div>`; //
}

function getMailingAddress(addresses) { //
  const mailing = addresses.find((address) => address.type === "Mailing"); //
  return mailing || addresses[0]; //
}

function getVoicePhone(numbers) { //
  const voice = numbers.find((number) => number.type === "Voice"); //
  return voice ? voice.phoneNumber : numbers[0]?.phoneNumber || "Not available"; //
}

export function footerTemplate(info) { //
  const mailing = getMailingAddress(info.addresses); //
  const voice = getVoicePhone(info.contacts.phoneNumbers); //

  return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div>
      <p>${mailing.line1 || ""}</p>
      <p>${mailing.city || ""}, ${mailing.stateCode || ""} ${mailing.postalCode || ""}</p>
    </div>
    <h4>Phone:</h4>
    <p>${voice}</p>
  </section>`; //
}

export function alertTemplate(alert) { //
  let alertType = ""; //
  switch (alert.category) { //
    case "Park Closure": //
      alertType = "closure"; //
      break; //
    default: //
      alertType = alert.category.toLowerCase().replace(/\s+/g, "-"); //
  }
  return `<li class="alert">
  <svg class="icon" focusable="false" aria-hidden="true">
    <use xlink:href="${spritePath}#alert-${alertType}"></use>
  </svg>
  <div>
    <h3 class="alert-${alertType}">${alert.title}</h3>
    <p>${alert.description}</p>
  </div></li>`; //
}

// hoursTemplate FUNCTION
export function hoursTemplate(operatingHours) { //
  if (!operatingHours || operatingHours.length === 0) return "<p>Operating hours not available.</p>"; //

  const standardHours = operatingHours.find(h => !h.exceptions || h.exceptions.length === 0) || null; //
  const exceptions = operatingHours.flatMap(h => h.exceptions || []); //

  let html = ''; //

  if (standardHours && standardHours.standardHours) { //
    html += '<h4>Standard Hours:</h4><ul>'; //
    const hours = standardHours.standardHours; //
    for (const day in hours) { //
      if (hours[day]) { //
        html += `<li><strong>${day}:</strong> ${hours[day]}</li>`; //
      }
    }
    html += '</ul>'; //
  } else if (standardHours && standardHours.description) { //
    html += `<h4>Operating Status:</h4><p>${standardHours.description}</p>`; //
  }

  if (exceptions.length > 0) { //
    html += '<h4>Temporary Exceptions:</h4><ul>'; //
    exceptions.forEach(ex => { //
      html += `<li><strong>${ex.name}:</strong> ${ex.startDate} to ${ex.endDate} - ${ex.exceptionHours || 'Closed'}</li>`; //
    });
    html += '</ul>'; //
  }

  return html || "<p>Hours information is structured differently or unavailable.</p>"; //
}

// KEY FUNCTION: now uses parkCode and vcIndex
export function visitorCenterTemplate(center, index, parkCode = DEFAULT_PARK_CODE) { //
  return `
    <li class="visitor-center">
      <h4 class="vc-title">
        <a href="visitor_centers.html?park=${parkCode}&id=${index}" class="vc-link">
            <use xlink:href="/images/sprite.symbol.svg#ranger-station"></use>
          </svg>
          <span class="vc-name">${center.name}</span>
        </a>
      </h4>
      <p class="vc-description">${center.description || "No description available."}</p>
      ${center.directionsInfo
      ? `<p class="vc-directions"><strong>Location:</strong> ${center.directionsInfo}</p>`
      : ""
    }
    </li>
  `; //
}

export function activityListTemplate(activities) { //
  if (!activities || activities.length === 0) return "<li>No activities listed.</li>"; //
  return activities.map((activity) => `<li>${activity.name}</li>`).join(""); //
}

// js/templates.mjs (Corrected version for single horizontal gallery)

export function galleryTemplate(images) { //
  if (!images || images.length === 0) { //
    return "<p class=\"no-images\">No images available for this visitor center.</p>"; //
  }

  // Now 'allImages' contains all the images
  const allImages = images; //

  let html = ''; //

  // We check if there are images before creating the gallery container
  if (allImages.length > 0) { //
    html += `
      <div class="vc-thumbnail-gallery">
        ${allImages.map(img => `
          <figure class="thumb-item">
            <img src="${img.url}" alt="${img.altText || img.title || ""}" loading="lazy">
            ${img.caption || img.title ? `<figcaption>${img.caption || img.title}</figcaption>` : ""}
          </figure>
        `).join("")}
      </div>
    `; //
  }

  return html; //
}

// amenitiesTemplate FUNCTION CORRECTED: now handles an array of strings
export function amenitiesTemplate(amenities) {
  // Checks if the input is a valid array and if it has elements
  if (!amenities || amenities.length === 0) {
    return "<p>No amenities information available.</p>";
  }

  // Maps each amenity name to an <li> list element
  const htmlList = amenities.map(amenity => `<li>${amenity}</li>`).join("");

  // Returns the complete list wrapped in <ul> tags
  return `
    <h4>Available Amenities</h4>
      <ul class="amenities-list">${htmlList}</ul>
  `;
}

export function contactTemplate(contacts) { //
  const phones = contacts.phoneNumbers || []; //
  const emails = contacts.emailAddresses || []; //
  if (phones.length === 0 && emails.length === 0) { //
    return "<p>No contact information available.</p>"; //
  }
  let html = "<ul class=\"contact-list\">"; //
  phones.forEach((p) => { //
    html += `<li><strong>${p.type}:</strong> ${p.phoneNumber}${p.extension ? ` ext. ${p.extension}` : ""}</li>`; //
  });
  emails.forEach((e) => { //
    html += `<li><strong>Email:</strong> <a href="mailto:${e.emailAddress}">${e.emailAddress}</a></li>`; //
  });
  html += "</ul>"; //
  return html; //
}