function findBodyParts(stickfigure, event){
	var figure = stickfigure.representation;
	var bottomLeft = figure._bounds.getBounds.bottomLeft;
	var bottomRight = figure._bounds.getBounds.bottomRight;
	var lowestSegment;
	var lowestSegment2;
	var leftLeg;
	var rightLeg;
	var leftArm;
	var rightArm;

	figure.children.forEach(function(child){
		for (var i = 0; i < child.segments.length; i++){
			if (!lowestSegment){
				lowestSegment = child.segments[i];
			}
			else if (lowestSegment._point.y < child.segments[i]._point.y){
				lowestSegment = child.segments[i];
			}
		}
	})

	//the below forEach finds the second lowest segment in order to find the other leg
	//the below assumes the user will draw the two legs with two different lines/paths
	//there's gotta be a way to do the below on the previous forEach...
	figure.children.forEach(function(child){
		if (child !== lowestSegment.path){
			for (var i = 0; i < child.segments.length; i++){
				if (!lowestSegment2){
					lowestSegment2 = child.segments[i];
				}
				else if (lowestSegment2._point.y < child.segments[i]._point.y){
					lowestSegment2 = child.segments[i];
				}
			}
		}
		if (child._bounds.getBounds.bottomLeft._x === bottomLeft._x){
			leftArm = child;
		}
		if (child._bounds.getBounds.bottomRight._x === bottomRight._x){
			rightArm = child;
		}
	})

	//the below assumes the legs will be separate lines/paths
	if (lowestSegment._point.x > lowestSegment2._point.x){
		leftLeg = lowestSegment2.path;
		rightLeg = lowestSegment.path;
	}
	else {
		leftLeg = lowestSegment.path;
		rightLeg = lowestSegment2.path;	
	}

	leftLeg.strokeColor = "blue";
	rightLeg.strokeColor = "red";
	leftArm.strokeColor = "black";
	rightArm.strokeColor = "orange";

	stickfigure.leftLeg = leftLeg;
	stickfigure.rightLeg = rightLeg;
	stickfigure.leftArm = leftArm;
	stickfigure.rightArm = rightArm;
	// walk(stickfigure, event);
}

// function walk(stickfigure, event){
// 	var rightLeg = stickfigure.rightLeg;

// }

var stickFiguresOnCanvas = [];
var currentlySelectedFigures = [];

var drawing = false;
var figure;
var destination;
var initialSelectPoint;
var newSelection;

var newFigure = {
  limbs: [],
  limb: undefined
}

$("#draw-stick-figure-button").click(function(){
  $(this).toggleClass("selected");
  drawing = !drawing;
  console.log("drawing? : ", drawing);
})

function finishDrawing (){
  drawnFigure = new Group(newFigure.limbs);
  var newFigureColor = {
    hue: Math.random() * 360,
    saturation: 1,
    brightness: 1
  };
  var figure = new StickFigure(drawnFigure, newFigureColor);
  figure.representation.strokeColor = newFigureColor;
  stickFiguresOnCanvas.push(figure);
  newFigure = {
    limb: undefined,
    limbs: []
  }
  $("#draw-stick-figure-button").removeClass("selected");
  drawing = false;
}

function cancelDrawing (){
  for (var i = 0; i < newFigure.limbs.length; i++) {
    newFigure.limbs[i].remove();
  }
  newFigure.limbs = [];
  $("#draw-stick-figure-button").removeClass("selected");
}

function onKeyDown(event) {
  if (event.key === 'd' && newFigure.limbs.length > 0) {
    finishDrawing();
  }
  else if (event.key === 'd' && newFigure.limbs.length === 0){
    $("#draw-stick-figure-button").toggleClass("selected");
    drawing = !drawing;
  }
  else if (event.key === 'c' && drawing){
    cancelDrawing();
    drawing = !drawing;
  }
}

function onMouseDown (event) {
  if (event.event.button === 0 && drawing){
    newFigure.limb = new Path();
    newFigure.limb.strokeColor = "black";
    newFigure.limb.strokeJoin = 'miter';
    newFigure.limb.strokeWidth = 6;
  }
  else if (event.event.button === 0 && !drawing){
    initialSelectPoint = event.point;
    newSelection = new Shape.Rectangle(event.point, event.point);
  }
  else if (event.event.button === 2){
    initialSelectPoint = undefined;
    event.preventDefault(); //maybe not necessary
    currentlySelectedFigures.forEach(function(figure){
      figure.destination = event.point;
    })
  }
}

function onMouseDrag (event) {
  if (drawing && event.event.button !== 2) {
    newFigure.limb.add(event.point);
  } 
  else if (event.event.button !== 2 && initialSelectPoint){
    if (newSelection) {
      newSelection.remove();
    }
    newFigure.limb = null;
    newSelection = new Shape.Rectangle(initialSelectPoint, event.point);
    newSelection.fillColor = 'rgb(233, 233, 255, 0.5)';
  }
}

function onMouseUp (event) {
  if (drawing) {
    newFigure.limb.smooth();
    newFigure.limb.strokeColor = "black";
    newFigure.limbs.push(newFigure.limb);
  } else if (newSelection && event.event.button === 0) {
    showIntersections();
    newSelection.remove();
  }
}

function onFrame (event) {
  var movingFigures = currentlySelectedFigures;
  movingFigures.forEach(function(figure){
    var vector = figure.destination - figure.representation.position;
    findBodyParts(figure, event);
    // walk(figure, event);
    figure.representation.position += vector / 80;
  })
}

function showIntersections() {
  currentlySelectedFigures = [];
  
  stickFiguresOnCanvas.forEach(function(figure){
    if ( newSelection.intersects(figure.representation) || newSelection.bounds.contains(figure.representation.children[0].interiorPoint) || newSelection.bounds.contains(figure.representation) ) {
      //needs fixin'

      //figure.representation.contains(newSelection)
      figure.currentlySelected = true;
      currentlySelectedFigures.push(figure);
      figure.representation.strokeColor = "green";
    } else {
      figure.currentlySelected = false;
      figure.representation.strokeColor = figure.color;
    }
  })
  console.log(currentlySelectedFigures);
}

// figure.onClick = function () {
//   figure.representation.strokeColor = "green";
// }
function StickFigure(figure, color){
	this.health = 40;
	this.attack = 8;
	this.representation = figure;
	this.currentlySelected = false;
	this.color = color;
	this.destination = this.representation.position;
  	
  	figure.leftLeg;
	figure.rightLeg;
	figure.leftArm;
	figure.rightArm;
}

// StickFigure.prototype.onClick = function(){
// 	if (this.representation.)
// 	this.representation.strokeColor = "green";
// }

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

