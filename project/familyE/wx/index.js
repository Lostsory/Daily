const ResponsiblePerson = require('../models/ResponsiblePerson');
const config = require('../config');
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 9100 });
const jwt = require('jsonwebtoken');

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

let cons = []
wss.on('connection', function connection(ws, req) {
  ws.send("当时在线人数为"+cons.length+1)

  const token = req.url.substr(2).split('=')[1];
  if (token) {   // token存在的话执行
    jwt.verify(token, config.secret, function (err, decoded) {
      ResponsiblePerson.findById(decoded).then((info) => {
        cons.push({...ws, citycode: info.citycode})
      })
    })
  }
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  })
  process.on('message', (data) => {
    cons.forEach((item) => {
      const {token, citycode} = item
      if (token && data.citycode == citycode) {
        ws.send(data)
      }
    })
  })
});
