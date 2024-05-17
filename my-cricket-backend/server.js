const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, { cors: { origin: '*' } });
const Player = require('./db');
var cors = require('cors')
app.use(cors())

score = 0
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/', async(req, res) => {
  score = req.body.score;
  const { name, country } = req.body;

  try {
    const player = new Player({ name, country, score });
    await player.save();
    io.sockets.emit("get_scoredata", player);
    res.send('Data Received: ' + JSON.stringify(req.body));

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
  
})
io.on('connection', (socket) => {

  
  socket.on("getscore", () => {
      io.sockets.emit("get_scoredata", {name:'',country:'',score:''});
  });

  socket.on('disconnect', () => {
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});