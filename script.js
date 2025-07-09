class Layout {
	width = 100;
	height = 100;
	color = "white";
	
	constructor(width, height) {
		this.width = width;
		this.height = height;
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
	
	constructor() {
		this.last = new Unit((canvas.width / 2) - (this.size / 2), (canvas.height / 2) - (this.size / 2));
		this.body.push(this.last);
		// console.log("snake was created");
	}
}

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


