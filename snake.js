
/**
Things To do:
1. make the snake head. 	-done
2. make the food.			-done
3. update the snake.		-done
4. update the food.			-done
5. get Score				-
6. stop Sequence			-done
7. restart Sequence			-done
8. Boundaries				-done



**/


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 400;
var snake;
var food;
var direction = "";
var btn = document.getElementById('remove');
var	btn2 = document.getElementById("start");

var paintFood = function(x,y){
	var width = 10;
	var height = 10;
	ctx.fillStyle = "yellow";
	ctx.fillRect(x*10,y*10,10,10);	
	
		
}
var addSnake = function(){
	snake = [];
	var length = 4;
	for(var i= 0; i < length; i++){
		snake.push({x:i, y:0});
	}
		
}
var drawSnake = function(x,y){
	
	
	ctx.strokeStyle = "black";
	ctx.strokeRect(x*10,y*10,10,10)
	ctx.fillStyle = "cyan";
	ctx.fillRect(x*10,y*10,10,10)
}

var checkFood = function(){
		
	food = {
		x: Math.floor((Math.random() * 30) + 1),
		y: Math.floor((Math.random() * 30) + 1)
	};
	for(var i = 0; i < snake.length; i++){
		var snakeX = snake[i].x;
		var snakeY = snake[i].y;
		if(food.x === snakeX && food.y == snakeY || food.y == snakeY && food.x == snakeX){
			food.x = Math.floor((Math.random() * 30) + 1);
			food.y = Math.floor((Math.random() * 30) + 1);
			console.log("food was rerendered");
		}
	}
	


}
document.onkeydown = function(event){

	keyCode = window.event.keyCode;
	keyCode = event.keyCode;

	switch(keyCode){
		case 87:
			if(direction !== "down"){
				direction = 'up';
			}
			
		
		break;
		case 83: 
			if(direction !== "up"){
			direction = "down";
		}
		break;
		case 68:
		if(direction !== "left"){
			direction = "right";
		}
		break;
		case 65:
		if(direction !== "right"){
			direction = "left";
		}
		break;
	}
}

function clearCanvas(){

	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,300,400);
}
 var runner = function(){
 	clearCanvas();
 	var tail2 = {x: snakeX + 10, y:snakeY + 10};
 	var snakeX = snake[0].x;
 	var snakeY = snake[0].y;
 	
 	if(direction == "up"){
 		if(snakeY >= -1) snakeY--;
 	}
 	else if(direction == "down"){
 		if(snakeY <= 39) snakeY++;
 	}
 	else if(direction == "right"){
 		if(snakeX <= 29) snakeX++;
 	}
 	else if(direction == "left"){
 		if(snakeX >= -1) snakeX--;
 	}
	
 	if(snakeY < 0 || snakeY > 38 || snakeX  < 0 || snakeX > 29 || checkSnakeCollision(snakeX,snakeY,snake)){
 				
 				stopGame();
 				btn2.disabled =false;
 		}
 	else{
		 	if(snakeX == food.x && snakeY == food.y || snakeY == food.y && snakeX == food.x){
		 		console.log("food was eaten");
		 		var tail = {x:snakeX, y:snakeY};
		 		
		 		snake.push(tail2);
		 		console.log(snake.length);
		 		checkFood();
		 	}
		 	else{
		 		var tail = snake.pop();
		 		tail.x = snakeX;
		 		tail.y = snakeY;
		 	}
		 		snake.unshift(tail);
				
			for(var i=0; i< snake.length; i++){
		 		drawSnake(snake[i].x, snake[i].y);
		 	}
		 
		 	paintFood(food.x, food.y);
		
 		
 	} 				
 }
var checkSnakeCollision = function(x,y,array) {
		
	for(var i=0; i < array.length; i++ ){
		if(array[i].x === x  && array[i].y === y){
			
			return true;
			
		}
		
	}
		return false;
	
}
var looper;
 function init(){
	direction = "down";
	
 	addSnake();
 	checkFood();
 	looper = setInterval(animate, 60);

 	
 }
 function stopGame(){
 	clearCanvas();
 	looper = clearInterval(looper);
 	
 }
function animate(){

	runner();
	//console.log("running");
}

btn2.onclick = function(){
	
			btn2.disabled = true;
		
	
		init();
}


btn.onclick = function(){
   		
   		stopGame();
   		btn2.disabled = false;
   }
