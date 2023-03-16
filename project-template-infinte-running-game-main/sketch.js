var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("espaço.jpg");
  boyImg = loadAnimation("foguete.jpg");
  cashImg = loadImage("astronauta.jpg");
  swordImg = loadImage("asteroide.jpg");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
// Movendo plano de fundo
path=createSprite(width / 2,height - 70, width, 2);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=5;

//criar menino correndo 
boy = createSprite(50, height - 180, 20, 50);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.5;
  
  
cashG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para redefinir plano de fundo
  if(path.y > 400 ){
    path.y = height/4;
  }
  
    createCash();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+1;
    }
      




    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
        cashG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouro: "+ treasureCollection,150,30);
  }



function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.2;
  cash.velocityY = 3;
  cash.lifetime = 300;
  cashG.add(cash);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.7;
  sword.velocityY = 3;
  sword.lifetime = 300;
  swordGroup.add(sword);
  }
}