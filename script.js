class Layout {
	width = 100;
	height = 100;
	color = "white";
	
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
	
}

class Movement {
	up;
	down;
	left;
	right;
	
	constructor() {
		this.up = "ArrowUp";
		this.down = "ArrowDown";
		this.left = "ArrowLeft";
		this.right = "ArrowRight";
	}
}

class Unit {
	x = 0;
	y = 0;
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Apple extends Unit {
	static count = 0;
	size = 8;
	
	constructor(x, y) {
		super(x, y);
		
		this.count += 1;
	}
	
}

class Snake {
	last;
	body = [];
	size = 16;
	speed = 4;
	
	constructor() {
		this.last = new Unit((canvas.width / 2) - (this.size / 2), (canvas.height / 2) - (this.size / 2));
		this.body.push(this.last);
		// console.log("snake was created");
	}
}

// adding event listeners for keyboard

const movement = new Movement();

let currentDirection = movement.up;

document.addEventListener("keydown", (event) => {
	currentDirection = event.code;
	// console.log(event.code);
});

// setting up layout for game to play

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const layout = new Layout(canvas.width, canvas.height);
context.fillStyle = layout.color;
context.fillRect(0, 0, layout.width, layout.height);

const snake = new Snake();
context.fillStyle = "black";
context.fillRect(snake.body[0].x, snake.body[0].y, snake.size, snake.size);
// console.log(snake.body[0].x, snake.body[0].y, snake.size);

let apple = new Apple((canvas.width / 2) - (8 / 2), (canvas.height / 4) - (8 / 2)); // 8 is apple.size
context.fillStyle = "red";
context.fillRect(apple.x, apple.y, apple.size, apple.size);

// actual game loop (start of the game)

function GameLoop() {
	const distance = snake.speed;
	
	if (currentDirection == movement.up) {
		snake.last = snake.body.at(-1);
		for (let i = 1; i < snake.body.length; i++) {
			snake.body[i] = snake.body[i - 1];
		}
		if (snake.body.length < 2) {
			snake.last.y -= distance;
		}
		else {
			snake.body[0].y -= distance;
		}
	}
	
	if (currentDirection == movement.down) {
		snake.last = snake.body.at(-1);
		for (let i = 1; i < snake.body.length; i++) {
			snake.body[i] = snake.body[i - 1];
		}
		if (snake.body.length < 2) {
			snake.last.y += distance;
		}
		else {
			snake.body[0].y += distance;
		}
	}
	
	if (currentDirection == movement.left) {
		snake.last = snake.body.at(-1);
		for (let i = 1; i < snake.body.length; i++) {
			snake.body[i] = snake.body[i - 1];
		}
		if (snake.body.length < 2) {
			snake.last.x -= distance;
		}
		else {
			snake.body[0].x -= distance;
		}
	}
	
	if (currentDirection == movement.right) {
		snake.last = snake.body.at(-1);
		for (let i = 1; i < snake.body.length; i++) {
			snake.body[i] = snake.body[i - 1];
		}
		if (snake.body.length < 2) {
			snake.last.x += distance;
		}
		else {
			snake.body[0].x += distance;
		}
	}
	
	context.fillStyle = layout.color;
	context.fillRect(0, 0, layout.width, layout.height);
	
	context.fillStyle = "red";
	context.fillRect(apple.x, apple.y, apple.size, apple.size);
	
	context.fillStyle = "black";
	snake.body.forEach(element => {
		context.fillRect(element.x, element.y, snake.size, snake.size);
	});
	
	requestAnimationFrame(GameLoop);
}

requestAnimationFrame(GameLoop);