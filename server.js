const parties = new Set();
const solos = new Set();
let countQuestion = -5;
const fs = require("fs");

function connection() {
    const WebSocket = require("ws");
    const server = new WebSocket.Server({ port: 2027 });

    console.log("Server ON");

    server.on("connection", client => {
        client.send("connected");

        client.on("message", data => {
            checkTask(data, client);
        })

        client.on("close", reason => {
            if (solos.has(client)) {
                solos.delete(client);
                console.log("left");
            }
            else {
                for (let party of parties) {
                    if (party.has(client)) {
                        party.delete(client);
                        console.log("left");
                    }
                }
            }
        })
    })
}

function checkTask(data, playerId) {

    if (data == "solo") {
        console.log("solo");
        solos.add(playerId);
    }
    else if (data == "multi") {
        console.log("Mulitplayer");
    }
    else if (!isNaN(data)) {
        addPlayer(data, playerId);
    }
    // data = create teamId
    else if (data.split(" ")[0] == "create") {
        console.log("New party created");
        let party = new Set([data.split(" ")[1]]);
        parties.add(party);
        party.add(playerId);
    }
    else if (data == "question") {
        if (solos.has(playerId)) {
            //send question to a solo
            sendQuestionSolo(playerId);
        }
        else {
            for (let party of parties) {
                if (party.has(playerId))
                    sendQuestionTeam(party);
            }
        }
    }
}

function addPlayer(partyId, clientId) {
    for (let party of parties) {
        if (party.has(partyId)) {
            party.add(clientId);
            sendMessage(party, "A player added")
            break;
        }
        else {
            clientId.send("party doesn't exist!");
        }
    }
}

function sendMessage(party, message) {
    for (let player of party) {
        if (isNaN(player))
            player.send(message);
    }
}

function sendQuestionSolo(playerId) {

    for (let i = 0; i < 5; i++) {
        fs.readFile("TriviaQuest.txt", "utf-8", (err, data) => {
            if (err) console.log("Error: " + err);
            else {
                playerId.send(data.split("\n")[i + countQuestion]);
            }
        })
    }
    countQuestion += 5;
}

function sendQuestionTeam(teamId) {
    for (let i = 0; i < 5; i++) {
        fs.readFile("TriviaQuest.txt", "utf-8", (err, data) => {
            if (err) console.log("Error: " + err);
            else {
                let dataToSend = data.split("\n")[i + countQuestion];
                sendMessage(teamId, dataToSend);
            }
        })
    }
    countQuestion += 5;
}

connection()