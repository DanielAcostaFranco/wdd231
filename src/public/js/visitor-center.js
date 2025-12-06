// visitor-center.js
import "../css/style.css";
import "../css/visitor-center.css";
import {
    getParkData,
    getParkVisitorCenterDetails
} from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import {
    hoursTemplate,
    contactTemplate,
    amenitiesTemplate,
    galleryTemplate
} from "./templates.mjs";


/**
 * Gets the Visitor Center ID from the URL query parameters.
 * @returns {string} The visitor center ID or '0' as a fallback for index.
 */
function getVisitorCenterIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || '0';
}

/**
 * Helper to render a specific address (Physical or Mailing).
 * This version removes the generalized error message to handle empty API data more gracefully.
 * @param {string} addressContainerId - ID of the HTML container (e.g., 'physicalAddress').
 * @param {Array} addresses - Array of address objects.
 * @param {string} type - Type of address to look for ('Physical' or 'Mailing').
 */
function renderSpecificAddress(addressContainerId, addresses, type) {
    const container = document.getElementById(addressContainerId);

    if (!container) {
        console.error(`ERROR: Container with ID "${addressContainerId}" not found in the DOM.`);
        return;
    }

    // SOFTENED CHECK: We only proceed if 'addresses' is an array. We rely on the
    // specific address search below to fail if the array is empty or the type is missing.
    if (!Array.isArray(addresses)) {
        // If the data structure is completely wrong, show a more specific error, 
        // but avoid the blanket "No address data available" if we can help it.
        container.textContent = `Address data structure is invalid.`;
        return;
    }

    // Search for the address by type ('Physical' or 'Mailing')
    const address = addresses.find(a => a.type === type);

    if (address) {
        // Renders the address content
        container.innerHTML = `
            ${address.line1 ? `<span class="address-line">${address.line1}</span><br>` : ''}
            ${address.line2 ? `<span class="address-line">${address.line2}</span><br>` : ''}
            <span class="address-line">${address.city || ''}, ${address.stateCode || ''} ${address.postalCode || ''}</span>
        `;
    } else {
        // Show this message when the specific TYPE is missing, but the data array exists.
        container.textContent = `No ${type} Address provided by the API for this center.`;
    }
}


/**
 * Renders the detailed information of a visitor center into the DOM targets.
 * @param {object} center - The detailed data object for the visitor center.
 */
function renderVisitorCenterDetails(center) {
    if (!center || !center.name) {
        document.getElementById('vcName').textContent = 'Visitor Center Not Found';
        return;
    }

    // --- 1. Header and Description ---
    document.getElementById('vcName').textContent = center.name;
    document.getElementById('vcDescription').innerHTML = center.description;

    // --- 2. Hours (vcHours) ---
    const hoursContainer = document.querySelector('#vcHours .vc-hours__content');
    if (hoursContainer && center.operatingHours) {
        hoursContainer.innerHTML = hoursTemplate(center.operatingHours);
    }

    // --- 3. Navigation Directions (Directions) ---
    document.getElementById('vcDirectionsInfo').innerHTML = center.directionsInfo;
    document.getElementById('vcDirectionsLink').href = center.directionsUrl;

    // --- 4. Mailing Address (Physical and Mailing) - Using Correct IDs ---
    // If center.addresses is null, renderSpecificAddress handles it by checking Array.isArray(addresses)
    renderSpecificAddress('physicalAddress', center.addresses, 'Physical');
    renderSpecificAddress('mailingAddress', center.addresses, 'Mailing');

    // --- 5. Amenities (vcAmenities) ---
    const amenitiesContainer = document.querySelector('#vcAmenities .vc-amenities__content');
    if (amenitiesContainer && center.amenities) {
        amenitiesContainer.innerHTML = amenitiesTemplate(center.amenities);
    }

    // --- 6. Contact (vcContact) ---
    const contactContainer = document.querySelector('#vcContact .vc-contact__content');
    if (contactContainer && center.contacts) {
        contactContainer.innerHTML = contactTemplate(center.contacts);
    }

    // --- 7. Image Gallery (vcGallery) ---
    const galleryContent = document.querySelector('.vc-gallery__content');
    if (galleryContent && center.images) {
        galleryContent.innerHTML = galleryTemplate(center.images);
    }

    // Update the title
    document.title = `${center.name} | National Park Service`;
}

/**
 * Main initialization function.
 */
async function init() {
    try {
        const parkData = await getParkData();
        setHeaderFooter(parkData);
        const vcId = getVisitorCenterIdFromUrl();

        if (vcId) {
            const centerDetails = await getParkVisitorCenterDetails(vcId);
            renderVisitorCenterDetails(centerDetails);
        }

    } catch (error) {
        console.error("Critical error initializing visitor center content:", error);
        document.getElementById('main').innerHTML = `
            <h1>System Error 🚨</h1>
            <p>Could not load visitor center information due to an API or network error.</p>
            <p>Details: ${error.message}</p>
        `;
    }
}

// Start the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);