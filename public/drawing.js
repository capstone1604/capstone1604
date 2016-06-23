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

// // All styles set on a group are automatically
// // set on the children of the group:
// group.style = {
//     strokeColor: 'black',
    // dashArray: [4, 10],
    // strokeWidth: 4,
    // strokeCap: 'round'
// };

// group.position.x += 300;

var newPath;
var paths = [];
var figure;
var destination;
var figureSelected = false;

function onMouseDown(event) {
	// if (newPath) {
	// 	newPath.selected = false;
	// }
	if (paths.length < 4) {
		newPath = new Path();
		newPath.strokeColor = "black";
		newPath.strokeWidth = 6;
		newPath.strokeJoin = 'miter';
	} else {
		destination = event.point;
	}
}

function onMouseDrag(event) {
	if (paths.length < 4) {
		newPath.add(event.point);
	} else {
		return;
	}
}

function onMouseUp (event) {
	if (paths.length < 4) {
		newPath.smooth();
		newPath.strokeColor = "black";
		paths.push(newPath);
		console.log(paths);

		if (paths.length === 4) {
			figure = new Group(paths);
			figure.strokeColor = {
				hue: Math.random() * 360,
				saturation: 1,
				brightness: 1
			};
			destination = figure.position;
			figure.onClick = function () {
				figure.strokeColor = "green";
				figureSelected = true;

			}
			console.log(figure);
		}
	} else {
		return;
	}

	// newPath.selected = true;
	// var myCircle = new Path.Circle({
	// 	center: event.point,
	// 	radius: 10
	// });
	// myCircle.strokeColor = 'black';
	// myCircle.fillColor = 'white';
}



function onFrame (event) {
	if (typeof figure === 'object' && figureSelected === true) {
		var vector = destination - figure.position;
		figure.position += vector / 30;
		if (figure.position === destination) {
			figureSelected = false;
			figure.strokeColor = {
				hue: Math.random() * 360,
				saturation: 1,
				brightness: 1
			}
		}
	}

}

