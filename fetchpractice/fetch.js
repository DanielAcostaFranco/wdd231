// fetch.js
setTimeout(() => console.log('async'), 2000);
console.log('synchronous');

const urlList = 'https://pokeapi.co/api/v2/pokemon';

async function getPokemonList(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        doStuffList(data);
    } else {
        console.error('Error list:', response.status);
    }
}

function doStuffList(data) {
    console.log(data);
    const pokeListElement = document.querySelector('#outputlist');
    const pokeList = data.results || [];
    pokeListElement.innerHTML = pokeList
        .map(item => `<li>${item.name}</li>`)
        .join('');
}

getPokemonList(urlList);


const url = "https://pokeapi.co/api/v2/pokemon/ditto";

async function getPokemon(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        doStuff(data);
    } else {
        console.error('Error pokemon:', response.status);
    }
}

function doStuff(data) {
    console.log(data);
    const outputElement = document.querySelector("#output");
    const html = `
    <h2>${data.name}</h2>
    <img src="${data.sprites.front_default}" alt="${data.name}">
  `;
    outputElement.innerHTML = html;
    console.log("first: ", data);
}

getPokemon(url);
