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

function checkIfFigureValidAndRemoveIfNot(){
  var invalid = false;
  if (newFigure.limbs.length > 0) {
    invalid = true;
    for (var i = 0; i < newFigure.limbs.length; i++) {
      newFigure.limbs[i].remove();
    }
    newFigure.limbs = [];
  }
  //later, replace this with an error that the user can see
  if (invalid) console.log("invalid figure! deleting!");
  else console.log("valid figure!");
  
}

$("#draw-stick-figure-button").click(function(){
  $(this).toggleClass("selected");
  //remove figure from canvas if not valid -- only valid if made with 4 strokes
  if (drawing) {
    checkIfFigureValidAndRemoveIfNot();
  }
  drawing = !drawing;
  console.log("drawing? : ", drawing);
})

function onKeyDown(event) {
  $("#draw-stick-figure-button").toggleClass("selected");
  if (event.key === 'd') {
    if (drawing === true) {
      checkIfFigureValidAndRemoveIfNot();
      return drawing = false;
    } 
    drawing = !drawing;
  }
}

function onMouseDown (event) {
  if (drawing && newFigure.limbs.length < 4) {
      newFigure.limb = new Path();
      newFigure.limb.strokeColor = "black";
      newFigure.limb.strokeWidth = 6;
      newFigure.limb.strokeJoin = 'miter'; 
  } else {
    initialSelectPoint = event.point;
    newSelection = new Shape.Rectangle(event.point, event.point);
  }
}

function onMouseDrag (event) {
  if (drawing && newFigure.limbs.length < 4) {
    newFigure.limb.add(event.point);
  } else {
    newFigure.limb = null;
    if (newSelection) newSelection.remove();
    newSelection = new Shape.Rectangle(initialSelectPoint, event.point);
    newSelection.fillColor = 'rgb(233, 233, 255, 0.5)';
    newSelection.selected = true;
  }
}

function onMouseUp (event) {
  if (drawing) {
    if (newFigure.limbs.length < 4) {
      newFigure.limb.smooth();
      newFigure.limb.strokeColor = "black";
      newFigure.limbs.push(newFigure.limb);
      console.log("LIMB", newFigure.limb);
      console.log("LIMBS", newFigure.limbs);

      if (newFigure.limbs.length === 4) {
        drawnFigure = new Group(newFigure.limbs);
        var newFigureColor = {
          hue: Math.random() * 360,
          saturation: 1,
          brightness: 1
        };
        var figure = new StickFigure(drawnFigure, newFigureColor);

        figure.representation.strokeColor = newFigureColor;
        destination = figure.representation.position;
        stickFiguresOnCanvas.push(figure);
        //reset the new figure object
        newFigure = {
          limb: undefined,
          limbs: []
        }
        $("#draw-stick-figure-button").removeClass("selected");
        drawing = false;
      }
    } 
  } else if (newSelection) {
    showIntersections();
    newSelection.remove();
  }

}

function onFrame (event) {
    var vector = destination - newFigure.position;
    newFigure.position += vector / 30;
    if (newFigure.position === destination) {
      figureSelected = false;
      newFigure.strokeColor = {
        hue: Math.random() * 360,
        saturation: 1,
        brightness: 1
      }
    }
}
