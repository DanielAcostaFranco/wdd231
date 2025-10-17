// api.js
const baseUrl = "https://developer.nps.gov/api/v1/";

async function getJson(endpoint) {
    // replace this with your actual key
    const apiKey = "m2mckzu4xTa1pscWdDCFjZH48gILdvgAEKLOXrKc";
    // construct the url: baseUrl + endpoint + parameters
    const url = baseUrl + endpoint;
    // set the options. The important one here is the X-Api-Key
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": apiKey
        }
    }
    // make the request
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    return data;
}

function listTemplate(item) {
    return `<li><a href="${item.url}">${item.fullName}</a> ${item.parkCode}</li>`
}

async function climbingParks() {
    const endPoint = "activities/parks?q=climbing";
    const displayList = document.getElementById("outputList");
    const data = await getJson(endPoint);
    const parks = data.data;
    const listHTML = parks.map(listTemplate).join("");
    displayList.innerHTML = listHTML;
}

getJson('alerts?parkCode=acad,dena');
climbingParks();