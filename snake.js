
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const blockWidth = 10;
const blockHeight = 10;
const generateBlock = (x,y) => ctx.fillRect(x,y,blockWidth,blockHeight);
const generateStroke = (x,y) => ctx.strokeRect(x,y,blockWidth,blockHeight);
let snakeLength = 4;

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
function food(x,y) {
		this.x = x;
		this.y = y;

	//generate the food for the snake.
	this.generate = () => {
		// won't we need to erase old food somehow before creating a new one?
		ctx.clearRect(x,y,10,10);
		ctx.beginPath();
		ctx.fillStyle = "yellow";
		generateBlock(this.x, this.y);
		ctx.closePath();
	}
	//check if the snake has eaten the food. If it has, generate a new food object.
	this.hasSnakeCollided = (snakeX,snakeY) => {
		if(dist(snakeX,snakeY,this.x,this.y) !== 0){
			return false;

		}
			this.generate();
			snakeLength++;
		}

	}

/**-----------------------------------SNAKE OBJECT CONSTRUCTOR-----------------------------**/
function snake(x,y) {
	this.x = x;
	this.y = y;
	this.blockCount = 4;
	this.offset = 10;
	// this.speed = [dx,dy];
	this.snakeBody = [];

	this.draw = () => {
		ctx.beginPath();
		ctx.fillStyle = '#00dc00';
		ctx.strokeStyle = 'black';
			for (let i = 0; i < this.blockCount; i++) {
				this.snakeBody[i] = { x: x, y: y };
				generateBlock(x, y);
				generateStroke(x, y, 10, 10);
				x-=this.offset;
			}
		// console.log(this.snakeBody);
		ctx.closePath();
	}
	
	this.update = () => {
		//Logic for snake's behavior and Boundaries go here.
		this.draw();
	}
}

const init = () => {
	//initialize the objects from the constructor functions above.
	canvas.height = 400;
	canvas.width = 400;

	const newFood = new food(xyRand(), xyRand());
	const newSnake = new snake(150, 150);
	newSnake.draw();
	newFood.generate();

	// don't initialize if food and snake are in the same spot
	const snakeBodyFilter = newSnake.snakeBody.filter(block => {
		return (block.x === newFood.x && block.y === newFood.y);
	});
	if ( snakeBodyFilter.length > 0	) {
		console.log(newFood.x, newSnake.x);
		console.log('snake and food are in the same space');
	}
	
	console.log(newFood.x, snakeBodyFilter);
	console.log(snakeBodyFilter.length);
	console.log(newSnake.snakeBody);
	console.log('game has been initialized.');
	ctx.save();
	requestAnimationFrame(animate);
}

const animate = () => {

	//add some behavior if you want :)
	requestAnimationFrame(animate);
}

const startGame = (event) => {
	if(event.which === 13) {
		console.log('game has begun');
		animate();
	}
}

const restartGame = (event) => {
	if(event.which === 32 || event.key === 'r' || event.which === 82) {
		ctx.restore();
		init();
	}
}

init();

// have animate in an eventlistener to prevent game from launching immediately
window.addEventListener("keypress", startGame);
window.addEventListener("keypress", restartGame);