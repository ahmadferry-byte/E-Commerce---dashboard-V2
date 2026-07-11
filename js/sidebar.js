const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuToggle = document.getElementById("menuToggle");

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");

    });

}

if(overlay){

    overlay.addEventListener("click",()=>{

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    });

}

/* ==========================================
   PAGE NAVIGATION
========================================== */

const dashboardPage = document.getElementById("dashboardPage");
const analyticsPage = document.getElementById("analyticsPage");

const menuDashboard = document.getElementById("menuDashboard");
const menuAnalytics = document.getElementById("menuAnalytics");

function showPage(page){

    dashboardPage.style.display = "none";
    analyticsPage.style.display = "none";

    menuDashboard.classList.remove("active");
    menuAnalytics.classList.remove("active");

    if(page === "dashboard"){

        dashboardPage.style.display = "block";

        menuDashboard.classList.add("active");

    }

    if(page === "analytics"){

        analyticsPage.style.display = "block";

        menuAnalytics.classList.add("active");

    }

}

menuDashboard.addEventListener("click",function(e){

    e.preventDefault();

    showPage("dashboard");

});

menuAnalytics.addEventListener("click",function(e){

    e.preventDefault();

    showPage("analytics");

});

showPage("dashboard");