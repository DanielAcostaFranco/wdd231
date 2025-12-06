// js/conditions.js → FINAL CORRECT AND FUNCTIONAL VERSION

import "../css/style.css";
import "../css/conditions.css";

import {
    getParkData,
    getParkAlerts,
    getParkVisitorCenters
} from "./parkService.mjs";

import {
    alertTemplate,
    visitorCenterTemplate,
    activityListTemplate
} from "./templates.mjs";

import setHeaderFooter from "./setHeaderFooter.mjs";

// ====================================================================
// ALERTS
// ====================================================================
function setAlerts(alerts) {
    const container = document.querySelector(".alerts > ul");
    if (!container) return;

    container.innerHTML = "";

    if (!alerts || alerts.length === 0) {
        container.innerHTML = "<li>No current alerts.</li>";
        return;
    }

    alerts.forEach(alert => {
        container.insertAdjacentHTML("beforeend", alertTemplate(alert));
    });
}

// ====================================================================
// VISITOR CENTERS
// ====================================================================
async function setVisitorCenters() {
    const container = document.querySelector(".visitor ul");
    if (!container) return;

    container.innerHTML = "<li>Loading visitor centers...</li>";

    const centers = await getParkVisitorCenters();

    container.innerHTML = "";

    if (centers.length === 0) {
        container.innerHTML = "<li>No visitor centers found.</li>";
        return;
    }

    centers.forEach((center, index) => {
        container.insertAdjacentHTML("beforeend", visitorCenterTemplate(center, index));
    });
}

// ====================================================================
// ACTIVITIES
// ====================================================================
function setActivities(activities) {
    const container = document.querySelector(".activities ul");
    if (!container) return;

    container.innerHTML = activityListTemplate(activities || []);
}

// ====================================================================
// START → NO ERRORS
// ====================================================================
async function init() {
    try {
        const parkData = await getParkData();

        // COMMON ERROR: It said "clinicData" here instead of "parkData"!
        if (!parkData) {
            document.body.innerHTML = `
        <h1 style="text-align:center; margin-top:100px; color:#721c24;">
          Error: Could not load park data
        </h1>
        <p style="text-align:center;">
          Verify that the URL has a valid <strong>?park=code</strong> (e.g., ?park=zion, ?park=yell, ?park=acad)
        </p>
      `;
            return;
        }

        // All good → load content
        setHeaderFooter(parkData);
        setActivities(parkData.activities);

        const alerts = await getParkAlerts();
        setAlerts(alerts);

        await setVisitorCenters();

    } catch (err) {
        console.error("Critical error in conditions.js:", err);
        document.body.innerHTML = "<h1 style='color:red; text-align:center;'>Error loading page</h1>";
    }
}

// Execute!
init();