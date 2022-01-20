const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const moment = require('moment');
//SocketIO
const socketIo = require("socket.io");
const io = socketIo(server);
app.use(express.static(path.join(__dirname,"src")));

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
    socket.on("chatting", (data) => {
        const {name, msg } = data;

        io.emit("chatting", {
            name: name,
            msg: msg,
            time: moment(new Date()).format("h:mm A")
        });
    })
})
server.listen(PORT, () => console.log(`Server is Running ${PORT}`));
