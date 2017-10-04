/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var canvas = document.createElement('canvas');
  canvas.width = 1110;
  canvas.height = 520;
  var extraSpace=160;
  
  canvas.style.backgroundColor = '#EfE';
 
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  
  var mouseX=0;
  var mouseY=0;
  //var tenFeetTaller = new Audio('http://k003.kiwi6.com/hotlink/wcy6sh5q7q/10feetTaller.mp3');
  var tenFeetTaller = new Audio('sounds/10feetTaller.mp3');
 
  //var highEnergySound = new Audio('http://k003.kiwi6.com/hotlink/3ct9xggge9/highEnergy.mp3');
  var highEnergySound = new Audio('sounds/highEnergy.mp3');
var img=new Image();
//img.src="files/images/ball3.png";
img.src="images/ball3.png";
var brokenBrick=new Image();
//brokenBrick.src="files/images/brokenBrick.png";
brokenBrick.src="images/brokenBrick.png";
var winImg=new Image();
//winImg.src="files/images/win.png";
winImg.src="images/win.png";
var imgBrick=new Image();
   // imgBrick.src="files/images/brick3.png";
   imgBrick.src="images/brick3.png";
    var gameOverImg=new Image();
    //gameOverImg.src="files/images/gameOver.png";
    gameOverImg.src="images/gameOver.png";
var sombrero=new Image();
//sombrero.src="files/images/sombrero.png";
sombrero.src="images/sombrero.png";

var rightPressed=false;
var leftPressed=false;
var ballX=100;
var ballY=canvas.height-50;
var ballRot=0;
var maxPaddleSpeed=15;

var paddleAcelleration=0.5;
var paddleSpeed=0;

var highEnergy=1.0;
var speed=4.5;
var directionX=Math.sqrt(2)/2;
var directionY=-Math.sqrt(2)/2;
var spin=1;
var ballRadius=25;
var paddleX=100;
var paddleSize=120;
var hp=5;
var score=0;
var brickWidth=95;
var brickHeight=50;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var bricks=[];
//var song = new Audio('http://k003.kiwi6.com/hotlink/e422d21icw/song1.mp3');
var song = new Audio('sounds/song1.mp3');
//var introSong = new Audio('https://k003.kiwi6.com/hotlink/xaui8ou8e0/introSong.mp3');
var introSong = new Audio('sounds/introSong.mp3');
//var losthp = new Audio('http://k003.kiwi6.com/hotlink/c97afu6sfk/losthp.mp3');
var losthp = new Audio('sounds/losthp.mp3');
//var brickCrack = new Audio('http://k003.kiwi6.com/hotlink/3hileyz2b1/crack.mp3');
var brickCrack = new Audio('sounds/crack.mp3');
var time=0;
var started=false;
var mode='1';

canvas.onmousedown = handleMouseDown;
  canvas.onmousemove=handleMouseMove;
function setLevel1(){
    directionX=Math.sqrt(2)/2;
directionY=-Math.sqrt(2)/2;
    hp=5;
    score=0;
    speed=4.5;
    spin=1;
    started=false;
    mode='1';
    time=0;
    ballX=115;
    ballY=canvas.height-50;
    paddleX=100;
    paddleSpeed=0;
    setTimeout(function(){song.play();}, 3000);
   bricks=[];
    for(var i=0;i<8;i++){
   var b = {x:i*105+50, y:25, active:true}; 
   bricks.push(b);
   var b2 = {x:i*105+50, y:135, active:true}; 
   bricks.push(b2);
}
for(var i=0;i<9;i++){
   var b = {x:i*105+10, y:80, active:true}; 
   bricks.push(b);
}
}

function setLevel2(){
    directionX=Math.sqrt(2)/2;
directionY=-Math.sqrt(2)/2;
    started=false;
    mode='2';
    time=0;
    score=0;
   
    
    
    song.play();
    song.volume=0.07;
    setTimeout(function(){song.play();}, 3000);
     setTimeout(function(){song.volume=1;}, 3000);
    tenFeetTaller.play();
    
   
  
    ballX=125;
    ballY=canvas.height-50;
    paddleX=100;
    paddleSpeed=0;
   bricks=[];
    for(var i=0;i<8;i++){
   var b = {x:i*105+50, y:25, active:true}; 
   bricks.push(b);
   var b2 = {x:i*105+50, y:135, active:true}; 
   bricks.push(b2);
}
for(var i=0;i<9;i++){
   var b = {x:i*105+10, y:80, active:true}; 
   var b2 = {x:i*105+10, y:195, active:true};
   bricks.push(b);
   bricks.push(b2);
}
}

