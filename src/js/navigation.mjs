function closeAllSubmenus() {
    const submenuToggles = document.querySelectorAll(".global-nav__split-button__toggle");
    submenuToggles.forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
        const submenu = btn.closest("li").querySelector(".global-nav__submenu");
        if (submenu) submenu.classList.remove("is-open");
    });
}

export default function enableNavigation() {
    const navBtn = document.getElementById("global-nav-toggle");
    const nav = document.querySelector(".global-nav");
    const submenuToggles = document.querySelectorAll(".global-nav__split-button__toggle");

    if (navBtn && nav) {

        navBtn.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");

        navBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = navBtn.getAttribute("aria-expanded") === "true";
            navBtn.setAttribute("aria-expanded", !isOpen);
            nav.classList.toggle("is-open", !isOpen);

            if (!isOpen && window.innerWidth <= 768) {
                closeAllSubmenus();
            }
        });

        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !navBtn.contains(e.target)) {
                navBtn.setAttribute("aria-expanded", "false");
                nav.classList.remove("is-open");
                closeAllSubmenus();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                navBtn.setAttribute("aria-expanded", "false");
                nav.classList.remove("is-open");
                closeAllSubmenus();
            }
        });
    }

    submenuToggles.forEach((toggle) => {
        const submenu = toggle.closest("li").querySelector(".global-nav__submenu");
        const button = toggle;

        if (!submenu) return;

        button.setAttribute("aria-expanded", "false");
        submenu.classList.remove("is-open");

        toggle.addEventListener("click", (e) => {
            e.stopPropagation();

            if (window.innerWidth > 768) return;

            const isExpanded = button.getAttribute("aria-expanded") === "true";
            const newState = !isExpanded;

            closeAllSubmenus();

            button.setAttribute("aria-expanded", newState);
            submenu.classList.toggle("is-open", newState);
        });
    });
}