// js/parkService.mjs 

const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env?.VITE_NPS_API_KEY || "";

// ====================================================================
// GLOBAL SYSTEM: READS ?park=xxx FROM URL AUTOMATICALLY
// ====================================================================
export const DEFAULT_PARK_CODE = "yose";
let currentParkCode = DEFAULT_PARK_CODE;

if (typeof window !== "undefined" && window.__OVERRIDE_PARK_CODE__) {
  currentParkCode = window.__OVERRIDE_PARK_CODE__.toLowerCase();
}

if (typeof window !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  const parkFromUrl = params.get("park");
  if (parkFromUrl) {
    currentParkCode = parkFromUrl.toLowerCase();
  }
}

export function setCurrentParkCode(code) {
  if (code) currentParkCode = code.toLowerCase();
}

export function getCurrentParkCode() {
  return currentParkCode;
}

// ====================================================================
// SAFE FUNCTION TO CALL THE API
// ====================================================================
async function fetchNPS(endpoint) {
  const url = apiKey
    ? `${baseUrl}${endpoint}&api_key=${apiKey}`
    : `${baseUrl}${endpoint}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      // Return error if API is not 200 OK
      console.warn(`NPS API error ${res.status}: ${endpoint}`);
      throw new Error(`API returned status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Network error with NPS API:", err.message);
    throw err; // Propagate the error
  }
}

// ====================================================================
// PUBLIC FUNCTIONS (NO FALLBACKS)
// ====================================================================


if (!code) {
  code = getCurrentParkCode();
  const result = await fetchNPS(`parks?parkCode=${code}&limit=1`);

  if (result.data && result.data.length > 0) {
    return result.data[0];
  }

  throw new Error(`Park data for code ${code} not found in API response.`);
}
export async function getParkAlerts() {
  const code = getCurrentParkCode();
  const result = await fetchNPS(`alerts?parkCode=${code}&limit=50`);
  return result.data || [];
}

export async function getParkVisitorCenters() {
  const code = getCurrentParkCode();
  const result = await fetchNPS(`visitorcenters?parkCode=${code}&limit=50`);

  if (result.data && result.data.length > 0) {
    return result.data;
  }

  // Return an empty array if no centers are found
  return [];
}

export async function getParkVisitorCenterDetails(index) {
  const centers = await getParkVisitorCenters();
  const i = parseInt(index, 10);

  if (centers.length === 0) {
    throw new Error("No visitor centers found for this park.");
  }

  // Use the requested center, or the first one if the index is invalid/out of range.
  const center = centers[i] || centers[0];

  if (!center) {
    throw new Error(`Could not load visitor center details for index ${index}.`);
  }

  return center;
}

// For the main page
export const parkInfoLinks = [
  {
    name: "Current Conditions",
    link: "conditions.html",
    description: "See current alerts and conditions"
  },
  {
    name: "Fees and Passes",
    link: "fees.html",
    description: "Learn about entrance fees and passes"
  },
  {
    name: "Visitor Centers",
    link: "visitor_centers.html",
    description: "Find visitor centers and ranger stations"
  }
];

export function getInfoLinks(images = []) {
  return parkInfoLinks.map((item, i) => ({
    ...item,
    image: images[i]?.url || images[0]?.url || "/images/default.jpg"
  }));
}