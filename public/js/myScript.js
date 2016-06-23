function StickFigure(figure){
  this.health = 40;
  this.attack = 8;
  this.representation = figure;
}

var newFigure = {
  limb: undefined,
  limbs: [],
}

var stickFiguresOnCanvas = [];
var currentlySelectedFigures = [];

var drawing = false;
var figure;
var destination;
var initialSelectPoint;
var newSelection;


$("#draw-stick-figure-button").click(function(){
  $(this).toggleClass("selected");
  drawing = !drawing;
  console.log("drawing? : ", drawing);
})

function onKeyDown(event) {
  $("#draw-stick-figure-button").toggleClass("selected");
  if (event.key === 'd') {
    if (drawing === true) {
      //
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
        var figure = new StickFigure(drawnFigure);
        figure.representation.strokeColor = {
          hue: Math.random() * 360,
          saturation: 1,
          brightness: 1
        };
        destination = figure.representation.position;
        figure.onClick = function () {
          figure.representation.strokeColor = "green";
        }
        stickFiguresOnCanvas.push(figure);
        console.log(figure);
        //reset the new figure object
        newFigure = {
          limb: undefined,
          limbs: []
        }
      }
    } 
  } else if (newSelection) {
    currentlySelectedFigures = [];
    showIntersections();
    newSelection.remove();
  }
} 

function showIntersections() {
  stickFiguresOnCanvas.forEach(function(figure){
    if ( newSelection.intersects(figure.representation) || newSelection.contains(figure.representation) || newSelection.bounds.contains(figure.representation)  ) {
      //needs fixin'

      //figure.representation.contains(newSelection)
      currentlySelectedFigures.push(figure);
      console.log(currentlySelectedFigures);
    }
  })
}

// function onFrame (event) {
//     var vector = destination - figure.position;
//     figure.position += vector / 30;
//     if (figure.position === destination) {
//       figureSelected = false;
//       figure.strokeColor = {
//         hue: Math.random() * 360,
//         saturation: 1,
//         brightness: 1
//       }
//     }
// }
