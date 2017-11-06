Tail = require('tail').Tail;
var parser = require("./parser.js");
var redis = require("redis");



// REDIS
//------

// setup redis connection
var client = redis.createClient();

client.on('connect', function() {
    console.log('Connected to Redis');
});



// const express = require('express');
// const app = express();

// app.get('/', function (req, res) {
//     res.send('Hello World!')
// })




function clientJoined(action) {
    // save data to redis (if the client isn't already present)
    console.log("Client " + action.name + " with id " + action.id + " just joined");

    // only valid guids are saved/worth saving
    if (action.guid > 0) {
        // save guid and name to redis
        client.set(action.guid, action.name);

//         client.keys('*', function (err, keys) {
//             if (err) {
//                 return console.log(err);
//             }
//
//             for(var i = 0, len = keys.length; i < len; i++) {
//                 console.log("key -> " + keys[i]);
//             }
//         });

        // notify the collector
        // TODO prepare json message and send via TCP socket
    }
};

function parseNewContent(data) {
    console.log("[Parse new content] - " + data);

    // kill
    // 776:47 K;185269;7;allies;^2|OCG|^1UnDead;186276;8;axis;^2|OCG|^9CerealKilla;mp40_mp;135;MOD_HEAD_SHOT;head

    // join
    // 592:07 J;185269;5;^2|OCG|^1UnDead
    // 580:58 J;705473;4;Sbiego
    // 603:31 J;929642;5;Tegamen

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
