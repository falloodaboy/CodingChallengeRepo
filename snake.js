
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const food = (x,y,width,height) => {
	this.position = [x,y];
	this.size = [width,height];



	this.generate = () => {
	

	}

}
const snake = (x,y,dx,dy,width,height) => {
	this.position = [x,y];
	this.speed = [dx,dy];
	this.size = [width, height];


	

}
init = () => {
	
}
animate = () => {
	requestAnimationFrame(animate);
}

init();
animate();