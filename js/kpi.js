/* ==========================================
   kpi.js
   KPI Functions
========================================== */

function updateKPI() {

    // Total Data
    document.getElementById("totalData").textContent =
        formatNumber(globalData.length);

    // Total Qty
    const totalQty = globalData.reduce((sum, item) => {

        return sum + Number(item.qtyTotal || 0);

    }, 0);

    document.getElementById("totalBarang").textContent =
        formatNumber(totalQty);

    // Total Toko
    const totalStore = new Set(

        globalData.map(item => item.toko)

    ).size;

    document.getElementById("totalToko").textContent =
        totalStore;

    // Total Jenis
    const totalJenis = new Set(

        globalData.map(item => item.detail)

    ).size;

    document.getElementById("totalJenis").textContent =
        totalJenis;

}



function updateKPIFiltered() {

    document.getElementById("totalData").textContent =
        formatNumber(filteredData.length);


    const totalQty = filteredData.reduce((sum, item) => {

        return sum + Number(item.qtyTotal || 0);

    }, 0);

    document.getElementById("totalBarang").textContent =
        formatNumber(totalQty);


    const totalStore = new Set(

        filteredData.map(item => item.toko)

    ).size;

    document.getElementById("totalToko").textContent =
        totalStore;


    const totalJenis = new Set(

        filteredData.map(item => item.detail)

    ).size;

    document.getElementById("totalJenis").textContent =
        totalJenis;

}