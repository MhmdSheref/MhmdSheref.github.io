
card = document.querySelector(".card");
document.body.append(card.cloneNode(true));

document.querySelector(".search_button").addEventListener("click", search)

function search() {
    console.log("a")
    removeAllChildNodes(document.querySelector(".card_container"))
    let searchVal = document.querySelector(".search_bar").value.toLowerCase()
    console.log(searchVal)
    for (let i = 0; i < data.length; i++) {
        if ((data[i]["character"].toLowerCase().includes(searchVal)) || (data[i]["series"].toLowerCase().includes(searchVal))) {
            createCard(i)
        }
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
    workingCard.querySelector(".img1").src= data[i]["link1"].replace("%", "7");
    workingCard.querySelector(".img2").src= data[i]["link2"].replace("%", "7");
    workingCard.querySelector(".name").innerText = data[i]["character"];
    workingCard.querySelector(".series").innerText = data[i]["series"];

    document.querySelector(".card_container").append(workingCard);
}


