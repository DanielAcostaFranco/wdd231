const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: { "X-Api-Key": apiKey }
  };
  const response = await fetch(baseUrl + url, options);
  if (!response.ok) throw new Error("response not ok");
  return response.json();
}

export async function getParkData(parkCode = "yell") {
  const parkData = await getJson(`parks?parkCode=${parkCode}`);
  return parkData.data?.[0] ?? {};
}

export async function getVisitorCenterData(parkCode = "yell") {
  const vcData = await getJson(`visitorcenters?parkCode=${parkCode}`);
  return vcData.data ?? [];
}

const parkInfoLinksTemplate = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: "",
    description:
      "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: "",
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: "",
    description: "Learn about the visitor centers in the park."
  }
];

export function getInfoLinks(images = []) {
  return parkInfoLinksTemplate.map((item, index) => ({
    ...item,
    image: images[index + 2]?.url || images[0]?.url || ""
  }));
}
