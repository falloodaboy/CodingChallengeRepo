const scoreCount = document.querySelector('.scoreCount');
const highScore = document.querySelector('.highScore');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 400;
const blockWidth = 10;
const blockHeight = 10;
const generateBlock = (x,y) => ctx.fillRect(x,y,blockWidth,blockHeight);
const generateStroke = (x,y) => ctx.strokeRect(x,y,blockWidth,blockHeight);
let direction;
let score;
let looper;
let speed = 100;
let gameRunning = false;


const xyRand = () => {
	let numRange = Math.floor(Math.random() * 40);
		return numRange * blockWidth;
}

const scoreCheck = () => {
	let currentScore = scoreCount.innerHTML.match(/\d+/); //ex 0 or [0, 1]
	let currentHighScore = highScore.innerHTML.match(/\d+/);
	console.log(currentScore, currentHighScore);
	if(currentScore instanceof Array || currentHighScore instanceof Array) {
		currentScore = parseInt(currentScore.join(""));
		currentHighScore = parseInt(currentHighScore.join(""));
	}
	if(currentScore > currentHighScore) {
		highScore.innerHTML = `High Score: ${score}`;
		console.log('New high score');
	}
	console.log(currentScore, currentHighScore);
}

/**------------------------------FOOD OBJECT CONSTRUCTOR---------------------**/
function food() {
		this.x;
		this.y;

	this.draw = (x, y) => {
		this.x = x;
		this.y = y;
		ctx.fillStyle = "yellow";
		generateBlock(x, y);
	}
	//check if the snake has eaten the food
	this.hasSnakeCollided = () => {
		const snakeBodyFilter = firstSnake.snakeBody.filter(block => {
			return (block.x === this.x && block.y === this.y);
		});
		if ( snakeBodyFilter.length > 0	) {
			console.log('Food was eaten.');
			return true;
		} 
		return false;
	}
}

/**-----------------------------------SNAKE OBJECT CONSTRUCTOR-----------------------------**/
function snake() {
	this.snakeBody = [];

	this.draw = (x, y) => {
			ctx.strokeStyle = "black";
			generateStroke(x, y);
			ctx.fillStyle = '#00dc00';
			generateBlock(x, y);
		}

	this.initSnake = () => {
		this.snakeBody = [];
		let length = 3;
		let num = 0;
		for(let i = 0; i < length; i++) {
			this.snakeBody.push({x: 300, y: 100 - num});
			num+=10;
		}
		// this.snakeBody.push({x: 300, y: 80}, {x: 300, y: 90}, {x: 300, y: 100});
	}
		
		this.update = () => {
			this.checkCollision(this.snakeBody);
			let tail;
		
			if(newFood.hasSnakeCollided() ) {
				tail = {x: newFood.x, y: newFood.y};
				this.snakeBody.unshift(tail);
				score++;
				console.log(`Score: ${score}`);
				newFood.draw(xyRand(), xyRand());
			} else {
					tail = this.snakeBody.pop();
					tail.x = this.snakeBody[0].x;
					tail.y = this.snakeBody[0].y;
					this.snakeBody.unshift(tail);
				}
		}

		this.checkCollision = (array) => {
			array.forEach(block => {
					if (
						// out of bounds
						block.y < 0 || block.y > 390 || block.x < 0 || block.x > 390 ||
						// or if snake collides itself
						// NOT WORKING ON THE TAIL
						((block.x === this.snakeBody[0].x && block.y === this.snakeBody[0].y) && block !== this.snakeBody[0])
					) {
						if((firstSnake.snakeBody[0].x === firstSnake.snakeBody[firstSnake.snakeBody.length-1].x) && (firstSnake.snakeBody[0].y === firstSnake.snakeBody[firstSnake.snakeBody.length-1].y)) {
							console.log("Got your tail");
						}
						stopGame();
					}
			});
		}

}


let firstSnake = new snake();
let newFood = new food();


const init = () => {
	firstSnake.initSnake();
	firstSnake.snakeBody.forEach(block => {
		firstSnake.draw(block.x, block.y);
	});
	newFood.draw(xyRand(), xyRand());
	direction = 'down';
	score = 0;
	
	// re-initialize if food and snake are in the same spot
	if(newFood.hasSnakeCollided()) {
		// clearCanvas();
		newFood.draw(xyRand(), xyRand());
	}
	
	// console.log(firstSnake.snakeBody);
	console.log('game has been initialized.');
}

const animate = () => {
	clearCanvas();
	window.addEventListener("keydown", directionHandler);
	switch(direction) {
		case 'left':
		firstSnake.snakeBody[0].x-=10;
		break;
		case 'right':
		firstSnake.snakeBody[0].x+=10;
		break;
		case 'up':
		firstSnake.snakeBody[0].y-=10;
		break;
		case 'down':
		firstSnake.snakeBody[0].y+=10;
		break;
	}
	
	newFood.draw(newFood.x, newFood.y);

	firstSnake.snakeBody.forEach(block => {
		firstSnake.draw(block.x, block.y);
	});

	firstSnake.update();

	scoreCount.innerHTML = `Score: ${score}`;
	// highScore.innerHTML = `High Score: 0`;

	// console.log(`snake length: ${firstSnake.snakeBody.length}`);
	// console.log(firstSnake.snakeBody);
	// console.log(firstSnake.snakeBody[2]);

}

const startGame = event => {
	if(event.which === 13 && !gameRunning) {
		init();
		// momentary pause before game starts
		setTimeout(() => {
			looper = setInterval(animate, speed);
			gameRunning = true;
			console.log("game running");
		},200);
	}
}

const stopGame = () => {
	clearInterval(looper);
	clearCanvas();
	gameRunning = false;
	window.removeEventListener("keydown", directionHandler);
	console.log("game not running");
	scoreCheck();
}

const restartGame = event => {
	if(event.which === 32 || event.key === 'r' || event.which === 82) {
		stopGame();
	}
}

const clearCanvas = () => {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,300,400);
}

const directionHandler = event => {
	switch(event.which){
		case 37:
		case 65:
		if(direction !== 'right') {
			direction = 'left';
		}
		break;
		case 39:
		case 68:
		if(direction !== 'left') {
			direction = 'right';
		}
		break;
		case 38:
		case 87:
		if(direction !== 'down') {
			direction = 'up';
		}
		break;
		case 40:
		case 83:
		if(direction !== 'up') {
			direction = 'down';
		}
		break;
	}
	console.log(direction);
}

window.addEventListener("keypress", startGame);
window.addEventListener("keypress", restartGame);