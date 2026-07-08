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

            plugins:{

                legend:{

                    position:"bottom",

                    labels:{

                        color:"#fff"

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

            interaction:{

                mode:"index",

                intersect:false

            },

            plugins:{

                legend:{

                    labels:{

                        color:"#fff"

                    }

                }

            },

            scales:{

                x:{

                    ticks:{

                        color:"#cbd5e1"

                    },

                    grid:{

                        color:"rgba(255,255,255,.05)"

                    }

                },

                y:{

                    beginAtZero:true,

                    ticks:{

                        color:"#cbd5e1"

                    },

                    grid:{

                        color:"rgba(255,255,255,.05)"

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