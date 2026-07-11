/* ==========================================
   E-Commerce Dashboard V2
   Sprint 3A - Load Data
========================================== */

let globalData = [];
let filteredData = [];

let currentPage = 1;
let pageSize = 10;

// =========================
// Saat halaman selesai dimuat
// =========================
document.addEventListener("DOMContentLoaded",()=>{

    // Jam
    loadTheme();
    updateClock();
    setInterval(updateClock,1000);

    // Load data
    loadData();

    // Filter
    document
        .getElementById("filterTahun")
        .addEventListener("change",applyFilters);

    document
        .getElementById("filterBulan")
        .addEventListener("change",applyFilters);

    document
        .getElementById("filterToko")
        .addEventListener("change",applyFilters);

    document
        .getElementById("filterBarang")
        .addEventListener("change",applyFilters);

    // Search
    document
        .getElementById("searchInput")
        .addEventListener("keyup",searchTable);

    // Export
    document
        .getElementById("exportExcel")
        .addEventListener("click", exportExcel);

    document
        .getElementById("exportPDF")
        .addEventListener("click", exportPDF);

    // Download Chart
    document
        .getElementById("downloadPie")
        .addEventListener("click", () => {
            downloadChart(pieChart, "Distribusi Penjualan.png");
        });

    document
        .getElementById("downloadLine")
        .addEventListener("click", () => {
            downloadChart(lineChart, "Grafik Bulanan.png");
        });

    // Sidebar
    document
        .getElementById("menuToggle")
        .addEventListener("click", () => {

            document
                .getElementById("sidebar")
                .classList.toggle("active");

        });

    // Refresh
    document
        .getElementById("refreshBtn")
        .addEventListener("click", refreshDashboard);

    // Theme
    document
        .getElementById("themeBtn")
        .addEventListener("click", toggleTheme);

});

// =========================
// Ambil Data Apps Script
// =========================
// =========================
// Ambil Data Apps Script
// =========================
async function loadData() {

    try {

        console.log("API :", CONFIG.API_URL);

        const response = await fetch(CONFIG.API_URL);

        console.log("Status :", response.status);

        const result = await response.json();

        console.log("Response :", result);

        if (!result.success) {

            throw new Error("Response Apps Script tidak valid.");

        }

        globalData = result.data;
        filteredData = [...globalData];

        console.log("Jumlah Data :", globalData.length);

        afterLoad();

    } catch(err){

        console.error("ERROR :", err);

        document.getElementById("loadingScreen").innerHTML = `

            <div style="text-align:center">

                <h2 style="color:#ff5b5b">
                    ⚠ Gagal Memuat Data
                </h2>

                <p style="margin-top:10px;color:#9fb5d0">

                    Tidak dapat terhubung ke server.

                </p>

                <button
                    onclick="location.reload()"
                    style="
                        margin-top:20px;
                        padding:12px 25px;
                        border:none;
                        border-radius:10px;
                        background:#23e3df;
                        cursor:pointer;
                        font-weight:bold;">

                    Muat Ulang

                </button>

            </div>

        `;

    }

}

// =========================
// Setelah Data Berhasil
// =========================
function afterLoad(){

    updateKPI();

    buildFilters();

    renderTable();

    renderCharts();

    renderAnalytics();

    setTimeout(()=>{

        hideLoading();

    },500);

}

function hideLoading(){

    document
        .getElementById("loadingScreen")
        .classList.add("hide");

}

async function refreshDashboard() {

    const icon = document.querySelector("#refreshBtn i");

    icon.classList.add("spinning");

    try {

        await loadData();

    } finally {

        setTimeout(() => {

            icon.classList.remove("spinning");

        }, 500);

    }

}