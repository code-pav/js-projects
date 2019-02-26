// First approach:
// Canvas variant

// Second approach:
// Maybe solution with HTML elements?

const canvas = document.createElement("canvas");
canvas.setAttribute("width", 1000);
canvas.setAttribute("height", 600);
canvas.addEventListener("mousemove", movePlayer);
const context = canvas.getContext("2d");

const mouseOffSet = 90;

let scoreHeading = document.createElement("h1");

let score = 0;
let scoreEnemy = 0;

function initialize(){
	let root = document.getElementsByClassName("root")[0];
	root.appendChild(canvas);
	root.appendChild(scoreHeading);
	scoreHeading.innerHTML = "0 - 0";
	scoreHeading.style.fontFamily = 'Arial';	

	setInterval(physics, 20);
	setInterval(render, 20);
	// render();
}
function physics(){
	// calculate ball
	ball.move();
	ball.collisionWithWall();
	ball.collisionWithBoard();

	// player collision
	player.move();
	player.collisionWithWall();

	// enemy move
	enemy.move();
	enemy.collisionWithWall();

	if(intersectRect(player.bounds,ball.bounds)){
		ball.xspeed *= -1;
	}
	if(intersectRect(ball.bounds,enemy.bounds)){
		ball.xspeed *= -1;
	}
}
function render(){
	context.clearRect(0,0,canvas.width, canvas.height);

	// render ball
	ball.render();

	// render player
	player.render();
	enemy.render();

	// centerLine
	centerLine.render();
}


// Ball logic

let ball = {
	x: 300,
	y: 300,
	r: 10,
	xspeed: -6	,
	yspeed: -6,	
	color: "black",
	bounds: {
		left: 40,
		top: 0,
		right: 60,
		bottom: 0,
		setBounds(x,y,r){
			this.left = x-r;
			this.top = y-r;
			this.right = x+r;
			this.bottom = y+r;
		}
	},
	render() { 
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		context.fill();
	},
	move(){
		this.x += this.xspeed;
		this.y += this.yspeed;
		this.bounds.setBounds(this.x, this.y, this.r/2);
	},
	collisionWithWall(){
		if(this.x-this.r<0){
			scoreEnemy+=1;
			updateLeaderBoard();
		}
		if(this.y-this.r<0){
			this.yspeed *= -1;
		}
		if(this.x+this.r>canvas.width){
			score+=1;
			updateLeaderBoard();
		}
		if(this.y+this.r>canvas.height){
			this.yspeed *= -1;
		}
	},
	collisionWithBoard(){

	}
}


// player logic
let player = {
	y : 0,
	desiredY : 0,
	maxSpeed : 10,
	speed : 0,
	accselerate : 1,
	color: "black",
	bounds: {
		left: 40,
		top: 0,
		right: 60,
		bottom: 0,
		setBounds(num){
			this.top = num;
			this.bottom = num+100;
		}
	},
	render(){
		context.fillStyle = this.color;
		context.fillRect(40,this.y,20,100);
	},
	move(){
		if(Math.abs(this.y-this.desiredY)>4){
			if(this.y>=this.desiredY){
				this.speed -= this.accselerate;
			}
			if(this.y<=this.desiredY){
				this.speed += this.accselerate;
			}
			if(this.speed > this.maxSpeed){
				this.speed = this.maxSpeed;
			}
			if(this.speed < -this.maxSpeed){
				this.speed = -this.maxSpeed;
			}
		}else{
			this.speed = 0;
		}
		this.y += this.speed;
		this.bounds.setBounds(this.y+5);

	},
	collisionWithWall(){
		if(this.y<0){
			this.speed = 0;
			this.y = 0;
		}
		if(this.y>canvas.height-100){
			this.speed = 0;
			this.y = canvas.height-100;
		}
	}
}

function movePlayer(event){
	player.desiredY = event.clientY-mouseOffSet;
}

// enemy
let enemy = {
	y : 0,
	desiredY : 0,
	maxSpeed : 10,
	speed : 0,
	accselerate : 5,
	color: "black",
	bounds: {
		left: canvas.width - 60,
		top: 0,
		right: canvas.width - 60,
		bottom: 0,
		setBounds(num){
			this.top = num;
			this.bottom = num+100;
		}
	},
	render(){
		context.fillStyle = this.color;
		context.fillRect(canvas.width - 60,this.y,20,100);
	},
	move(){
		this.y = ball.y-50;
	},
	collisionWithWall(){
		if(this.y<0){
			this.y = 0;
		}
		if(this.y>canvas.height-100){
			this.speed = 0;
			this.y = canvas.height-100;
		}
		this.bounds.setBounds(this.y);
	}
}

// the center

let centerLine = {

	render(){
		context.beginPath();
		context.setLineDash([10, 15]);
		context.moveTo(canvas.width/2, 7.5);
		context.lineTo(canvas.width/2, canvas.height+100);
		context.stroke();
	}
}



// intersection function
function intersectRect(r1, r2) {
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

function updateLeaderBoard(){
	scoreHeading.innerHTML = `${score} - ${scoreEnemy}`;
	ball.x = canvas.width/2;
	ball.y = canvas.height/2;
	
	Math.random()*2 > 1 ? ball.xspeed = -6: ball.xspeed = 6;
	Math.random()*2 > 1 ? ball.yspeed = -6: ball.yspeed = 6;

	if(scoreEnemy == 5){
		ball.xspeed = 0;
		ball.yspeed = 0;
		scoreHeading.innerHTML = "You lost! Ctrl + R to restart.";
	}
}