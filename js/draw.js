
var style = 'free';
var x = 0;
var y = 0;
var ox = 0;
var oy = 0;
var flag = false;

//抓取畫布
var canvasSrc = document.getElementById('draw');
canvasSrc.width = document.body.clientWidth;
canvasSrc.height = document.body.clientHeight;
var contextSrc = canvasSrc.getContext('2d');

var container = canvasSrc.parentNode;//抓其父親節點

//製造臨時畫布<canvas id="temp"></canvas>
canvasTemp = document.createElement('canvas');
canvasTemp.id = 'temp';
//畫布寬高定成使用者裝置的
canvasTemp.width = canvasSrc.width;
canvasTemp.height = canvasSrc.height;
//在div下再加一個<canvas>
container.appendChild(canvasTemp);
//canvasTemp= document.getElementById('temp');
var contextTemp = canvasTemp.getContext('2d');

//---------------筆刷樣式---------------
function changeType(){
	if (document.getElementById('butt').checked)
	{
		contextTemp.lineCap = 'butt';
	}
	else if(document.getElementById('round').checked)
	{
		contextTemp.lineCap = 'round';
	}
	else 
	{
		contextTemp.lineCap = 'square';
	}
}

//---------------筆刷大小---------------
function changeSize(){
	if (document.getElementById('Fivepx').checked)
	{
		contextTemp.lineWidth = 5;
	}
	else if(document.getElementById('Tenpx').checked)
	{
		contextTemp.lineWidth =10;
	}
	else 
	{
		contextTemp.lineWidth = 15;
	}
}

//---------------顏色---------------
function changeColor(){
	if (document.getElementById('red').checked)
	{
		contextTemp.strokeStyle = 'red';
	}
	else if(document.getElementById('green').checked)
	{
		contextTemp.strokeStyle = 'green';
	}
	else 
	{
		contextTemp.strokeStyle = 'blue';
	}
}

//---------------幾何圖形---------------
function changeStyle()
{
	if (document.getElementById('line').checked)
	{
		style = 'line';
	}
	else if(document.getElementById('rect').checked)
	{
		style = 'rect';
	}
	else
	{
		style = 'free';
	}
}

function draw()
{
	contextSrc.drawImage(canvasTemp, 0, 0);
	contextTemp.clearRect(0, 0, canvasTemp.width, canvasTemp.height);
}

//觸發事件touchstart、touchmove、touchend
canvasTemp.addEventListener('touchstart', function(e){
	e.preventDefault();//原始觸發事件關閉
	changeType();
	changeSize();
	changeColor();
	changeStyle();
	flag = true;
	ox = e.touches[0].pageX;
	oy = e.touches[0].pageY;
}, false);

canvasTemp.addEventListener('touchmove', function(e){
	//contextTemp.lineWidth = 10;
	//contextTemp.lineCap = 'square';

	if (style == 'line')
	{
		if (!flag)//預防沒有touchstart的發生便開始touchmove
		{
			return;
		}
		contextTemp.clearRect(0, 0, canvasTemp.width, canvasTemp.height);
		contextTemp.beginPath();
		contextTemp.moveTo(ox, oy);
		contextTemp.lineTo(e.touches[0].pageX, e.touches[0].pageY);
		contextTemp.stroke();
		contextTemp.closePath();
	}
	else if(style == 'rect')
	{
		if (!flag)
		{
			return;
		}
		x = Math.min(e.touches[0].pageX, ox);
		y = Math.min(e.touches[0].pageY, oy);
		w = Math.abs(e.touches[0].pageX - ox);
		h = Math.abs(e.touches[0].pageY - oy);
		if (!w || !h)
		{
			return;
		}
		contextTemp.clearRect(0, 0, canvasTemp.width, canvasTemp.height);
		contextTemp.strokeRect(x, y, w, h);
	}
	else
	{
		x = e.touches[0].pageX;
		y = e.touches[0].pageY;
		contextTemp.beginPath();
		contextTemp.moveTo(ox, oy);
		if (!flag)
		{
			contextTemp.moveTo(x, y);
			flag = true;
		}
		contextTemp.lineTo(x, y);
		contextTemp.stroke();
		contextTemp.closePath();
		ox = x;
		oy = y;
	}
}, false);

canvasTemp.addEventListener('touchend', function(e){
	if (flag)
	{
		flag = false;
		draw();
	}
}, false);

//轉向事件觸發
window.addEventListener('orientationchange', function(){
	if (confirm('是否確定清除全畫面？'))
	{
	
		contextSrc = canvasSrc.getContext('2d');//重新啟動使其能在旋轉螢幕後能可繪圖
		contextSrc.clearRect(0,0,canvasTemp.width, canvasTemp.height);
	}
}, true);

//儲存成照片
document.getElementById('save').addEventListener('touchstart', function(){
	Canvas2Image.saveAsJPEG(canvasSrc);
}, true);