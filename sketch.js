var dog, happyDog, database, foodS, foodStock,dogImage;

function preload()
{
   dogImage=loadImage("Dog.png");
   happyDog=loadImage("happydog.png")
}
function setup()
{
  createCanvas(windowWidth/1.5,windowHeight/1.5);
  database=firebase.database();
  dog=createSprite(width/2,height/2+60);
  dog.addImage(dogImage);
  dog.scale=0.3;

  foodStock= database.ref('Food').on("value",function(data)
  {
    foodStock=data.val();
  })
  

}
function draw()
{
  background("coral");

  textAlign(CENTER);
  textSize(25);
  fill("black");
  stroke("yellow");
  strokeWeight(2);
  textFont("Luta")
  text("Press up arrow key to feed the dog",width/2, 30);
  text("Food Stock left for the dog: "+foodStock,width/2,80)

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodStock);
    dog.addImage(happyDog)
  }
  drawSprites();

}
function writeStock(food)
{
  if(food<0)
  {
    food=0;
  }
  else{
    food-=1;
  }
  database.ref('/').update({
    Food:food
  })
}