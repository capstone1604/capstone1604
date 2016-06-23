// --------------------- path1 and path2 are created only to test the showIntersections function -----------------------

var path1 = new Path.Circle({
  center: [100, 50],
  radius: 30
});

path1.style.strokeColor = "black";

path1.currentlySelected = false;
var figures = [];

var rectangle = new Rectangle(new Point(50, 50), new Point(150, 100));
var path2 = new Path.Rectangle(rectangle);
path2.fillColor = '#e9e9ff';
path2.currentlySelected = false;

figures.push(path1);
figures.push(path2);

var pathGroup = new Group(figures);

// --------------------- path1 and path2 are created only to test the showIntersections function -----------------------

var selected = [];

var from;
var to;
var rectangle = new Shape.Rectangle()

function onMouseDown(event) {
	rectangle.fillColor = undefined;
	selected = [];
	from = event.point;
}

function onMouseDrag(event) {
	to = event.point;
  	rectangle.fillColor = undefined;
  	rectangle = new Shape.Rectangle(from, to);
  	rectangle.fillColor = '#e9e9ff';
}

function onMouseUp(event) {
 	showIntersections();
	console.log(selected);
}

function showIntersections() {
	if (rectangle.intersects(pathGroup) || rectangle.contains(pathGroup) || pathGroup.contains(rectangle)){
		selected.push(pathGroup);
	}

	//the below would be used in case we want to check intersections with paths instead of groups:
	// figures.forEach(function(figure){
	// 	if (rectangle.intersects(figure)){
	// 		figure.currentlySelected = true;
	// 		selected.push(figure);
	// 	}
	// })
}
