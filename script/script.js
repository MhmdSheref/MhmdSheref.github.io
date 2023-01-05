
addEventListener("load", checkLightDark)

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
    let btn = document.querySelector("#light-dark-button");
    let link = document.querySelector("#light-dark");
    if (localStorage.getItem("dark-mode") === "true") {
        link.setAttribute("href", "assets/style/dark.css");
         btn.innerText = "Light Mode";
    }
    else {
        link.setAttribute("href", "assets/style/light.css");
        btn.innerText = "Dark Mode";
    }

}

