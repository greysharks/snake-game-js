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
	size = 16;
	
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
	
	constructor(x, y) {
		this.last = new Unit(x, y);
		this.body.push(this.last);
		// console.log("snake was created");
	}
}

function HaveCollided(a, b, sizeA, sizeB) {
	return (a.x < b.x + sizeB) && (a.x + sizeA > b.x) && (a.y < b.y + sizeB) && (a.y + sizeA > b.y);
}

// adding event listeners for keyboard

const movement = new Movement();

let currentDirection = movement.right;

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

const snake = new Snake(0, layout.height - 16); // 16 is the size of each part of the snake
context.fillStyle = "black";
context.fillRect(snake.body[0].x, snake.body[0].y, snake.size, snake.size);
// console.log(snake.body[0].x, snake.body[0].y, snake.size);

let apple = new Apple((layout.height - 16) / 2, (layout.height - 16) / 2); // center the first apple
context.fillStyle = "red";
context.fillRect(apple.x, apple.y, apple.size, apple.size);

// actual game loop (start of the game)
const shift = new Unit(0, 0);

function GameLoop() {
	shift.x = 0;
	shift.y = 0;
	
	// check in which direction snake should move next
	if (currentDirection == movement.up) {
		// figure out what coordinate should be changed in snake's head
		shift.y = -snake.size;
	}
	
	if (currentDirection == movement.down) {	
		shift.y = snake.size;
	}
	
	if (currentDirection == movement.left) {
		shift.x = -snake.size;
	}
	
	if (currentDirection == movement.right) {
		shift.x = snake.size;
	}
	
	// move the head of the snake
	snake.body[0].x += shift.x;
	snake.body[0].y += shift.y;
	
	// check if any part of snake's body passed through walls
	for (let i = 0; i < snake.body.length; i++) {
		if (snake.body[i].y <= -1 * snake.size) {
			// if so, move it to the opposite side of game zone
			// leaving the direction of movement
			snake.body[i].y = layout.height - snake.body[i].y;
		}
		if (snake.body[i].y >= layout.height) {
			snake.body[i].y = snake.body[i].y - layout.height;
		}
		if (snake.body[i].x <= -1 * snake.size) {
			snake.body[i].x = layout.width - snake.body[i].x;
		}
		if (snake.body[i].x >= layout.width) {
			snake.body[i].x = snake.body[i].x - layout.height;
		}
	}
	
	// check for collisions after the snake has moved
	if (HaveCollided(snake.body[0], apple, snake.size, apple.size)) {
		// make the snake grow
		if (currentDirection == movement.up) {
			snake.body.push(new Unit(snake.last.x, snake.last.y + snake.size));
			snake.last = snake.body.at(-1);
		}
		
		if (currentDirection == movement.down) {
			snake.body.push(new Unit(snake.last.x, snake.last.y - snake.size));
			snake.last = snake.body.at(-1);
		}
		
		if (currentDirection == movement.left) {
			snake.body.push(new Unit(snake.last.x + snake.size, snake.last.y));
			snake.last = snake.body.at(-1);
		}
		
		if (currentDirection == movement.right) {
			snake.body.push(new Unit(snake.last.x - snake.size, snake.last.y));
			snake.last = snake.body.at(-1);
		}
			
		//create new apple
		apple = new Apple(Math.floor(Math.random() * (layout.width - apple.size)), Math.floor(Math.random() * (layout.height - apple.size)));
		// console.log(snake.body);
	}
		
	for (let i = 1; i < snake.body.length; i++) {
		if (HaveCollided(snake.body[0], snake.body[i], snake.size, snake.size)) {
			console.log(snake.body);
			// display here a message about results of the game
				
			return; // game over
		}
	}
	
	// repaint the layout of the game zone 
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