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