//create variables 
//1. backgrnd 2.bckgrndimg
//3. monkey 4. monkey_running
//5.ground,ground_img
var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;



//make groups for food and obstacles
//make var for score and give it 0


function preload() {
  //load the images of background here
 backImage=loadImage("jungle2.jpg");


  //load the animation of the monkey here
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  //load the image of banana here(use Banana.png)
  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
 
}

function setup() {
  //craeted the canvas already
  createCanvas(800, 400);

  //create the background sprite here,add the image and give it some - velocity
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;

  //also use scale and   backgrnd.x=backgrnd.width/2;--to reset it back to the centre


  //create the monkey sprite here,add the animation,scale it if required
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;


  //create the ground here,give the velocityX,make the ground invisible

  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  



  //create the groups here---food and obstacle
  //eg: FoodGroup = new Group();
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;

}

function draw() {

  background(255);

  //if statement for the ground and backgrnd to reset as it goes out of the canvas from the left
  //eg 
  // if(ground.x<0) {
  // ground.x=ground.width/2;
  //}

  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  //do the same for bckgrnd

  //if statement when the food group is going the touch the player
  //destroy the foodgroup and increase the score
  if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;

  }

  //when the score increases to 10, the scale of the monkey increases
  //do the same for 3 more cases(20,30,40)
  // i have done it for case 10

  switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.16;
                break;
        case 30: player.scale=0.20;
                break;
        case 40: player.scale=0.24;
                break;
        default: break;
    }

  //make the monkey jump here using the space bar
  if(keyDown("space") ) {
      player.velocityY = -12;
    }


  //gravity here
  player.velocityY = player.velocityY + 0.8;


  //make the monkey collide with the ground
   player.collide(ground);


  spawnFood();
    spawnObstacles();

  //change the scale of the monkey if it touches the obstacle
  if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;

  }

  drawSprites();

  //displaying of the score>>>already done
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}
function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
