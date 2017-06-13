var canvasObj = document.getElementById('draw');
canvasObj.width = document.body.clientWidth;
canvasObj.height = document.body.clientHeight;

canvasObj.addEventListener('touchmove', function(e){
	e.preventDefault();
	var x = e.touches[0].pageX;
	var y = e.touches[0].pageY;
	var context = canvasObj.getContext('2d');
	context.fillStyle = 'black';
	context.beginPath();
	context.arc(x, y, 10, 0, Math.PI*2, true);
	context.fill();
	context.closePath();
}, false);