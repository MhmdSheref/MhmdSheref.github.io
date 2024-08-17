
const card = document.querySelector(".card");
let active_ed = "7";
document.querySelector(".search_button").addEventListener("click", search);
for (const element of document.querySelectorAll(".ed_button")) {
    element.addEventListener("click", change_ed);

}


function search() {
    console.log("a")
    removeAllChildNodes(document.querySelector(".card_container"))
    let searchVal = document.querySelector(".search_bar").value.toLowerCase()
    console.log(searchVal)
    for (let i = 0; i < data.length; i++) {
        if ((data[i]["character"].toLowerCase().includes(searchVal)) || (data[i]["series"].toLowerCase().includes(searchVal)) || (data[i]["date"].toLowerCase().includes(searchVal))) {
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
        workingCard.querySelector(".img1").src= data[i]["link1"].replace("%", active_ed);
        workingCard.querySelector(".img2").src= data[i]["link2"].replace("%", active_ed);
        workingCard.querySelector(".img3").src= data[i]["link3"].replace("%", active_ed);
        workingCard.querySelector(".img4").src= data[i]["link4"].replace("%", active_ed);
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
    workingCard.querySelector(".img1").src= data[i]["link1"].replace("%", active_ed);
    workingCard.querySelector(".img2").src= data[i]["link2"].replace("%", active_ed);
    workingCard.querySelector(".img3").src= data[i]["link3"].replace("%", active_ed);
    workingCard.querySelector(".img4").src= data[i]["link4"].replace("%", active_ed);
    workingCard.querySelector(".name").innerText = data[i]["character"];
    workingCard.querySelector(".series").innerText = data[i]["series"];
    workingCard.querySelector(".date").innerText = data[i]["date"];

    document.querySelector(".card_container").append(workingCard);
}


