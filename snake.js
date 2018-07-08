
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


const food = (x,y,w,h) => {
	this.position = [x, y];
	this.size = [w, h];



	this.generate = () => {
		// random position property every time after snake.eat() is called

	}

}
const snake = (x,y,dx,dy,w,h) => {
	this.position[x,y];
	this.size = [w,h];
	this.dx = dx;
	this.dy = dy;


	this.eat = () => {
		// triggered when snake.position = food.position

	}

	this.initialize = () => {
		// determines initial size and position for snake
	}
}