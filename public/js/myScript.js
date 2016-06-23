

//// the triangle
//var myPath = new Path();
//myPath.strokeColor = 'black';
//myPath.add(new Point(40, 90));
//myPath.add(new Point(90, 40));
//myPath.add(new Point(140, 90));
//
//myPath.closed = true;
//
//// circle
//var myCircle = new Path.Circle(new Point(100, 70), 50);
//myCircle.strokeColor = 'black';
//myCircle.selected = true;
//
//myCircle.removeSegment(1);
//
//var myPath;
//
//function onMouseDown(event) {
//  myPath = new Path();
//  myPath.strokeColor = 'black';
//}
//
//function onMouseDrag(event) {
//  myPath.add(event.point);
//}
//
//function onMouseUp(event) {
//  var myCircle = new Path.Circle({
//    center: event.point,
//    radius: 10
//  });
//  myCircle.strokeColor = 'black';
//  myCircle.fillColor = 'white';
//}


//var path = new Path();
// Give the stroke a color
//path.strokeColor = 'black';
//var start = new Point(100, 100);
// Move to start and draw a line from there
//path.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
//path.lineTo(start + [ 100, -50 ]);

//console.log("I work");

var path1 = new Path.Circle({
  center: [100, 50],
  radius: 30
});

path1.style.strokeColor = "black";

var path2 = new Path.Rectangle({
  from: [170, 20],
  to: [230, 80]
});

var group = new Group(path1, path2);

function StickFigure(figure){
  this.health = 40;
  this.attack = 8;
  this.currentlySelected = false;
  this.representation = figure;
}

var newFigure = {
  limb: undefined,
  limbs: [],
}

var stickFiguresOnCanvas = [];

var figure;
var destination;
var drawButtonSelected = false;

$("#draw-stick-figure-button").click(function(){
  $(this).toggleClass("selected");
  drawButtonSelected = !drawButtonSelected;
  console.log("draw button selected: ", drawButtonSelected);
})

  function onMouseDown (event) {
    if (drawButtonSelected) {
      if (newFigure.limbs.length < 4) {
        newFigure.limb = new Path();
        newFigure.limb.strokeColor = "black";
        newFigure.limb.strokeWidth = 6;
        newFigure.limb.strokeJoin = 'miter';
      } else {
        destination = event.point;
      }
    }
  }

  function onMouseDrag (event) {
    if (drawButtonSelected) {
      if (newFigure.limbs.length < 4) {
        newFigure.limb.add(event.point);
      } else {
        return;
      }
    }
  }

  function onMouseUp (event) {
    if (drawButtonSelected) {
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
            figure.currentlySelected = true;
          }
          stickFiguresOnCanvas.push(figure);
          console.log(figure);
          //reset the new figure object
          newFigure = {
            limb: undefined,
            limbs: [],
          }
        }
      } else {
        return;
      }
    }
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
