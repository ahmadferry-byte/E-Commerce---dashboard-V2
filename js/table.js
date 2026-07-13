/* ==========================================
   table.js
   Render Table + Pagination
========================================== */

let sortColumn = "";
let sortDirection = "asc";

function renderTable(data = filteredData) {

    const tbody = document.getElementById("tableBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (data.length === 0) {

    tbody.innerHTML = `
        <tr>

            <td colspan="8" class="empty-table">

                <div class="empty-icon">📂</div>

                <div class="empty-title">
                    Tidak ada data ditemukan
                </div>

                <div class="empty-desc">
                    Coba ubah filter atau kata pencarian.
                </div>

            </td>

        </tr>
    `;

    document.getElementById("tableInfo").textContent = "";

    document.getElementById("pagination").innerHTML = "";

    return;

}

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const pageData = data.slice(start, end);

    pageData.forEach((item, index) => {

    const rowNumber = start + index + 1;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${rowNumber}</td>
        <td>${item.tanggal}</td>
        <td>${item.toko}</td>
        <td>${item.detail}</td>
        <td>${formatNumber(item.qtyRegular)}</td>
        <td>${formatNumber(item.qtyOther)}</td>
        <td>${formatNumber(item.qtyAftersales)}</td>
        <td><strong>${formatNumber(item.qtyTotal)}</strong></td>
    `;

    tbody.appendChild(row);

});

    renderPagination(data);

}

function createPageButton(page, data) {

    const btn = document.createElement("button");

    btn.textContent = page;

    if (page === currentPage) {

        btn.classList.add("active");

    }

    btn.onclick = () => {

        currentPage = page;

        renderTable(data);

    };

    return btn;

}

function renderPagination(data) {

    const totalPages = Math.ceil(data.length / pageSize);

    const pagination = document.getElementById("pagination");

    const info = document.getElementById("tableInfo");

    pagination.innerHTML = "";

    const start = (currentPage - 1) * pageSize + 1;

    const end = Math.min(currentPage * pageSize, data.length);

    info.textContent =
        `Showing ${start} to ${end} of ${data.length} entries`;

    // =====================
    // Previous
    // =====================

    const prev = document.createElement("button");

    prev.textContent = "‹";

    prev.disabled = currentPage === 1;

    prev.onclick = () => {

        currentPage--;

        renderTable(data);

    };

    pagination.appendChild(prev);

    // =====================
    // Smart Page Numbers
    // =====================

    let startPage = Math.max(1, currentPage - 2);

    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {

        endPage = Math.min(5, totalPages);

    }

    if (currentPage >= totalPages - 2) {

        startPage = Math.max(1, totalPages - 4);

    }

    // Halaman pertama

    if (startPage > 1) {

        pagination.appendChild(createPageButton(1, data));

        if (startPage > 2) {

            const dots = document.createElement("span");

            dots.textContent = "...";

            dots.className = "dots";

            pagination.appendChild(dots);

        }

    }

    // Nomor halaman tengah

    for (let i = startPage; i <= endPage; i++) {

        pagination.appendChild(createPageButton(i, data));

    }

    // Halaman terakhir

    if (endPage < totalPages) {

        if (endPage < totalPages - 1) {

            const dots = document.createElement("span");

            dots.textContent = "...";

            dots.className = "dots";

            pagination.appendChild(dots);

        }

        pagination.appendChild(createPageButton(totalPages, data));

    }

    // =====================
    // Next
    // =====================

    const next = document.createElement("button");

    next.textContent = "›";

    next.disabled = currentPage === totalPages;

    next.onclick = () => {

        currentPage++;

        renderTable(data);

    };

    pagination.appendChild(next);

}

function sortTable(column){

        console.log("Klik Sort:", column);

    if(sortColumn === column){

        sortDirection =
            sortDirection === "asc"
            ? "desc"
            : "asc";

    }else{

        sortColumn = column;

        sortDirection = "asc";

    }

    filteredData.sort((a,b)=>{

        let valueA = a[column];

        let valueB = b[column];

        if(!isNaN(valueA) && !isNaN(valueB)){

            valueA = Number(valueA);

            valueB = Number(valueB);

        }

        if(valueA < valueB){

            return sortDirection === "asc" ? -1 : 1;

        }

        if(valueA > valueB){

            return sortDirection === "asc" ? 1 : -1;

        }

        return 0;

    });

    currentPage = 1;

    updateSortIcons();

    renderTable(filteredData);

}

function updateSortIcons() {

    console.log("updateSortIcons dijalankan");

    document.querySelectorAll("thead th").forEach(th => {

        const column = th.dataset.column;

        const label = th.dataset.label;

        if (!column) return;

        if (column === sortColumn) {

            th.innerHTML =
                label +
                (sortDirection === "asc"
                    ? " ▲"
                    : " ▼");

        } else {

            th.innerHTML = label;

        }

    });

}