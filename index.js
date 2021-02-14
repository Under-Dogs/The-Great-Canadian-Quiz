const ws = new WebSocket("ws://localhost:2027/");
ws.addEventListener("message", data => {
    console.log(data.data);
})

function solo() {
    window.open("test.html", "_self");
}

function createGroup() {
    //window.open("a question window that will ask for group id", "_self");
    let id = document.getElementById("groupId").value;
    ws.send("create " + id);
}

function joinGroup() {
    window.open("questions page/add_question.html", "_self");
}
