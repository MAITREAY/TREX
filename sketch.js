var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score = 0;
var cloudImg, cloudsGroup;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclesGroup;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImg = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}


function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 600, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -2;

  invisibleGround = createSprite(200, 190, 600, 10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(180);

  spawnObstacles();

  spawnClouds();

  // score board
  score = Math.round(getFrameRate() / 4);
  text("Score." + score, 500, 50);


  if (keyDown("space")) {
    trex.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  trex.collide(invisibleGround);
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(610, 160, 50, 50);
    obstaclesGroup.add(obstacle);
    obstacle.velocityX = -2;
    obstacle.lifetime = 320;
    obstacle.depth = trex.depth;
    trex.depth = trex.depth + 1;

    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);break;
      
      case 2: obstacle.addImage(obstacle2);break;
      
      case 3: obstacle.addImage(obstacle3);break;
      
      case 4: obstacle.addImage(obstacle4);break;
      
      case 5: obstacle.addImage(obstacle5);break;
      
      case 6: obstacle.addImage(obstacle6);break;
      
      default:break;


    }
    
    obstacle.scale=0.5;
  }


}

function spawnClouds() {
  if (frameCount % 80 === 0) {
    var cloud = createSprite(610, 100);
    cloud.addImage(cloudImg);
    cloudsGroup.add(cloud);
    cloud.velocityX = -2;
    cloud.y = Math.round(random(100, 0));
    cloud.lifetime = 320;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }

}