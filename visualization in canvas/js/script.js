const SIZE = 400;
const TWO_PI = Math.PI*2;

let canv = document.getElementById("myCanvas");
canv.setAttribute("width", SIZE);
canv.setAttribute("height", SIZE);

let ctx = canv.getContext("2d");





// y = y/2;
function init (argument) {
	console.log("start");
	ctx.translate(SIZE/2, SIZE/2);
	setInterval(draw, 100);
	// draw();
	// let imgData = ctx.createImageData(SIZE,SIZE);
	// console.log(imgData);
	// for (var i = 0; i < imgData.data.length; i += 4){
    //  imgData.data[i+0] = Math.round(Math.random()*255-1);
    //  imgData.data[i+1] = Math.round(Math.random()*255-1);
    //  imgData.data[i+2] = Math.round(Math.random()*255-1);
    // 	imgData.data[i+3] = 255;
    // }
	// ctx.putImageData(imgData, 0, 0);
}

let phase = 0;
let noiseMax = 20;

function draw (){
	// ctx.fillStyle = "white";
	ctx.clearRect(-SIZE/2,-SIZE/2, SIZE,SIZE);


	ctx.lineWidth = "1";
	ctx.strokeStyle = "black"; // Green path
	ctx.beginPath();
	// noise.seed(Math.random());
	// let endX, endY;
	// let start = true;
	for(let a=0; a < TWO_PI; a+=0.1){
		let xoff = map(Math.cos(a +phase),-1,1,0,noiseMax);
		let yoff = map(Math.sin(a +phase),-1,1,0,noiseMax);
		let r = map(noise.perlin2(xoff, yoff),-1,1,100,200);
		let x = r * Math.cos(a);
		let y = r * Math.sin(a);
		// if(start){
		// 	endX = x;
		// 	endY = y;
		// 	start = false;
		// }
		ctx.lineTo(x,y);
	}
	phase+=1;
	// ctx.lineTo(endX,endY);
	ctx.stroke();
}



function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


