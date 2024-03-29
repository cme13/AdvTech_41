// JavaScript Document

var myCanvas = document.getElementById("myCanvas");
	//make an object for its "context" and choose a context
var ctx = myCanvas.getContext("2d");
	// cover the canvas with a black rectangle
ctx.fillStyle = 'rgba(0,0,0,1)';
	//fill rect(positionx ,starting y ,width ,height);
ctx.fillRect(0,0,500,500);

//var's
var stageW= 500;
var stageH= 500;

//draw a circular particle  every so often
setInterval(drawParticle,1000/30);
//make an array to store all the particles
var particles = [];
//generate a bunch of particles right away
for(var i=0; i<50;i++){
	particles.push(new Particle());	
}
/**
  *class sets up a new particle with its own 
  * random position, velocity, color, size
  *
  */

function Particle(){
	this.x = Math.random()*stageW;
	this.y = Math.random()*stageH;
	//velocity: how many pixels this particle moves each time
	this.vx = Math.random()*20-10;
	this.vy = Math.random()*20-10;
	//random size for the particle between 20 and 40
	this.radius = Math.random()*20+20;
	//random RGBA color for each pixel
	var r = Math.random()*255>>0;
	var g= Math.random()*255>>0;
	var b= Math.random()*255>>0;
	this.color = 'rgba('+r+','+g+','+b+',.5)';
	}
/**
  *this method redraws the background 
  * then redraws all the particles moved a bit
  *
  */

function drawParticle(){
	ctx.globalCompositeOperation="source-over";
	ctx.fillStyle = 'rgba(0,0,0,.5)';
	//fill rect(positionx ,starting y ,width ,height);
ctx.fillRect(0,0,500,500);
//blend the partilces with background
ctx.globalCompositeOperation="lighter";

	for(var t=0;t<particles.length; t++){
		//draw a circle
		ctx.beginPath();
		//build a gradient fill
		var gradient = ctx.createRadialGradient(
		particles[t].x,
		particles[t].y,
		0,
		particles[t].x,
		particles[t].y,
		particles[t].radius)
		gradient.addColorStop(0, "white");// at center, gradient is white
		gradient.addColorStop(0.4, "white");// 40% of the way out, still white, gradient is white
		gradient.addColorStop(0.4, particles[t].color);// then color
		gradient.addColorStop(1, "black");// at center, gradient is white
		
		//specify a fill
		ctx.fillStyle=gradient;
		ctx.arc(particles[t].x,particles[t].y, particles[t].radius, Math.PI*2, false);
		ctx.fill();
		
		//move the particle"s position a little for next
		particles[t].x+=particles[t].vx;
		particles[t].y+=particles[t].vy;
		//if particles heads left off the left edge
		if (particles[t].x <-50) particles[t].x=550
		//if particles heads right off the right edge
		if (particles[t].x >550) particles[t].x=-50
		//if particles heads left off the left edge
		if (particles[t].y <-50) particles[t].y=550
		//if particles heads left off the left edge
		if (particles[t].y >550) particles[t].y=-50
	}//end for loop
}//end function drawParticle