export function home() {
    document.getElementById("app").innerHTML = `
    <h1>Home</h1>
    <a href="/parks/yell" data-link>Yellowstone</a>
  `;
}

export function parkPage(code) {
    document.getElementById("app").innerHTML = `
    <h1>Park: ${code}</h1>
    <p>Esta página NO existe como archivo</p>
  `;
}

export function notFound() {
    document.getElementById("app").innerHTML = `
    <h1>404</h1>
  `;
}
