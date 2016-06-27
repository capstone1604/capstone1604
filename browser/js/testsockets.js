$('#donebtn').on('click', function () {
  var manData = {
    name: 'Hugh Ass',
    w: 0,
    h: 0
  }
  socket.emit('respawn', manData);
  
});
var loops = 0;
var gameStart;
var socket = io.connect('http://localhost:3030');

function gameLoop () {
  loops += 1;
  if (loops > 10) {
    socket.emit('forceDisconnect');
    console.log('you have been disconnected');
    clearInterval(gameStart);
  } else {
    socket.on('gameUpdate', function (data) {
      console.log('gameData', data);
    });
  }
}

socket.on('otherPlayer', function (data) {
  console.log(data + ' has connected!');
});

socket.on('otherPlayerDC', function (data) {
  console.log(data);
});

socket.on('gameReady', function (data) {
  gameStart = setInterval(function () {
    gameLoop();
  }, 1000);
});

