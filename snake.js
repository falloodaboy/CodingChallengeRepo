
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const blockWidth = 10;
const blockHeight = 10;
const generateBlock = (x,y) => ctx.fillRect(x,y,blockWidth,blockHeight);

//return the distance between any two points on the canvas using the pythagorean theorem.
const dist = (x,y,x2,y2) => {
	xDistance = x - x2;
	yDistance = y - y2;

	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

const xyRand = () => {
	let numRange = Math.floor(Math.random() * 40);
		return numRange * blockWidth;
}

/**------------------------------FOOD OBJECT CONSTRUCTOR---------------------**/
class Food {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	// this.width = width;
	// this.height = height;

	//generate the food for the snake.
	generate() {
		// won't we need to erase old food somehow before creating a new one?
		ctx.beginPath();
		ctx.fillStyle = "yellow";
		generateBlock(this.x, this.y);
		ctx.closePath();

	}
	//check if the snake has eaten the food. If it has, generate a new food object.
	hasSnakeCollided(snakeX,snakeY) {
		if(dist(snakeX,snakeY,this.x,this.y) !== 0){
			return false;

		}
			this.generate();
		
		}

	}

/**-----------------------------------SNAKE OBJECT CONSTRUCTOR-----------------------------**/
const snake = (x,y,dx,dy,width,height) => {
	this.x = x;
	this.y = y;
	this.speed = [dx,dy];

	this.draw = () => {
			ctx.beginPath();
			ctx.fillStyle = '#00dc00';
			generateBlock(this.x, this.y);
			ctx.closePath();
	}
	
	this.update = () => {
		//Logic for snake's behavior and Boundaries go here.
		this.draw();
	}
}

const init = () => {
	//initialize the objects from the constructors above.
	const newFood = new Food(xyRand(), xyRand())
	canvas.height = 400;
	canvas.width = 400;
	newFood.generate();
	console.log(newFood);
	requestAnimationFrame(animate);
	console.log('game has been initialized.');
}
const animate = () => {
	 //add some behavior if you want :)
	requestAnimationFrame(animate);
}

init();

// have animate in an eventlistener to prevent game from launching immediately
animate();