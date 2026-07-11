/* ==========================================
   ANALYTICS MODULE
========================================== */

let topStoreChart = null;
let topBarangChart = null;
let monthlyTrendChart = null;
let dailyTrendChart = null;

function renderAnalytics(){

    renderAnalyticsKPI();

    renderTopStoreChart();

    renderTopBarangChart();

    renderMonthlyTrend();


}

function renderAnalyticsKPI(){

    if(!filteredData || filteredData.length===0) return;

    // =============================
    // TOP STORE
    // =============================

    const storeMap = {};

    filteredData.forEach(item=>{

        const toko = item.toko;

        storeMap[toko] = (storeMap[toko] || 0) + Number(item.qtyTotal);

    });

    const topStore = Object.entries(storeMap)
        .sort((a,b)=>b[1]-a[1])[0];

    document.getElementById("topStoreName").textContent =
        topStore ? topStore[0] : "-";

    document.getElementById("topStoreQty").textContent =
        topStore ? topStore[1]+" Unit" : "0 Unit";

    // =============================
    // TOP BARANG
    // =============================

    const barangMap = {};

    filteredData.forEach(item=>{

        const barang = item.detail;

        barangMap[barang] =
            (barangMap[barang] || 0) + Number(item.qtyTotal);

    });

    const topBarang = Object.entries(barangMap)
        .sort((a,b)=>b[1]-a[1])[0];

    document.getElementById("topItemName").textContent =
        topBarang ? topBarang[0] : "-";

    document.getElementById("topItemQty").textContent =
        topBarang ? topBarang[1]+" Unit" : "0 Unit";

    // =============================
    // AVG
    // =============================

    const totalQty =
        filteredData.reduce((a,b)=>a+Number(b.qtyTotal),0);

    const avg =
        Math.round(totalQty / filteredData.length);

    document.getElementById("avgQty").textContent = avg;

    // =============================
    // GROWTH
    // =============================

    document.getElementById("growthValue").textContent="Coming Soon";

}

function renderTopStoreChart(){

    const canvas = document.getElementById("topStoreChart");

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    const styles = getComputedStyle(document.body);

    const textColor = styles.getPropertyValue("--text").trim();
    const text2 = styles.getPropertyValue("--text2").trim();

    const storeMap = {};

    filteredData.forEach(item=>{

        const toko = item.toko;

        storeMap[toko] = (storeMap[toko] || 0) + Number(item.qtyTotal);

    });

    const ranking = Object.entries(storeMap)
        .sort((a,b)=>b[1]-a[1])
        .slice(0,10);

    const labels = ranking.map(x=>x[0]);
    const values = ranking.map(x=>x[1]);

    if(topStoreChart){

        topStoreChart.destroy();

    }

    topStoreChart = new Chart(ctx,{

        type:"bar",

        data:{

            labels,

            datasets:[{

                data:values,

                backgroundColor:"#19E5D1",

                borderRadius:8

            }]

        },

        options:{

            indexAxis:"y",

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                x:{
                    ticks:{
                        color:text2
                    },
                    grid:{
                        color:"rgba(148,163,184,.10)"
                    }
                },

                y:{
                    ticks:{
                        color:textColor
                    },
                    grid:{
                        display:false
                    }
                }

            }

        }

    });

}

function renderTopBarangChart(){

    const canvas = document.getElementById("topBarangChart");

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    const styles = getComputedStyle(document.body);

    const textColor = styles.getPropertyValue("--text").trim();

    const text2 = styles.getPropertyValue("--text2").trim();

    const barangMap = {};

    filteredData.forEach(item=>{

        const barang = item.detail;

        barangMap[barang] =
            (barangMap[barang] || 0) + Number(item.qtyTotal);

    });

    const ranking = Object.entries(barangMap)
        .sort((a,b)=>b[1]-a[1])
        .slice(0,10);

    const labels = ranking.map(x=>x[0]);

    const values = ranking.map(x=>x[1]);

    if(topBarangChart){

        topBarangChart.destroy();

    }

    topBarangChart = new Chart(ctx,{

        type:"bar",

        data:{

            labels,

            datasets:[{

                data:values,

                backgroundColor:[
                    "#19E5D1",
                    "#0EA5E9",
                    "#22C55E",
                    "#FACC15",
                    "#EF4444",
                    "#8B5CF6"
                ],

                borderRadius:8

            }]

        },

        options:{

            indexAxis:"y",

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                x:{

                    ticks:{
                        color:text2
                    },

                    grid:{
                        color:"rgba(148,163,184,.10)"
                    }

                },

                y:{

                    ticks:{
                        color:textColor
                    },

                    grid:{
                        display:false
                    }

                }

            }

        }

    });

}

function renderMonthlyTrend(){

    const canvas = document.getElementById("monthlyTrendChart");

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    const styles = getComputedStyle(document.body);

    const textColor = styles.getPropertyValue("--text").trim();
    const text2 = styles.getPropertyValue("--text2").trim();
    const primary = styles.getPropertyValue("--primary").trim();

    const monthMap = {};

    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    filteredData.forEach(item=>{

        const bulan = item.bulan;

        monthMap[bulan] =
            (monthMap[bulan] || 0) + Number(item.qtyTotal);

    });

    const labels = [];
    const values = [];

    months.forEach(b=>{

        if(monthMap[b] !== undefined){

            labels.push(b);

            values.push(monthMap[b]);

        }

    });

    if(monthlyTrendChart){

        monthlyTrendChart.destroy();

    }

    const gradient = ctx.createLinearGradient(0,0,0,350);

    gradient.addColorStop(0,"rgba(25,229,209,.35)");
    gradient.addColorStop(1,"rgba(25,229,209,0)");

    monthlyTrendChart = new Chart(ctx,{

        type:"line",

        data:{

            labels,

            datasets:[{

                label:"Qty Penjualan",

                data:values,

                borderColor:primary,

                backgroundColor:gradient,

                fill:true,

                borderWidth:3,

                tension:.35,

                pointRadius:5,

                pointHoverRadius:8,

                pointBackgroundColor:primary

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            interaction:{

                mode:"index",

                intersect:false

            },

            plugins:{

                legend:{

                    labels:{
                        color:textColor
                    }

                }

            },

            scales:{

                x:{

                    ticks:{
                        color:text2
                    },

                    grid:{
                        color:"rgba(148,163,184,.10)"
                    }

                },

                y:{

                    beginAtZero:true,

                    ticks:{
                        color:text2
                    },

                    grid:{
                        color:"rgba(148,163,184,.10)"
                    }

                }

            }

        }

    });

}
