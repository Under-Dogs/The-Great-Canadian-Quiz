
//window.alert("Bitch");
const ws = new WebSocket("ws://localhost:2027");

ws.addEventListener("message", message => {
    checkMessage(message.data);
})

ws.addEventListener("open", () => {
    ws.send("solo");
    ws.send("question");
})

var answer = " ";
var score = 0;

function checkMessage(message) {
    let id = message.split(":")[0];
    let content = message.split(":")[1];

    if (id == "Q")
        document.getElementById("question").value = content;
    else if (id == "A") {
        answer = content;
        upload(answer);
    }
    else if (id == "0")
        upload(content);
}

function upload(content) {
    if (!document.getElementById("opt1").value)
        document.getElementById("opt1").value = content;
    else if (!document.getElementById("opt2").value)
        document.getElementById("opt2").value = content;
    else if (!document.getElementById("opt3").value)
        document.getElementById("opt3").value = content;
    else if (!document.getElementById("opt4").value)
        document.getElementById("opt4").value = content;
}
var selectedAnswer = " ";

function onCheck(buttonId) {
    let optId = "";
    if (buttonId == "checkButton1")
        optId = "opt1";
    else if (buttonId == "checkButton2")
        optId = "opt2";
    else if (buttonId == "checkButton3")
        optId = "opt3";
    else if (buttonId == "checkButton4")
        optId = "opt4";
    selectedAnswer = document.getElementById(optId).value;
}

function next() {
    if (selectedAnswer == answer)
        score += 10;
    answer = " ";
    selectedAnswer = "";

    document.getElementById("question").value = "";
    document.getElementById("opt1").value = "";
    document.getElementById("opt2").value = "";
    document.getElementById("opt3").value = "";
    document.getElementById("opt4").value = "";

    ws.send("question");
}

function showScore() {
    window.alert(score);
}