function init () {
	ctx = document.getElementById('myCanvas').getContext('2d');
	return setInterval(draw, 10);
}

function clear () {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function makeRect (x, y, width, height) {
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.closePath();
	ctx.fill();
}

function makeCircle (x, y, radius) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
}

function makePaddle () {
	paddlex = canvasWidth / 4;
	paddleh = 10;
	paddlew = 75;
}