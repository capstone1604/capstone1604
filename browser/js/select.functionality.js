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