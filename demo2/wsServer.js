var ws = require("nodejs-websocket")

var PORT = 3000;
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str)
        conn.sendText(str)
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn.on("error",function(err){
        console.log(err)
    })
}).listen(PORT)

console.log('websocket listenning on PORT' + PORT);