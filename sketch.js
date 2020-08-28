var bananaImage, obstacleImage, backgroundImage, score, player, player_running, theme;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload() {
  backgroundimg = loadImage("jungle.png");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}



function setup() {
  createCanvas(600, 400);
  theme = createSprite(300, 200, 600, 400);



  theme.addImage("jungle", backgroundimg);
  theme.scale = 2;
  theme.velocityX = -3;

  theme.x = theme.width / 2;

  player = createSprite(100, 340, 100, 100);
  player.addAnimation("running", player_running);
  player.scale = 0.2;




  obstaclesGroup = new Group();
  foodGroup = new Group();

}

function draw() {
  background(220);

  if (theme.x < 150) {
    theme.x = theme.width / 2;
  }

  if(keyDown("space"))
  {
    player.velocityY=-10;
  }
  player.velocityY=player.velocityY+0.8;
  
  if (foodGroup.isTouching(player)) {
    score = score + 2;
    foodGroup.destroyEach();
  }

  switch (score) {
    case 10:
      player.scale = 0.12;
      break;

    case 20:
      player.scale = 0.14;
      break;

    case 30:
      player.scale = 0.16;
      break;

    case 40:
      player.scale = 0.18;
      break;
    
      case 50:
      player.scale=0.20;
      break;
      
      

    default:
      break;
  }

  if (player.isTouching(obstaclesGroup)) {
    player.scale = 0.2;
    
  }

     if (player.isTouching(obstaclesGroup) && player.scale == 0.2) {
       foodGroup.setVelocityEach(0);
      obstaclesGroup.setVelocityEach(0);

       gameState = END;
       text("Game Over", 300, 200);
       textSize(20);
       
       foodGroup.destroyEach();
       obstaclesGroup.destroyEach();
     }

  food();
  obstacles();
  
  var edge=createEdgeSprites();
  player.collide(edge[3]);
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}

function food() {
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(600, 100, 20, 5);



    banana.scale = 0.05;

    banana.addImage("banana", bananaImage);

    banana.velocityX = -7;
    banana.lifetime = 86;

    banana.y = random(110, 150);
    foodGroup.add(banana);
  }
}

function obstacles() {
  if (World.frameCount % 300 === 0) {
    var obstacle = createSprite(600, 360, 40, 20);


    obstacle.scale = 0.15;
    obstacle.addImage("stone", obstacleImage);

    obstacle.velocityX = -4;

    obstacle.lifetime = 150;


    obstaclesGroup.add(obstacle);

    // obstacle = random(150, 190);
  }
}