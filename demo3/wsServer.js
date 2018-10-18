var ws = require("nodejs-websocket")

var PORT = 3000;
var clientCount = 0;
var server = ws.createServer(function (conn) {
    console.log("New connection");
    clientCount++;
    conn.nickname = 'user'+clientCount;
    var msg = {};
    msg.type="enter";
    msg.data = conn.nickname + 'comes in'
    broadcast(JSON.stringify(msg));
    conn.on("text", function (str) {
        console.log("Received "+str)
        var msg = {};
        msg.type="message";
        msg.data = conn.nickname+":  "+str
        broadcast(JSON.stringify(msg));
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        var msg = {};
        msg.type="leave";
        msg.data = conn.nickname + 'left'
        broadcast(JSON.stringify(msg));

    })
    conn.on("error",function(err){
        console.log(err)
    })
}).listen(PORT)

console.log('websocket listenning on PORT' + PORT);

function broadcast(str){
    server.connections.forEach(function(connection){
        connection.sendText(str)
    })
}