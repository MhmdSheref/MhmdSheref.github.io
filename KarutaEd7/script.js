
const card = document.querySelector(".card");
let active_ed = "7";
document.querySelector(".search_button").addEventListener("click", search);
document.querySelector(".search_bar").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {search()}
});
for (const element of document.querySelectorAll(".ed_button")) {
    element.addEventListener("click", change_ed);
}

function search() {

    removeAllChildNodes(document.querySelector(".card_container"))
    let searchVal = document.querySelector(".search_bar").value.toLowerCase()
    for (let i = 0; i < data.length; i++) {
        if ((data[i]["character"].toLowerCase().includes(searchVal)) || (data[i]["series"].toLowerCase().includes(searchVal)) || (data[i]["date"].toLowerCase().includes(searchVal))) {
            createCard(i);
        }
        if (document.querySelector(".tags").checked) {
            if (data[i]["tags"].includes(searchVal))
            createCard(i);
        }
    }
}

function change_ed() {
    document.querySelector(".active").classList.remove("active")
    this.classList.add("active")
    active_ed = this.value
    for (const workingCard of document.querySelectorAll(".card")) {
        const i = parseInt(workingCard.querySelector(".index").innerText)
        workingCard.querySelector(".img1").src= data[i]["link"].replace("%", active_ed);
    }

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createCard(i) {

    let workingCard = card.cloneNode(true)
    workingCard.style.display = "grid"
    workingCard.querySelector(".index").innerText = i;
    workingCard.querySelector(".img1").src= data[i]["link"].replace("%", active_ed);
    workingCard.querySelector(".name").innerText = data[i]["character"];
    workingCard.querySelector(".series").innerText = data[i]["series"];
    workingCard.querySelector(".date").innerText = data[i]["date"];

    document.querySelector(".card_container").append(workingCard);
}


