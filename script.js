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
	size = 8;
	
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
	}
}

class Apple extends Unit {
	static count = 1;
	
	constructor(x, y, size) {
		super(x, y, size);
	}
	
	Collected() {
		this.count += 1;
	}
}

class Snake {
	body = [];
	last;
	
	constructor() {
		this.last = new Unit(canvas.width / 2, canvas.height / 2, 16);
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
context.fillRect(snake.body[0].x, snake.body[0].y, snake.body[0].size, snake.body[0].size);
// console.log(snake.body[0].x, snake.body[0].y, snake.body[0].size);

