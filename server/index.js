var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(require('./static.routing'));

var gameConfig = require('./../config.json');

var quadtree = require('simple-quadtree');
var tree = quadtree(0, 0, gameConfig.width, gameConfig.height);

var men = [];
var sockets = {};

function addMan (manToAdd) {
	men.push(manToAdd);
	tree.put(manToAdd);
}

function removeMan (manToRemove) {
	var removeIndex = men.indexOf(manToRemove);
	men.splice(removeIndex, 1);
	tree.remove(manToRemove);
}

function moveLoop () {
	for (var i = 0; i < men.length; i++) {
		trackMan(men[i]);
	}
}

function trackMan (man) {
	moveMan(man);

	tree.clear();
	men.forEach(tree.put);
}

function moveMan (man) {

}







app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../', 'public/index.html'));
});

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});
