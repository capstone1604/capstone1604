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


	if (leftLeg) leftLeg.strokeColor = "blue";
	if (rightLeg) rightLeg.strokeColor = "red";
	if (leftArm) leftArm.strokeColor = "black";
	if (rightArm) rightArm.strokeColor = "orange";

	if (leftLeg) stickfigure.leftLeg = leftLeg;
	if (rightLeg) stickfigure.rightLeg = rightLeg;
	if (leftArm) stickfigure.leftArm = leftArm;
	if (rightArm) stickfigure.rightArm = rightArm;
	// walk(stickfigure, event);
	stickfigure.rightLeg.curveBy(0.5);
	stickfigure.leftLeg.split(Math.floor(stickfigure.leftLeg.curves.length/2), 0.5);
	// var test = CurveLocation(stickfigure.rightLeg.curves, 0.5);
	console.log("TEST: ", stickfigure.rightLeg.curves);


	//TEST FOR MOVEMENT -----------------------------------------------------------

	// for (var i = 0; i < points - 1; i++) {
	// 	var segment = path.segments[i];
	// 	var nextSegment = segment.next;
	// 	var vector = segment.point - nextSegment.point;
	// 	vector.length = length;
	// 	nextSegment.point = segment.point - vector;
	// }

	var lastSegment = rightLeg.segments[rightLeg.segments.length - 1];
		// var nextSegment = segment.next;
	var middleSegment = rightLeg.segments[Math.floor(rightLeg.segments.length/2)];
	// var vector = segment.point - nextSegment.point;
	middleSegment.point = new Point (100,100);
	// vector.length = length;
	// nextSegment.point = new Point (100,100);
	// path.smooth({ type: 'continuous' });
}