function showIntersections() {
  currentlySelectedFigures = [];
  
  stickFiguresOnCanvas.forEach(function(figure){
    if ( newSelection.intersects(figure.representation) || newSelection.contains(figure.representation) || newSelection.bounds.contains(figure.representation)  ) {
      //needs fixin'

      //figure.representation.contains(newSelection)
      figure.currentlySelected = true;
      currentlySelectedFigures.push(figure);
      console.log(currentlySelectedFigures);
    } else {
      figure.currentlySelected = false;
    }
  })
}