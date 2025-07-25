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
	width = 4;
	height = 16;
	
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}

class Apple extends Unit {
	size = 32;
	color = "red";
	
	constructor(x, y) {
		super(x, y, 32, 32);
		
		this.count += 1;
	}
	
}

class Snake {
	last;
	body = [];
	color = "black";
	
	constructor(x, y, width, height) {
		this.body.push(new Unit(x + 3*width, y, width, height));
		this.body.push(new Unit(x + 2*width, y, width, height));
		this.body.push(new Unit(x + width, y, width, height));
		this.body.push(new Unit(x, y, width, height));
		this.last = this.body.at(-1);
		// console.log("snake was created");
	}
}

function HaveCollided(a, b, widthA, heightA, widthB, heightB) {
	return (a.x < b.x + widthB) && (a.x + widthA > b.x) && (a.y < b.y + heightB) && (a.y + heightA > b.y);
}

function ResetScene() {
	classicMode.style.display = "none";
	crazyMode.style.display = "none";
	verticalMode.style.display = "none";
	
	context.fillStyle = layout.color;
	context.fillRect(0, 0, layout.width, layout.height);

	snake = new Snake(0, layout.height - 16, 4, 16); // 16 is the size of each part of the snake
	context.fillStyle = snake.color;
	snake.body.forEach(element => {
		context.fillRect(element.x, element.y, element.width, element.height);
	});

	apple = new Apple((layout.height - 16) / 2, (layout.height - 16) / 2); // center the first apple
	context.fillStyle = apple.color;
	context.fillRect(apple.x, apple.y, apple.size, apple.size);

	appleCount = 0;
	
	currentDirection = movement.right;
}

// adding event listeners for game modes
const classicMode = document.getElementById("classic-mode");
const crazyMode = document.getElementById("crazy-mode");
const verticalMode = document.getElementById("vertical-mode");

// console.log(classicMode);


classicMode.addEventListener("click", (event) => {
	ResetScene();

	requestAnimationFrame(ClassicSnake);
});

crazyMode.addEventListener("click", (event) => {
	ResetScene();

	requestAnimationFrame(CrazySnake);
});

verticalMode.addEventListener("click", (event) => {
	ResetScene();

	requestAnimationFrame(VerticalSnake);
});

// adding event listeners for keyboard
const movement = new Movement();

let currentDirection = movement.right;

document.addEventListener("keydown", (event) => {
	currentDirection = event.code;
	// console.log(event.code);
});

// setting up layout for game to play
const score = document.getElementById("score");
let appleCount = 0;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const layout = new Layout(canvas.width, canvas.height);
context.fillStyle = layout.color;
context.fillRect(0, 0, layout.width, layout.height);

let snake;
let apple;

// actual game loop (start of the game)
const shift = new Unit(0, 0, 0, 0);
let temp = 0;

// console.log(snake);

