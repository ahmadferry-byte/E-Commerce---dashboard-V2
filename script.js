/*=========================================================
 E-Commerce Dashboard
 script.js
=========================================================*/

let globalData = [];
let filteredData = [];
let myChart = null;

/*==========================
  Saat Website Dibuka
===========================*/

document.addEventListener("DOMContentLoaded", () => {

    updateDateTime();

    setInterval(updateDateTime,1000);

    loadData();

});


/*==========================
  Ambil Data API
===========================*/

async function loadData(){

    showLoading(true);

    try{

        const response = await fetch(CONFIG.API_URL);

        if(!response.ok){

            throw new Error("Gagal mengambil data");

        }

        const result = await response.json();

        onSuccess(result);

    }

    catch(error){

        onFailure(error);

    }

}


/*==========================
  Data Berhasil
===========================*/

function onSuccess(response){

    showLoading(false);

    if(!response.success){

        alert(response.message);

        return;

    }

    globalData = response.data;

    filteredData = [...globalData];

    buildDropdownOptions();

    renderTableAndChart();

}


/*==========================
  Data Gagal
===========================*/

function onFailure(error){

    showLoading(false);

    console.error(error);

    alert(error.message);

}
