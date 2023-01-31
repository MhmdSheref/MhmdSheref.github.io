
let path = "assets/style/"
const btn = document.querySelector("#light-dark-button");
const link = document.querySelector("#light-dark");
if (/\/blogs\//.test(document.location.pathname)) {
    path = "../assets/style/"
}
checkLightDark()

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
    if (localStorage.getItem("dark-mode") === "true") {
        link.setAttribute("href", path + "dark.css");
         btn.innerText = "Light Mode";
    }
    else {
        link.setAttribute("href", path + "light.css");
        btn.innerText = "Dark Mode";
    }
}


let previousScrollY = scrollY;
let header = document.querySelector("header")
let hamMenu = document.querySelector("#ham-menu-hidden")
addEventListener("scroll", function () {
    if (previousScrollY < scrollY) {
        //hide
        header.style.top = "-60px"
        previousScrollY = scrollY
        hamMenu.checked = false;


    } else {
        //show
        header.style.top = "0"
        previousScrollY = scrollY
    }
})

