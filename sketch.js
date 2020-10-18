var bananaImage, obstacleImage, backImage, monkeyanime;
var obstacleGroup, bananaGroup;
var background_, monkey;
var score;



function preload(){
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  monkeyanime = loadAnimation ("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backImage = loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(600, 300);
  
  background_ = createSprite(300, 120, 20, 20);
  background_.addImage(backImage);
  background_.velocityX = -3;
  background_.x = background_.width/2;
  
  monkey = createSprite(100, 240, 20, 20);
  monkey.addAnimation("monkeyimage",monkeyanime);
  monkey.scale = 0.10;
  
  ground = createSprite(300, 290, 600, 10);
  ground.visible = false;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  score = 0;
}

function draw() {
  background(255);
  
  if(background_.x < 0){
    background_.x = background_.width/2;
  }
  
  if(keyDown("space") && monkey.y > 230){
    monkey.velocityY = -15;
  }
  
  monkey.collide(ground);
  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.10;
    score = 0; 
  }
  
  switch(score){
      case 10: monkey.scale = 0.12;
      break;
      case 20: monkey.scale = 0.14;
      break;
      case 30: monkey.scale = 0.16;
      break;
      case 40: monkey.scale = 0.18;
      break;
      default:break;}
  
  spawnObstacle();
  
  spawnBanana();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE : " + score, 500, 50);
  
  //console.log(monkey.y)
}
function spawnObstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(600, 270, 40, 40);
    obstacle.velocityX = -6;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.15;
    obstacle.addImage(obstacleImage);
  }}

function spawnBanana(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600, 270, 40, 40);
    banana.y = Math.round(150, 200);
    banana.velocityX = -5;
    banana.lifetime = 120;
    bananaGroup.add(banana);
    banana.scale = 0.05 ;
    banana.addImage(bananaImage);
  }}
