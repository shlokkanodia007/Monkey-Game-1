var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0,survivalTime=0, ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);

  //create monkey
  monkey = createSprite(80,100,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  monkey.setCollider("circle", 0,0, 280);
  monkey.debug=false ;
  
  //create ground
  ground = createSprite(400,350,900,10);
  ground.velocityX= -4;
  ground.x = ground.width /2;
  console.log(ground.x);
 
  invisibleGround = createSprite(200,350,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Food Groups
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
}


function draw() {

  //create background
  background("lightblue");
  
  //display survival time
  textSize(20);
  text("Survival Time: "+ score, 150,50);
  
  //update survival time
  textSize(20);
  score=Math.ceil(frameCount/frameRate());
  //text("Survival Time:"+ survivalTime,300,50); 
    
  
  if(gameState === PLAY){
    
    //move the ground
    ground.velocityX = -(4 + 3*score/100);
    
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    console.log(monkey.y);
    
    //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the food
    spawnFood();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    //change gameState
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
      
    }
  }
  else if (gameState === END) {
  
    survivalTime=0;
    //reset velocity 
    ground.velocityX = 0;
    monkey.velocityY = 0
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
  }
  //make monkey collide with ground
  monkey.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,327,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacleImage);
   obstacle.setCollider("circle",0,0,160);
   obstacle.debug= false;
   
   //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnFood(){
  
  if (frameCount % 80 === 0) {
    banana = createSprite(400,300 ,40,10);
    banana.y = Math.round(random(200,250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
     //adjust the depth
    //banana.depth = monkey.depth;
    //monkey.depth = monkey.depth + 1;
    
    //adding banana to the group
   FoodGroup.add(banana);
  }
}