function setLevel3(){
    directionX=Math.sqrt(2)/2;
directionY=-Math.sqrt(2)/2;
    started=false;
    mode='3';
    time=0;
    score=0;
    spin=2.35;
    speed=5.55;
    
    
song.volume=0;
   highEnergySound.play();
   
    setTimeout(function(){song.play();}, 3000);
    setTimeout(function(){song.volume=1;}, 3000);
    ballX=125;
    ballY=canvas.height-50;
    paddleX=100;
    paddleSpeed=0;
   bricks=[];
    for(var i=0;i<8;i++){
   var b = {x:i*105+50, y:10, active:true}; 
   bricks.push(b);
   var b2 = {x:i*105+50, y:110, active:true}; 
   bricks.push(b2);
   var b3 = {x:i*105+50, y:210, active:true}; 
   bricks.push(b3);
}
for(var i=0;i<9;i++){
   var b = {x:i*105+10, y:60, active:true}; 
   var b2 = {x:i*105+10, y:160, active:true};
   bricks.push(b);
   bricks.push(b2);
}
}


function draw() {
    document.body.style.cursor = "auto";
    if(mode==='gameover'){
        ctx.drawImage(gameOverImg,0,0, canvas.width,canvas.height);
        if(mouseX>200 && mouseX<950 && mouseY>200 && mouseY<900){
            document.body.style.cursor = "pointer";
        }
        
        return;
    }
    if(mode==='win'){
        ctx.drawImage(winImg,0,0, canvas.width,canvas.height);
        if(mouseX>200 && mouseX<950 && mouseY>200 && mouseY<900){
            document.body.style.cursor = "pointer";
        }
        
        return;
    }
    
    if(score>=bricks.length){
        song.pause();
        song.currentTime = 0;
        if(mode==='1'){
            setLevel2();
        }
         else if(mode==='2'){
            setLevel3();
        }
        else if(mode==='3'){
            mode='win';
        }
        
       
        
    }
        time++;
    if(time<250 && time>2){
        if(mode==='1' && started===false){
        ctx.fillStyle = '#11E';
        ctx.font = "75px Comic Sans MS";
        ctx.fillText("Level 1: ",canvas.width/2-260,canvas.height/2+45);
        ctx.font = "55px Comic Sans MS";
        ctx.fillText("Give me a brick",canvas.width/2-260,canvas.height/2+95);
        }
        else if(mode==='2' && started===false){
        ctx.fillStyle = '#11E';
        ctx.font = "75px Comic Sans MS";
        ctx.fillText("Level 2: ",canvas.width/2-260,canvas.height/2+55);
        ctx.font = "55px Comic Sans MS";
        ctx.fillText("Ten feet taller",canvas.width/2-260,canvas.height/2+105); 
        }
        
         else if(mode==='3' && started===false){
           ctx.fillStyle = '#11E';
        ctx.font = "75px Comic Sans MS";
        ctx.fillText("Level 3: ",canvas.width/2-260,canvas.height/2+80);
        ctx.font = "55px Comic Sans MS";
        ctx.fillText("High energy",canvas.width/2-260,canvas.height/2+135); 
        }
        started=true;
        return;
    }

    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    ctx.beginPath(); 
ctx.fillStyle='#F88';
ctx.fillRect(canvas.width-extraSpace,0,extraSpace,canvas.height/3);
ctx.fillStyle='#EEE';
ctx.fillRect(canvas.width-extraSpace,canvas.height/3,extraSpace,canvas.height/3); 
ctx.fillStyle='#8F8';
ctx.fillRect(canvas.width-extraSpace,2*canvas.height/3,extraSpace,canvas.height/3); 
ctx.fillStyle='#333';
ctx.fillRect(canvas.width-extraSpace,0,20,canvas.height); 

    ballX+=speed*highEnergy*directionX;
    ballY+=speed*highEnergy*directionY;
    if(highEnergy>1){
        highEnergy=1+(highEnergy-1)*0.98;
    }
    else if(highEnergy<1){
        highEnergy=1-(1-highEnergy)*0.98;
    }
    ballRot=(ballRot+0.01*spin*speed*highEnergy);

ctx.fillStyle = '#811';
ctx.font = "25px Comic Sans MS";
ctx.fillText('score:',canvas.width-100,55);
ctx.drawImage(brokenBrick,canvas.width-168,15, brokenBrick.width*0.73, brokenBrick.height*0.73);
ctx.fillStyle = '#111';
ctx.font = "30px Comic Sans MS";
var bonus=0;
if(mode==='2'){
    bonus=25;
}
else if(mode==='3'){
    bonus=59;
}
ctx.fillText(score+bonus,canvas.width-83,100);

ctx.fillStyle = '#555';
ctx.font = "30px Comic Sans MS";
ctx.fillText('lives:',canvas.width-113,210);
for(var i=0; i<Math.min(hp,3);i++){
    ctx.drawImage(sombrero,canvas.width-138+i*40,215, sombrero.width*0.27, sombrero.height*0.27);
}
for(var i=0; i<Math.min(hp-3,2);i++){
    ctx.drawImage(sombrero,canvas.width-128+i*40,265, sombrero.width*0.27, sombrero.height*0.27);
}
ctx.fillStyle = '#161';
ctx.font = "30px Comic Sans MS";

if(mode==='1'){
    
    ctx.fillText('Level 1:',canvas.width-123,410);
    ctx.font = "22px Comic Sans MS";
    ctx.fillText('Give me a',canvas.width-123,450);
    ctx.fillText('brick',canvas.width-103,490);
}
else if(mode==='2'){
    
    ctx.fillText('Level 2:',canvas.width-123,410);
    ctx.font = "22px Comic Sans MS";
    ctx.fillText('Ten feet',canvas.width-123,450);
    ctx.fillText('taller',canvas.width-103,490);
}
else if(mode==='3'){
    
    ctx.fillText('Level 3:',canvas.width-123,410);
    ctx.font = "22px Comic Sans MS";
    ctx.fillText('High energy',canvas.width-129,460);
    
}
//draw MexicoBall    
ctx.save();
ctx.translate(ballX,ballY);
ctx.rotate(ballRot);
ctx.drawImage(img,-23,-23,60,50);
ctx.restore();

//draw Paddle

if(rightPressed){
   paddleSpeed += paddleAcelleration; 
}
if(leftPressed){
    paddleSpeed -= paddleAcelleration; 
}
if(!rightPressed && !leftPressed){
     paddleSpeed*=0.98;
}
if(paddleX<0){
    paddleSpeed=0.9*Math.abs(paddleSpeed); 
     
}
if(paddleX+paddleSize+extraSpace>canvas.width){
   paddleSpeed=-0.9*Math.abs(paddleSpeed);
}

paddleSpeed*=0.95;

paddleX+=paddleSpeed;






ctx.beginPath(); 
ctx.fillStyle='#222';
ctx.fillRect(paddleX,canvas.height-20,paddleSize,18); 

//draw bricks:
for(var i=0; i<bricks.length;i++){
    b=bricks[i];
    ctx.beginPath(); 
ctx.fillStyle='#A33';
if(b.active){
    
    ctx.drawImage(imgBrick,b.x,b.y,brickWidth,brickHeight);
//ctx.fillRect(b.x,b.y,brickWidth,brickHeight); 

    }
}
//check collision with brick
for(var i=0; i<bricks.length;i++){
    b=bricks[i];
    if(b.active===false){
            continue;
    }
    
    var closestX=0;
    var closestY=0;
    if(ballX>b.x && ballX<b.x+brickWidth){
        closestX=ballX;
    }
    else if(ballX>=b.x+brickWidth){
        closestX=b.x+brickWidth;
    }
    else if(ballX<=b.x){
        closestX=b.x;
    }
    
     if(ballY>b.y && ballY<b.y+brickHeight){
        closestY=ballY;
    }
    else if(ballY>=b.y+brickHeight){
        closestY=b.y+brickHeight;
    }
    else if(ballY<=b.y){
        closestY=b.y;
    }
    
    
        if(Math.sqrt(Math.pow(closestX-ballX,2)+Math.pow(closestY-ballY,2))<ballRadius){
            b.active=false;
            
            
             if(ballX>b.x&&ballX<b.x+brickWidth){
                directionY*=-1;
            }
            else{
                directionX*=-1;
            }
           
            score++;
           brickCrack.play();
            break;
        }
    
    
    
}



//check mexicoBall colisions:
if (ballX+ballRadius+extraSpace>canvas.width){
    directionX=-directionX;
    spin=-spin;
}
if (ballX-ballRadius<0){
    directionX=-directionX;
    spin=-spin;
}


//odraz
if(ballY+ballRadius+20>canvas.height && !(ballX+ballRadius<paddleX || ballX-ballRadius>paddleX+paddleSize)){
    //we hitted the paddle
    highEnergy+=Math.abs(paddleSpeed/10);
    directionX+=paddleSpeed*0.35;
    directionY=-Math.abs(directionY+Math.abs(paddleSpeed*0.25));
    var norm=Math.sqrt(directionX*directionX+directionY*directionY);
    directionX/=norm;
    directionY/=norm;
    spin=-spin;
}


if (ballY+ballRadius>canvas.height){
    if(!(ballX<paddleX || ballX>paddleX+paddleSize)){
    directionY=-directionY;
    spin=-spin;
    }
    else{
        hp--;
        song.volume=0.0;
        setTimeout(function(){song.volume=1;}, 2500);
        losthp.play();
        if(hp<=0){
            mode='gameover';
            //game over
     
        }
        else{
            //respawn MexicaBall
            ballX=paddleX+50;
            ballY=canvas.height-50;
            directionX=Math.SQRT2/2;
            directionY=-Math.SQRT2/2;
            time=0;
        }
        
    }
}
if (ballY-ballRadius<0){
    directionY=-directionY;
    spin=-spin;
}



}



