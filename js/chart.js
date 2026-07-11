let pieChart;
let lineChart;

function renderCharts(){

    renderPieChart();

    renderLineChart();

}

function renderPieChart(){

    const ctx = document
        .getElementById("pieChart")
        .getContext("2d");

    const group = {};

    filteredData.forEach(item=>{

        const key = item.detail;

        group[key] = (group[key] || 0)
            + Number(item.qtyTotal);

    });

    const labels = Object.keys(group);

    const values = Object.values(group);

    if(pieChart){

        pieChart.destroy();

    }

    const styles = getComputedStyle(document.body);

    const isLight = document.body.classList.contains("light");

    const legendColor = isLight
    ? "#1E293B"
    : "#F8FAFC";

    pieChart = new Chart(ctx,{

        type:"doughnut",

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

                borderWidth:0

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            animation:{
                duration:900,
                easing:"easeOutQuart"
            },

            plugins:{

                legend:{

                    position:"bottom",

                    labels:{
                        color:legendColor,
                        usePointStyle:true,
                        pointStyle:"rect",
                        boxWidth:28,
                        boxHeight:12,
                        padding:24,
                    font:{
                            size:15,
                            weight:"700",
                            family:"Poppins"
                    }
                    
                    }

                }

            }

        }

    });

}

function renderLineChart(){

    const ctx = document
        .getElementById("lineChart")
        .getContext("2d");

    const monthData = {};

    filteredData.forEach(item=>{

        const bulan = item.bulan;

        monthData[bulan] =
            (monthData[bulan] || 0)
            + Number(item.qtyTotal);

    });

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

    const labels = [];
    const values = [];

    months.forEach(month=>{

        if(monthData[month] !== undefined){

            labels.push(month);

            values.push(monthData[month]);

        }

    });

    if(lineChart){

        lineChart.destroy();

    }

    const styles = getComputedStyle(document.body);

    const textColor = styles
    .getPropertyValue("--text")
    .trim();

    const secondaryText = styles
    .getPropertyValue("--text2")
    .trim();

    lineChart = new Chart(ctx,{

        type:"line",

        data:{

            labels,

            datasets:[{

                label:"Qty Penjualan",

                data:values,

                borderColor:"#19E5D1",

                backgroundColor:"rgba(25,229,209,.15)",

                fill:true,

                tension:.35,

                borderWidth:3,

                pointRadius:5,

                pointHoverRadius:8,

                pointBackgroundColor:"#19E5D1"

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            animation:{
                duration:900,
                easing:"easingOutQuart"
            },

            interaction:{

                mode:"index",

                intersect:false

            },

plugins:{

    legend:{

        labels:{

            color:textColor,

            font:{
                size:13,
                weight:"600",
                family:"Poppins"
            }

        }

    }

},

            scales:{

                x:{

                    ticks:{

                        color:secondaryText
                        
                    },

                    grid:{
    color:"rgba(148,163,184,.10)",
    drawBorder:false
}

                },

                y:{

                    beginAtZero:true,

                    ticks:{

                        color:secondaryText

                    },

                    grid:{
    color:"rgba(148,163,184,.10)",
    drawBorder:false
}

                }

            }

        }

    });

}

function downloadChart(chart, filename){

    const link = document.createElement("a");

    link.download = filename;

    link.href = chart.toBase64Image();

    link.click();

}