
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

        if (document.querySelector(".tags").checked) {
            if (searchVal.split(" ").every(elem => (data[i][`${active_ed}tags`].includes(elem)))) {
                createCard(i);
            }
        }
        else {
            if ((data[i]["character"].toLowerCase().includes(searchVal)) || (data[i]["series"].toLowerCase().includes(searchVal)) || (data[i]["date"].toLowerCase().includes(searchVal))) {
                createCard(i);
            }
        }
    }
}

function change_ed() {
    document.querySelector(".active").classList.remove("active")
    this.classList.add("active")
    active_ed = this.value
    if (document.querySelector(".card")) {
        search()
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
    workingCard.querySelector(".img2").src= data[i]["link"].replace("%", active_ed);
    if (data[i]["link"].includes("versioned")) {
        workingCard.querySelector(".img1").src= data[i]["link"].replace("%-1", active_ed).replace("/versioned", "");
        workingCard.querySelector(".img3").src= data[i]["link"].replace("%-1", active_ed+ "-2");
    }
    else {
        workingCard.querySelector(".img1").remove();
        workingCard.querySelector(".img3").remove();
    }
    workingCard.querySelector(".name").innerText = data[i]["character"];
    workingCard.querySelector(".series").innerText = data[i]["series"];
    workingCard.querySelector(".date").innerText = data[i]["date"];

    document.querySelector(".card_container").append(workingCard);
}


