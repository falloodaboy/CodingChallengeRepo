
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//return the distance between any two points on the canvas using the pythagorean theorem.
const dist = (x,y,x2,y2) => {
	xDistance = x - x2; 
	yDistance = y - y2;

	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

/**------------------------------FOOD OBJECT CONSTRUCTOR---------------------**/
const food = (x,y,width,height) => {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;


	//generate the food for the snake.
	this.generate = () => {
		ctx.beginPath();
		ctx.fillStyle = "yellow";
		ctx.fillRect(this.x,this.y,this.width,this.height);
		ctx.closePath();

	}
	//check if the snake has eaten the food. If it has, generate a new food object.
	this.hasSnakeCollided = (snakeX,snakeY) => {

		this.snakeX = snakeX;
		this.snakeY = snakeY;

		if(dist(this.snakeX,this.snakeY,this.x,this.y) !== 0){
			return false;

		}
			this.generate();
		
		}

	}






/**-----------------------------------SNAKE OBJECT CONSTRUCTOR-----------------------------**/
const snake = (x,y,dx,dy,width,height) => {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.dx = dx;
	this.dy = dy;

	this.draw = () => {
			ctx.beginPath();
			ctx.fillStyle = 'green';
			ctx.fillRect(this.x,this.y,this.width,this.height);
			ctx.closePath();
	}
	
	this.update = () => {
		//Logic for snake's behavior and Boundaries go here.
		this.draw();
	}

}
init = () => {
	//initialize the objects from the constructors above.
	canvas.height = 400;
	canvas.width = 300;
}
animate = () => {
	 //add some behavior if you want :)
	requestAnimationFrame(animate);
}

init();
animate();