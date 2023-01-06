addEventListener("load", checkLightDark)

let path = "assets/style/"
if (/\/blogs\//.test(document.location.pathname)) {
    path = "../assets/style/"
}

function switchLightDark() {
    if (localStorage.getItem("dark-mode") === "true") {
        localStorage.setItem("dark-mode", "false");
    }
    else {
        localStorage.setItem("dark-mode", "true");
    }
    checkLightDark();
}

function checkLightDark () {
    const btn = document.querySelector("#light-dark-button");
    const link = document.querySelector("#light-dark");
    if (localStorage.getItem("dark-mode") === "true") {
        link.setAttribute("href", path + "dark.css");
         btn.innerText = "Light Mode";
    }
    else {
        link.setAttribute("href", path + "light.css");
        btn.innerText = "Dark Mode";
    }

}

