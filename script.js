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

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);