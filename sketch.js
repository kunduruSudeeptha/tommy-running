var forest,forestImg
var boy,boyImg
var dog,dogImg
var rockImg
var invisibleBlock
var PLAY = 1
var END = 0
var gameState = PLAY
var scoredisplay=0

function preload(){
forestImg=loadImage("forest (2).jpg")
boyImg=loadImage("boy.gif")
rockImg=loadImage("rock2.png")
gameOverImg=loadImage("gameOver.png")
}

function setup(){

  createCanvas(windowWidth,windowHeight)

  forest=createSprite(100,height,width,2)
  forest.addImage("forest1",forestImg)
  forest.scale=2
  forest.velocityX=100
  forest.y=height/2.1
  forest.x=width/2

  invisibleGround = createSprite(width/2,height-60,width,125);  
  
  boy=createSprite(80,height-235,20,50);
  boy.addImage("boy_moving",boyImg);
  boy.scale=0.4

  gameOver = createSprite(width/2,height/2- 30);
  gameOver.addImage(gameOverImg);
  
  gameOver.scale = 0.1;

  gameOver.visible = false;

  rockG=new Group();
  coinsG=new Group();

  boy.setCollider("rectangle",0,0,350,boy.height);
  boy.debug = true
}

function draw()
{
  background("white")

  if (gameState===PLAY){

    scoredisplay = scoredisplay + Math.round(getFrameRate()/60);
    forest.velocityX = -(6 + 3*scoredisplay/100);

    if (forest.x < 0){
      forest.x = forest.width/2;
    }

    boy.velocityX=0.1
  if(keyDown("space")&& boy.y >= 100) {
    boy.velocityY = -12;
  }
    boy.velocityY = boy.velocityY + 0.8
    boy.collide(invisibleGround);
    spawnRocks()

  if(boy.isTouching(rockG)){
     gameState=END
  }
}


  else if (gameState === END) {
    gameOver.visible = true;
    
    boy.velocityX = 0;
    boy.visible=false
    
    rockG.velocityYEach= 0
    rockG.setLifetimeEach(-1);

    forest.velocityX=0
   
 }

  drawSprites()
  textSize(20);
  fill("black")
  text("Score: "+ scoredisplay,10,30)

}


function spawnRocks(){
  if (frameCount%100===0){
  var rock=createSprite(600,height-160,20,30)
  rock.velocityX = -(6 + 3*scoredisplay/100);
  rock.x=Math.round(random(width/1,width/1))
  rock.addImage(rockImg)
  rock.velocityX=-4
  rock.lifetime=800
  rock.scale=0.1
  rockG.add(rock)

  }
}