var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var simba, simbaImg, simbaJump, simbaStand, jumpSound;
var ground, groundImg, invisible;
var obstacle, obstaclesGroup;
var score=0;
var coin, coinGroup, coinImg, coinSound;
var gameover, restart, restartImg;



function preload() {
  
  simbaImg = loadAnimation("lion1.png","lion2.png","lion3.png","lion4.png","lion5.png","lion1.png","lion2.png");
  
  
  groundImg = loadImage("Backy4.jpg");
  
  obstacle1 = loadImage("stone.png");
  obstacle2 = loadImage("bush.png");
  obstacle3 = loadImage("barrier.png");
  coinImg = loadImage("coin.png");
  
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.wav");
  coinSound = loadSound("coin.wav");
}

function setup(){
  createCanvas(500,500);
  
  ground = createSprite(0,200,10,10);
  ground.addImage(groundImg);
 // ground.scale = 0.7;
  ground.x = ground.width/2;               
  ground.velocityX = -5; 
  
  simba = createSprite(60,450,10,10);
  simba.addAnimation("simba",simbaImg);
  simba.scale = 0.35;
  
  invisible = createSprite(200,495,1000,10);
  invisible.visible = false;
  
  restart = createSprite(250,300,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  restart.visible = false;
  
  
  obstaclesGroup = new Group(); 
  coinGroup = new Group();
  
  score = 0;
}

function draw(){
  //background("pink");
  
  text("Score: "+ score, 300,50);
  
  console.log(ground.x);
    
  if (gamestate === PLAY){
    
    simba.visible = true;
  
    ground.visible = true;
        
    if (ground.x < 0){
        ground.x = ground.width/2;
      }    
    
    fill("white");    
    text("Score: "+ score, 300,50);
        
    simba.velocityY = simba.velocityY + 0.9;
    console.log(simba.y);
    
    if (keyDown("space") && simba.y >=  200) {
        //jumpSound.play();
        simba.velocityY = -10;
      }

    if (coinGroup.isTouching(simba)){ 
       coinSound.play();
       coinGroup.destroyEach();
       score = score+10;
    }

    
    simba.collide(invisible);
    spawnObstacle();
    spawnCoins();
    
    if (obstaclesGroup.isTouching(simba)){
      gamestate = END;
    }    
  }
  
  if (gamestate === END){
    coinGroup.destroyEach();
    obstaclesGroup.destroyEach();
    simba.collide(invisible);
    simba.visible = false;
    ground.visible = false;
    restart.visible = true;
    background("black");
    textSize(60);
    fill("white");
    stroke("white");
    text("GAMEOVER",80,250);
  }
   
  if(mousePressedOver(restart)) {
    jumpSound.play();
      reset();
  }
  drawSprites();
}

function spawnObstacle(){
  if(frameCount % 90 === 0) {
    var obstacle = createSprite(510,465,10,40);
    obstacle.setCollider("circle",0,0,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6 ;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnCoins(){
  if (frameCount % 160 === 0) {
     var coin = createSprite(600,330,10,10);
      coin.y = Math.round(random(200,300));
      coin.addImage(coinImg);
      coin.scale = 0.1;
      coin.velocityX = -3;
      coin.lifetime=200;
      coinGroup.add(coin);
    
    console.log(coin.y);

    }
}

function reset(){
  gamestate = PLAY;
  restart.visible = false;
   
}