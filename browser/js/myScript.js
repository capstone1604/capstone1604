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
