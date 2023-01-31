//Code for login form

let form = document.forms[0];

form.addEventListener("submit", saveToLocal);

let changeForm = document.forms[1];

changeForm.addEventListener("submit", changeLocal);

if (localStorage.getItem("username")) {
    username= localStorage.getItem("username");
    dob= localStorage.getItem("dob");
    theme= localStorage.getItem("theme");
} else {
    //only prompt for login when there is not any data stored
    document.querySelector(".form-container").style.display= "block";
}

form.theme.addEventListener("change" , function () {
    //preview image when selecting theme
    form.querySelector("img").src = `assets/images/${form.theme.value}-preview.png`;
});

function saveToLocal () {
    localStorage.setItem("username", form.username.value);
    localStorage.setItem("dob", form.dob.value);
    localStorage.setItem("theme", form.theme.value);
}

function changeLocal () {
    if (changeForm.changeUsername.value) {localStorage.setItem("username", changeForm.changeUsername.value);}
    if (changeForm.changeDob.value) {localStorage.setItem("dob", changeForm.changeDob.value);}
    if (changeForm.changeTheme.value) {localStorage.setItem("theme", changeForm.changeTheme.value);}
}

// =========================================================================== //
//code for calculator
let textBox = document.querySelector("#math-exp");
let ansBox = document.querySelector("#math-ans");
let score = 0;
function checkAns() {
    let mathExp = textBox.value;
    let mathAns = ansBox.value;
    let mathExpAns;

    if (mathExp.slice(-1) === "=") {
        //this is an equation
        mathExpAns = mathExp + "==" + mathAns;
    } else if (mathExp.includes(">") || mathExp.includes("<")) {
        //this is an inequality
        mathExpAns = mathExp;
    } else {
        return;
    }
    try {
        if (eval(mathExpAns)){
            //correct answer
            textBox.value = "Great Job!";
            score++;
            document.querySelector("#score-text").innerText = score;
        } else {
            //wrong answer
            textBox.value = "Try Again! :(";
        }
    } catch  {
        textBox.value = "Format Error"
    }

    setTimeout(clearTxt, 1000);
}
function clearTxt() {
    textBox.value = "";
    ansBox.value = "";
}

function addToTextBox (pressedBtn) {
    let selected = textBox;
    let maxChar = 12;

    if (textBox.value.slice(-1) === "=") {
        selected = ansBox;
        maxChar = 4;
    }

    if (selected.value.length < maxChar) {
        selected.value += pressedBtn.innerText;
    }
}

// =========================================================================== //
//code for themes

document.body.className = theme;

// =========================================================================== //
//code for info bar

document.querySelector("#name-text").innerText = username;
document.querySelector("#age-text").innerText = calcAge(dob);
function calcAge (date) {
    let birthDate = new Date(date);
    let currentDate = new Date();
    return Math.floor((currentDate - birthDate) / 31556952000);
}