function ClassicSnake() {
	// move the rest of snake's body before moving the head
	for (let i = snake.body.length - 1; i > 0; i--) {
		snake.body[i].x = snake.body[i - 1].x;
		snake.body[i].y = snake.body[i - 1].y;
		snake.body[i].width = snake.body[i - 1].width;
		snake.body[i].height = snake.body[i - 1].height;
	}
	
	// check in which direction snake should move next
	shift.x = snake.body[0].x - snake.body[1].x;
	shift.y = snake.body[0].y - snake.body[1].y;
	
	//move the snake's head
	if (currentDirection == movement.up) {
		snake.body[0].y -= snake.body[0].height;
		snake.body[0].width = 16;
		snake.body[0].height = 4;
	}
	
	if (currentDirection == movement.down) {	
		snake.body[0].y += snake.body[0].height;
		snake.body[0].width = 16;
		snake.body[0].height = 4;
	}
	
	if (currentDirection == movement.left) {
		snake.body[0].x -= snake.body[0].width;
		snake.body[0].width = 4;
		snake.body[0].height = 16;
	}
	
	if (currentDirection == movement.right) {
		snake.body[0].x += snake.body[0].width;
		snake.body[0].width = 4;
		snake.body[0].height = 16;
	}
	
	// check if any part of snake's body passed through walls
	for (let i = 0; i < snake.body.length; i++) {
		if (snake.body[i].y <= -snake.body[i].height) {
			// if so, move it to the opposite side of game zone
			// leaving the direction of movement
			snake.body[i].y = layout.height + snake.body[i].y;
		}
		if (snake.body[i].y >= layout.height) {
			snake.body[i].y = snake.body[i].y - layout.height;
		}
		if (snake.body[i].x <= -snake.body[i].width) {
			snake.body[i].x = layout.width + snake.body[i].x;
		}
		if (snake.body[i].x >= layout.width) {
			snake.body[i].x = snake.body[i].x - layout.height;
		}
	}
	
	// check for collisions after the snake has moved
	if (HaveCollided(snake.body[0], apple, snake.body[0].width, snake.body[0].height, apple.size, apple.size)) {
		// make the snake grow
		shift.x = snake.body.at(-1).x - snake.body.at(-2).x;
		shift.y = snake.body.at(-1).y - snake.body.at(-2).y;
		
		snake.body.push(new Unit(snake.last.x + shift.x, snake.last.y + shift.y, snake.last.width, snake.last.height));
		snake.body.push(new Unit(snake.last.x + 2*shift.x, snake.last.y + 2*shift.y, snake.last.width, snake.last.height));
		snake.body.push(new Unit(snake.last.x + 3*shift.x, snake.last.y + 3*shift.y, snake.last.width, snake.last.height));
		snake.body.push(new Unit(snake.last.x + 4*shift.x, snake.last.y + 4*shift.y, snake.last.width, snake.last.height));
		snake.last = snake.body.at(-1);
			
		//create new apple
		apple = new Apple(Math.floor(Math.random() * (layout.width - apple.size)), Math.floor(Math.random() * (layout.height - apple.size)));
		appleCount += 1;
		
		score.textContent = "score: " + appleCount.toString();
		// console.log(appleCount);
	}
		
	for (let i = 1; i < snake.body.length; i++) {
		if (HaveCollided(snake.body[0], snake.body[i], snake.body[0].width, snake.body[0].height, snake.body[i].width, snake.body[i].height)) {
			console.log(snake);
			// display here a message about results of the game
				
			classicMode.style.display = "inline";
			crazyMode.style.display = "inline";
			verticalMode.style.display = "inline";
				
			return; // game over
		}
	}
	
	// repaint the layout of the game zone 
	context.fillStyle = layout.color;
	context.fillRect(0, 0, layout.width, layout.height);
	
	context.fillStyle = apple.color;
	context.fillRect(apple.x, apple.y, apple.size, apple.size);
	
	context.fillStyle = snake.color;
	snake.body.forEach(element => {
		context.fillRect(element.x, element.y, element.width, element.height);
	});
	
	requestAnimationFrame(ClassicSnake);
}

