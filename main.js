Tail = require('tail').Tail;
var parser = require("./parser.js");


// const express = require('express');
// const app = express();

// app.get('/', function (req, res) {
//     res.send('Hello World!')
// })


// console.log("   _____      _____ ___    _____                 ");
// console.log(" / ____|    |  __ \__ \  |  __ \                ");
// console.log(" | |     ___ | |  | | ) | | |__) |___ ___  _ __  ");
// console.log(" | |    / _ \| |  | |/ /  |  _  // __/ _ \| '_ \ ");
// console.log(" | |___| (_) | |__| / /_  | | \ \ (_| (_) | | | |");
// console.log("  \_____\___/|_____/____| |_|  \_\___\___/|_| |_|");
// console.log("                                                 ");
// console.log("                                                 ");

function clientJoined(action) {
    // save data to redis (if the client isn't already present)
    console.log("Client " + action.name + " with id " + action.id + " just joined");
};

function parseNewContent(data) {
    console.log("[Parse new content]");

    // kill
    // 776:47 K;185269;7;allies;^2|OCG|^1UnDead;186276;8;axis;^2|OCG|^9CerealKilla;mp40_mp;135;MOD_HEAD_SHOT;head

    // join
    // 592:07 J;185269;5;^2|OCG|^1UnDead

    var parsedObj = parser.parse(data);
    
    if (parsedObj.type == 'J') {
        clientJoined(parsedObj);
    }/* else if (parsedObj.type == 'K') {
        clientKill(parsedObj);
    } else if (parsedObj.type == 'D') {
        clientDeath(parsedObj);
    } else if (parsedObj.type == 'Q') {
        clientQuit(parsedObj);
    }*/
};




// TODO pass log file via env
var tail = new Tail("game.log");


/** for the startup we go straight to the end of the file and read new data */
tail.on("line", (data) => {
    parseNewContent(data);
});

tail.on("error", function(error) {
    console.log('ERROR: ', error);
});



// TODO later on for rcon commands
// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!')
// })
