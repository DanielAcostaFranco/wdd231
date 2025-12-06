export function router() {
    const path = window.location.pathname;

    if (path === "/") {
        home();
    }
    else if (path.startsWith("/parks/")) {
        const code = path.split("/")[2];
        parkPage(code);
    }
    else {
        notFound();
    }
}