function CrazySnake() {
	// move the rest of snake's body before moving the head
	for (let i = snake.body.length - 1; i > 0; i--) {
		snake.body[i].x = snake.body[i - 1].x;
		snake.body[i].y = snake.body[i - 1].y;
		snake.body[i].width = snake.body[i - 1].width;
		snake.body[i].height = snake.body[i - 1].height;
	}
	
	//move the snake's head
	
	shift.x = snake.body[0].x - snake.body[1].x;
	shift.y = snake.body[0].y - snake.body[1].y;
	
	// check in which direction snake should move next
	if (currentDirection == movement.up) {
		// snake doesn't need to change direction
		if (shift.y != 0) {
			snake.body[0].y -= snake.body[0].height;
		}
		// snake needs to turn
		else {
			if (shift.x > 0) {
				snake.body[0].x += snake.body[0].width - snake.body[0].height;
				snake.body[0].y -= snake.body[0].width;
				
				temp = snake.body[0].width;
				snake.body[0].width = snake.body[0].height;
				snake.body[0].height = temp;
			}
			else {
				snake.body[0].y -= snake.body[0].width;
				
				temp = snake.body[0].width;
				snake.body[0].width = snake.body[0].height;
				snake.body[0].height = temp;
			}
		}
	}
	
	if (currentDirection == movement.down) {	
		// snake doesn't need to change direction
		if (shift.y != 0) {
			snake.body[0].y += snake.body[0].height;
		}
		// snake needs to turn
		else {
			if (shift.x > 0) {
				snake.body[0].x += snake.body[0].width - snake.body[0].height;
				snake.body[0].y += snake.body[0].height;
				
				temp = snake.body[0].width;
				snake.body[0].width = snake.body[0].height;
				snake.body[0].height = temp;
			}
			else {
				snake.body[0].y += snake.body[0].height;
				
				temp = snake.body[0].width;
				snake.body[0].width = snake.body[0].height;
				snake.body[0].height = temp;
			}
		}
	}
	
	if (currentDirection == movement.left) {
		// snake doesn't need to change direction
		if (shift.x != 0) {
			snake.body[0].x -= snake.body[0].width;
		}
		// snake needs to turn
		else {
			if (shift.y > 0) {
				snake.body[0].x -= snake.body[0].height;
				snake.body[0].y += snake.body[0].height - snake.body[0].width;
				
				temp = snake.body[0].width;
				snake.body[0].width = snake.body[0].height;
				snake.body[0].height = temp;
			}
			
			else {
				snake.body[0].x -= snake.body[0].height;
				
				temp = snake.body[0].width;
				snake.body[0].width = snake.body[0].height;
				snake.body[0].height = temp;
			}
		}
	}
	
	if (currentDirection == movement.right) {
		// snake doesn't need to change direction
		snake.body[0].x += snake.body[0].width;
		// snake needs to turn
	}
	
	// check if any part of snake's body passed through walls
	for (let i = 0; i < snake.body.length; i++) {
		if (snake.body[i].y <= -snake.body[i].height) {
			// if so, move it to the opposite side of game zone
			// leaving the direction of movement
			snake.body[i].y = layout.height + snake.body[i].y;
		}
		if (snake.body[i].y >= layout.height) {
			snake.body[i].y = snake.body[i].y - layout.height;
		}
		if (snake.body[i].x <= -snake.body[i].width) {
			snake.body[i].x = layout.width + snake.body[i].x;
		}
		if (snake.body[i].x >= layout.width) {
			snake.body[i].x = snake.body[i].x - layout.height;
		}
	}
	
	// check for collisions after the snake has moved
	if (HaveCollided(snake.body[0], apple, snake.body[0].width, snake.body[0].height, apple.size, apple.size)) {
		// make the snake grow
		shift.x = snake.body.at(-1).x - snake.body.at(-2).x;
		shift.y = snake.body.at(-1).y - snake.body.at(-2).y;
		
		snake.body.push(new Unit(snake.last.x + shift.x, snake.last.y + shift.y, snake.last.width, snake.last.height));
		snake.last = snake.body.at(-1);
			
		//create new apple
		apple = new Apple(Math.floor(Math.random() * (layout.width - apple.size)), Math.floor(Math.random() * (layout.height - apple.size)));
		// console.log(snake.body);
	}
		
	for (let i = 1; i < snake.body.length; i++) {
		if (HaveCollided(snake.body[0], snake.body[i], snake.body[0].width, snake.body[0].height, snake.body[i].width, snake.body[i].height)) {
			console.log(snake);
			// display here a message about results of the game
				
			classicMode.style.display = "inline";
			crazyMode.style.display = "inline";
			verticalMode.style.display = "inline";
			
			return; // game over
		}
	}
	
	// repaint the layout of the game zone 
	context.fillStyle = layout.color;
	context.fillRect(0, 0, layout.width, layout.height);
	
	context.fillStyle = apple.color;
	context.fillRect(apple.x, apple.y, apple.size, apple.size);
	
	context.fillStyle = snake.color;
	snake.body.forEach(element => {
		context.fillRect(element.x, element.y, element.width, element.height);
	});
	
	requestAnimationFrame(CrazySnake);
}

