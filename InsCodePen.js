/**
 * JavaScript File created to present animations inspired by pens on Codepen.io
 * Author: Zohaib Wasim
 */
try{
	var canvas = document.getElementById('canvas');
	var ctx;
	if(canvas == null || canvas == undefined){
	 canvas = document.createElement("canvas");
	 ctx = canvas.getContext('2d'); 
	 document.body.appendChild(canvas);
	
	}else{
		 ctx = canvas.getContext('2d'); 
	}
	var canwidth = window.innerWidth;
	var canheight = 500;
	canvas.width = canwidth;
	canvas.height = canheight;
	
}catch(e){
	console.log(e);
}
let particles;
var i = 0;
var red = 80;
var blue = 150;
var green = 150;
function Particles(dx,dy,x,y,radius,color,osc,linwid){
	var mouse = {
			x: undefined,
			y: undefined
	};
	
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.osc = osc;
	var bool = false;
	var mouseout = false;
	this.linwid = linwid;
	this.initialize = function(){
		
		this.update();
	};
	//x(t) = amplitude * sin(t * 2PI / period) + x0
	this.update = function(){
		this.clear();
		var colores = "rgba("+red+","+blue+","+green+",1)";
		if(mouseout == false){
			if(i <= 30){
				
				red += 1;
				blue += 1;
				green += 1;
				
				i += 0.4;
			}
		}else if(this.y == 250 && mouseout == true){
			
			if(i >= 10){
				red -= 1;
				blue -= 1;
				green -= 1;
					i -= 0.4;
			}
		}
		
		ctx.fillStyle = colores;
		ctx.fillRect(0,0,canwidth,canheight);
		
		this.draw();
		
		this.x = mouse.x;
		this.y = mouse.y;
		
		canvas.addEventListener('mousemove', this.fire);
		
		
		
		this.fire = function(event){
			mouseout = false;
			mouse.x = event.pageX;
			mouse.y = event.pageY;
		};
		
		
		canvas.addEventListener('mouseleave', function(event){
			mouse.x = canwidth/2;
			mouse.y = canheight/2;
			mouseout = true;
		});
		
		
		
		
		if(this.radius < 26 && bool !== true ){
			this.radius += this.osc;
			
		} 
		else if(this.radius >= 26){
			bool = true;
		} 
		if(this.radius > 20 && bool === true){
			this.radius -= this.osc;
		}
		else if(this.radius <= 20 ){
			bool = false;
		}
	};
	this.draw = function(){
		
		var c = ctx;
		c.beginPath();
		c.strokeStyle = this.color;
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.stroke();
		c.closePath();
		c.lineWidth = this.linwid;

	};
	
	
	this.clear = function(){
		ctx.clearRect(0,0,canwidth,canheight);
	
	};

	
}

function init(){
	var radius = 10;
	var dx = Math.random()*2;
	var dy = Math.random()*2;
	particles = [];
	var oscillation = 1/4;
	var linewidth = 10;
	for(i = 0; i < 3; i++){
		particles.push(new Particles(dx,dy,this.x, this.y, radius, "rgba(160,160,160,0.8)", oscillation, linewidth));// oscillation
		radius += 2;
	}
	setInterval(animate, 1000/60);
}

function animate(){
	
	for(var i = 0; i < particles.length; i++){
		particles[i].initialize();
	}
}
/*
function blur(imageObj, context, passes) {
	  var i, x, y;
	  passes = passes || 4;
	  context.globalAlpha = 0.125;
	  // Loop for each blur pass.
	  for (i = 1; i <= passes; i++) {
	    for (y = -1; y < 2; y++) {
	      for (x = -1; x < 2; x++) {
	          context.drawImage(imageObj, x, y);
	      }
	    }
	  }
	  context.globalAlpha = 1.0;
	}
	 */
	
init();
