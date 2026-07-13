/* ==========================================
   ANALYTICS MODULE
========================================== */

let analyticsData = [];

let topStoreChart = null;
let topBarangChart = null;
let monthlyTrendChart = null;
let dailyTrendChart = null;

function renderAnalytics(){

    renderAnalyticsKPI(analyticsData);

    renderTopStoreChart(analyticsData);

    renderTopBarangChart(analyticsData);

    renderMonthlyTrend(analyticsData);

    renderDailyTrend(analyticsData);

    renderRankingStore(analyticsData);

    renderRankingBarang(analyticsData);

    renderExecutiveInsight();

}

function renderAnalyticsKPI(){

    if(!analyticsData || analyticsData.length===0) return;

    // =============================
    // TOP STORE
    // =============================

    const storeMap = {};

    analyticsData.forEach(item=>{

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

    analyticsData.forEach(item=>{

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
        analyticsData.reduce((a,b)=>a+Number(b.qtyTotal),0);

    const avg =
        Math.round(totalQty / analyticsData.length);

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

    analyticsData.forEach(item=>{

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

    analyticsData.forEach(item=>{

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

    analyticsData.forEach(item=>{

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

function renderDailyTrend(){

    const canvas = document.getElementById("dailyTrendChart");

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    const c = getComputedStyle(document.body);

    const text = c.getPropertyValue("--text").trim();
    const text2 = c.getPropertyValue("--text2").trim();
    const primary = c.getPropertyValue("--primary").trim();

    const dayMap = {};

    analyticsData.forEach(item=>{

        if(!item.tanggal) return;

        const tgl = new Date(item.tanggal);

        if(isNaN(tgl)) return;

        const hari = tgl.getDate();

        dayMap[hari] =
            (dayMap[hari] || 0) + Number(item.qtyTotal);

    });

    const labels = Object.keys(dayMap)
        .map(Number)
        .sort((a,b)=>a-b);

    const values = labels.map(i=>dayMap[i]);

    if(dailyTrendChart){

        dailyTrendChart.destroy();

    }

    const gradient = ctx.createLinearGradient(0,0,0,350);

    gradient.addColorStop(0,"rgba(25,229,209,.35)");
    gradient.addColorStop(1,"rgba(25,229,209,0)");

    dailyTrendChart = new Chart(ctx,{

        type:"line",

        data:{

            labels,

            datasets:[{

                label:"Qty Harian",

                data:values,

                borderColor:primary,

                backgroundColor:gradient,

                fill:true,

                borderWidth:3,

                tension:.35,

                pointRadius:4,

                pointHoverRadius:7,

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
                        color:text
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

function renderRankingStore(){

    const tbody = document.getElementById("rankingStoreBody");

    if(!tbody) return;

    tbody.innerHTML = "";

    const storeMap = {};

    analyticsData.forEach(item=>{

        const toko = item.toko;

        storeMap[toko] =
            (storeMap[toko] || 0) + Number(item.qtyTotal);

    });

    const ranking = Object.entries(storeMap)
        .sort((a,b)=>b[1]-a[1]);

    const total =
        ranking.reduce((a,b)=>a+b[1],0);

    ranking.forEach((row,index)=>{

        const persen =
            ((row[1]/total)*100).toFixed(1);

        tbody.innerHTML += `

            <tr>

                <td>${index+1}</td>

                <td>${row[0]}</td>

                <td>${row[1]}</td>

                <td>${persen}%</td>

            </tr>

        `;

    });

}

function renderRankingBarang(){

    const tbody=document.getElementById("rankingBarangBody");

    if(!tbody) return;

    tbody.innerHTML="";

    const map={};

    analyticsData.forEach(item=>{

        map[item.detail]=(map[item.detail]||0)+Number(item.qtyTotal);

    });

    const ranking=Object.entries(map)
        .sort((a,b)=>b[1]-a[1])
        .slice(0,10);

    const total=ranking.reduce((a,b)=>a+b[1],0);

    ranking.forEach((row,index)=>{

        const share=((row[1]/total)*100).toFixed(1);

        let medal=index+1;

        if(index===0) medal="🥇";
        else if(index===1) medal="🥈";
        else if(index===2) medal="🥉";

        tbody.innerHTML+=`

        <tr>

            <td>${medal}</td>

            <td>${row[0]}</td>

            <td>${row[1]}</td>

            <td>${share}%</td>

        </tr>

        `;

    });

}

function renderExecutiveInsight(){

    if(!analyticsData || analyticsData.length===0) return;

    // ==========================
    // STORE
    // ==========================
    const storeMap={};

    analyticsData.forEach(item=>{

        storeMap[item.toko]=(storeMap[item.toko]||0)+Number(item.qtyTotal);

    });

    const storeRanking=Object.entries(storeMap)
        .sort((a,b)=>b[1]-a[1]);

    const bestStore=storeRanking[0];
    const marketLeader=storeRanking[0];

    // ==========================
    // BARANG
    // ==========================
    const itemMap={};

    analyticsData.forEach(item=>{

        itemMap[item.detail]=(itemMap[item.detail]||0)+Number(item.qtyTotal);

    });

    const itemRanking=Object.entries(itemMap)
        .sort((a,b)=>b[1]-a[1]);

    const bestProduct=itemRanking[0];
    const slowProduct=itemRanking[itemRanking.length-1];

    // ==========================
    // MARKET SHARE
    // ==========================
    const totalQty=itemRanking.reduce((a,b)=>a+b[1],0);

    const marketShare=((marketLeader[1]/totalQty)*100).toFixed(1);

    // ==========================
    // ISI CARD
    // ==========================

   document.getElementById("bestStoreInsight").innerHTML =
    `<b>${bestStore[0]}</b><br>${bestStore[1]} Unit`;

    document.getElementById("bestProductInsight").innerHTML =
    `<b>${bestProduct[0]}</b><br>${bestProduct[1]} Unit`;

    document.getElementById("fastMovingInsight").innerHTML =
    `<b>${bestProduct[0]}</b><br>${bestProduct[1]} Unit`;

    document.getElementById("slowMovingInsight").innerHTML =
    `<b>${slowProduct[0]}</b><br>${slowProduct[1]} Unit`;

    document.getElementById("leaderInsight").innerHTML =
    `<b>${marketLeader[0]}</b><br>${marketShare}%`;

    document.getElementById("growthInsight").innerHTML =
    `<b>Coming Soon</b><br>Auto Calculate`;

}

function applyAnalyticsFilter() {

    const year =
        document.getElementById("analyticsYear").value;

    const month =
        document.getElementById("analyticsMonth").value;

    const store =
        document.getElementById("analyticsStore").value;

    const barang =
        document.getElementById("analyticsBarang").value;

    let filtered = [...globalData];

    if (year) {
        filtered = filtered.filter(item => item.tahun == year);
    }

    if (month) {
        filtered = filtered.filter(item => item.bulan == month);
    }

    if (store) {
        filtered = filtered.filter(item => item.toko == store);
    }

    if (barang) {
        filtered = filtered.filter(item => item.detail == barang);
    }

    analyticsData = filtered;

    renderAnalytics();

}

function buildAnalyticsFilters(){

    const years =
        [...new Set(globalData.map(x=>x.tahun))];

    const monthOrder = [
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

const months = monthOrder.filter(month =>
    globalData.some(item => item.bulan === month)
);

    const stores =
        [...new Set(globalData.map(x=>x.toko))];

    const items =
        [...new Set(globalData.map(x=>x.detail))];

    fillSelect("analyticsYear", years, "Semua Tahun");
    fillSelect("analyticsMonth", months, "Semua Bulan");
    fillSelect("analyticsStore", stores, "Semua Toko");
    fillSelect("analyticsBarang", items, "Semua Barang");

}

function fillSelect(id,data,label){

    const select=document.getElementById(id);

    if(!select) return;

    select.innerHTML=`<option value="">${label}</option>`;

    data.forEach(item=>{

        select.innerHTML +=
        `<option value="${item}">${item}</option>`;

    });

}