function VerticalSnake() {
	// move the rest of snake's body before moving the head
	for (let i = snake.body.length - 1; i > 0; i--) {
		snake.body[i].x = snake.body[i - 1].x;
		snake.body[i].y = snake.body[i - 1].y;
		snake.body[i].width = snake.body[i - 1].width;
		snake.body[i].height = snake.body[i - 1].height;
	}
	
	//move the snake's head
	
	shift.x = snake.body[0].x - snake.body[1].x;
	shift.y = snake.body[0].y - snake.body[1].y;
	
	// check in which direction snake should move next
	if (currentDirection == movement.up) {
		snake.body[0].y -= snake.body[0].height;
	}
	
	if (currentDirection == movement.down) {	
		snake.body[0].y += snake.body[0].height;
	}
	
	if (currentDirection == movement.left) {
		snake.body[0].x -= snake.body[0].width;
	}
	
	if (currentDirection == movement.right) {
		// snake doesn't need to change direction
		snake.body[0].x += snake.body[0].width;
		// snake needs to turn
	}
	
	// check if any part of snake's body passed through walls
	for (let i = 0; i < snake.body.length; i++) {
		if (snake.body[i].y <= -snake.body[i].height) {
			// if so, move it to the opposite side of game zone
			// leaving the direction of movement
			snake.body[i].y = layout.height + snake.body[i].y;
		}
		if (snake.body[i].y >= layout.height) {
			snake.body[i].y = snake.body[i].y - layout.height;
		}
		if (snake.body[i].x <= -snake.body[i].width) {
			snake.body[i].x = layout.width + snake.body[i].x;
		}
		if (snake.body[i].x >= layout.width) {
			snake.body[i].x = snake.body[i].x - layout.height;
		}
	}
	
	// check for collisions after the snake has moved
	if (HaveCollided(snake.body[0], apple, snake.body[0].width, snake.body[0].height, apple.size, apple.size)) {
		// make the snake grow
		shift.x = snake.body.at(-1).x - snake.body.at(-2).x;
		shift.y = snake.body.at(-1).y - snake.body.at(-2).y;
		
		snake.body.push(new Unit(snake.last.x + shift.x, snake.last.y + shift.y, snake.last.width, snake.last.height));
		snake.last = snake.body.at(-1);
			
		//create new apple
		apple = new Apple(Math.floor(Math.random() * (layout.width - apple.size)), Math.floor(Math.random() * (layout.height - apple.size)));
		// console.log(snake.body);
	}
		
	for (let i = 1; i < snake.body.length; i++) {
		if (HaveCollided(snake.body[0], snake.body[i], snake.body[0].width, snake.body[0].height, snake.body[i].width, snake.body[i].height)) {
			console.log(snake);
			// display here a message about results of the game
				
			classicMode.style.display = "inline";
			crazyMode.style.display = "inline";
			verticalMode.style.display = "inline";
				
			return; // game over
		}
	}
	
	// repaint the layout of the game zone 
	context.fillStyle = layout.color;
	context.fillRect(0, 0, layout.width, layout.height);
	
	context.fillStyle = apple.color;
	context.fillRect(apple.x, apple.y, apple.size, apple.size);
	
	context.fillStyle = snake.color;
	snake.body.forEach(element => {
		context.fillRect(element.x, element.y, element.width, element.height);
	});
	
	requestAnimationFrame(VerticalSnake);
}

// initial game start
ResetScene();

requestAnimationFrame(ClassicSnake);