function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


var imgHeroin=new Image();
//imgHeroin.src="files/images/ballWithHeroin.png";
imgHeroin.src="images/ballWithHeroin.png";
var imgCash=new Image();
imgCash.src="images/cash.png";
var backgroundBorder=new Image();
backgroundBorder.src="images/backgroundBorder.png";
var backgroundBorder2=new Image();
backgroundBorder2.src="images/backgroundBorder2.png";
var backgroundBorder3=new Image();
backgroundBorder3.src="images/backgroundBorder3.png";
var backgroundBorder4=new Image();
backgroundBorder4.src="images/backgroundBorder4.png";
var backgroundBorder5=new Image();
backgroundBorder5.src="images/backgroundBorder5.png";
var introText=new Image();
introText.src="images/introText.png";
var maga=new Image();
maga.src="images/magaHat.png";
var trump=new Image();
trump.src="images/trump.png";
var timeAnimation=0;
var heroinX=-100;
var heroinY=140;
var cashX=2300;
var cashY=200;
    //var speech = new Audio('http://k003.kiwi6.com/hotlink/h8waj6ji7a/speech.mp3');
    var speech = new Audio('sounds/speech.mp3');
    var songPlayed=false;
    var speechPlayed=false;  
    //var fantastic = new Audio('http://k003.kiwi6.com/hotlink/vj8gb0dyhq/fantastic.mp3');
    var fantastic = new Audio('sounds/fantastic.mp3');
    
    var fantasticPlayed=false;   
