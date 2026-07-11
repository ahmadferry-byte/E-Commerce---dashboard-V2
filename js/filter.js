/* ==========================================
   filter.js
   Filter Functions
========================================== */

function buildFilters() {

    buildSelect(
        "filterTahun",
        uniqueValues(globalData, "tahun"),
        "Semua Tahun"
    );

    buildSelect(
        "filterBulan",
        uniqueValues(globalData, "bulan"),
        "Semua Bulan"
    );

    buildSelect(
        "filterToko",
        uniqueValues(globalData, "toko"),
        "Semua Toko"
    );

    buildSelect(
        "filterBarang",
        uniqueValues(globalData, "detail"),
        "Semua Barang"
    );

}


function buildSelect(id, data, defaultText) {

    const select = document.getElementById(id);

    if (!select) return;

    select.innerHTML = "";

    const first = document.createElement("option");

    first.value = "";
    first.textContent = defaultText;

    select.appendChild(first);

    data.forEach(item => {

        const option = document.createElement("option");

        option.value = item;
        option.textContent = item;

        select.appendChild(option);

    });

}


function applyFilters() {

    const tahun = document.getElementById("filterTahun").value;
    const bulan = document.getElementById("filterBulan").value;
    const toko = document.getElementById("filterToko").value;
    const barang = document.getElementById("filterBarang").value;

    filteredData = globalData.filter(item => {

        return (

            (!tahun || item.tahun === tahun) &&
            (!bulan || item.bulan === bulan) &&
            (!toko || item.toko === toko) &&
            (!barang || item.detail === barang)

        );

    });

    updateKPIFiltered();

    renderTable(filteredData);

    renderCharts();

}