/* ==========================================
   utils.js
   Utility Functions
========================================== */

// =========================
// Update Jam & Tanggal
// =========================
function updateClock() {

    const now = new Date();

    const date = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("id-ID");

    const dateElement = document.getElementById("date");
    const clockElement = document.getElementById("clock");

    if (dateElement) {
        dateElement.textContent = date;
    }

    if (clockElement) {
        clockElement.textContent = time;
    }

}

// =========================
// Format Angka Indonesia
// =========================
function formatNumber(number) {

    return Number(number).toLocaleString("id-ID");

}

// =========================
// Ambil Nilai Unik
// =========================
function uniqueValues(data, field) {

    return [...new Set(data.map(item => item[field]))].sort();

}