function animationStart(){
    timeAnimation++;
    console.log(timeAnimation);
    if(timeAnimation>4500){
        setLevel1();
        clearInterval(refreshAnimationStart);
        setInterval(draw, 10);
        return;
    }
    if(songPlayed===false){
        introSong.play();
        songPlayed=true;
    }
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(backgroundBorder,0,0,canvas.width,canvas.height);
    if(timeAnimation>2500){
        ctx.drawImage(backgroundBorder2,0,0,canvas.width,canvas.height);
    }
     if(timeAnimation>2800){
        ctx.drawImage(backgroundBorder3,0,0,canvas.width,canvas.height);
    }
      if(timeAnimation>3300){
        ctx.drawImage(backgroundBorder4,0,0,canvas.width,canvas.height);
    }
       if(timeAnimation>3600){
        ctx.drawImage(backgroundBorder5,0,0,canvas.width,canvas.height);
    }
       if(timeAnimation>4000){
        ctx.drawImage(introText,0,0,canvas.width,canvas.height);
        if(introSong.volume>0){
            introSong.volume-=0.002;
        }
        
    }
    heroinX+=1.9;
    heroinY=140+50*Math.abs(Math.sin(heroinX/100));
    cashX-=1.9;
    cashY=140+50*Math.abs(Math.sin(cashX/100));
     ctx.drawImage(imgHeroin,heroinX,heroinY);
     ctx.drawImage(imgCash,cashX,cashY,imgCash.width/1.58,imgCash.height/1.58);
     if(timeAnimation>1570 && timeAnimation<2800){
     ctx.drawImage(trump,canvas.width-250,100, trump.width*0.7,trump.height*0.7);
     if(!speechPlayed){
         introSong.volume=0.04;
         setTimeout(function(){introSong.volume=1;}, 12900);
         speech.play(); 
         speechPlayed=true;
     }
 }
 if(timeAnimation>2800 && timeAnimation<3300){
     ctx.drawImage(maga,canvas.width-180,150, maga.width/2, maga.height/2);
 }
 if(timeAnimation>2650 && !fantasticPlayed){
     fantastic.play();
     fantasticPlayed=true;
 }
 if(timeAnimation<2500){
     ctx.fillStyle = '#111';
ctx.font = "75px Comic Sans MS";
ctx.fillText("On Mexico border...",30,canvas.height-20);
 }
     
    
}
var refreshAnimationStart = setInterval(animationStart, 10);

function handleMouseDown(event) {
   
  if(mode==='gameover' ||mode==='win' ){
        setLevel1();
  }
}
function handleMouseMove(event){
    var rect = canvas.getBoundingClientRect();
  mouseX = event.clientX-rect.left;
  mouseY = event.clientY-rect.top; 
}
