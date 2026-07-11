function exportExcel(){

    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Penjualan"
    );

    XLSX.writeFile(
        workbook,
        "Penjualan.xlsx"
    );

}

function exportPDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.text("Dashboard Penjualan",14,15);

    const rows = filteredData.map(item=>[

        item.tanggal,
        item.toko,
        item.detail,
        item.qtyRegular,
        item.qtyOther,
        item.qtyAftersales,
        item.qtyTotal

    ]);

    doc.autoTable({

        head:[[

            "Tanggal",
            "Toko",
            "Barang",
            "Regular",
            "Other",
            "Aftersales",
            "Total"

        ]],

        body:rows,

        startY:25

    });

    doc.save("Dashboard Penjualan.pdf");

}