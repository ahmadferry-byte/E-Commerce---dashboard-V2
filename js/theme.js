/* ==========================================
   THEME
========================================== */

function refreshCharts() {

    if (typeof renderCharts === "function") {
        renderCharts();
    }

}

function toggleTheme() {

    const body = document.body;
    const icon = document.querySelector("#themeBtn i");

    body.classList.toggle("light");

    if (body.classList.contains("light")) {

        localStorage.setItem("theme", "light");

        icon.className = "fa-solid fa-sun";

    } else {

        localStorage.setItem("theme", "dark");

        icon.className = "fa-solid fa-moon";

    }

    // Tunggu CSS selesai berubah
    requestAnimationFrame(() => {

        refreshCharts();

    });

}


// Saat halaman dibuka
function loadTheme() {

    const body = document.body;
    const icon = document.querySelector("#themeBtn i");

    const theme = localStorage.getItem("theme") || "dark";

    if (theme === "light") {

        body.classList.add("light");

        icon.className = "fa-solid fa-sun";

    } else {

        body.classList.remove("light");

        icon.className = "fa-solid fa-moon";

    }

    requestAnimationFrame(() => {

        refreshCharts();

    });

}