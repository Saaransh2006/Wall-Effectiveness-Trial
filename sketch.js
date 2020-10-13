//Declaring the variables.
var bullet,wall;
var thickness,speed,weight
var damage,stage;
var sound1,sound2;

//Setup function.
function setup() {
  //Creating the canvas area.
  createCanvas(1600,400);

  //Giving values to the thickness, speed and weight variables.
  thickness = random(22,83);
  speed = random(223,321);
  weight = random(30,52);

  //Creating a wall sprite.
  wall = createSprite(1200,200,thickness,400);
  //Giving it grey color.
  wall.shapeColor = color(80,80,80);
  //Making it invisible.
  wall.visible = false;

  //Creating a bullet sprite.
  bullet = createSprite(20,200,15,10);
  //Giving it white color.
  bullet.shapeColor = "white";
  //Making it invisible.
  bullet.visible = false;

  //Loading sounds to sound1 and sound2 variables.
  sound1 = loadSound("Gun_load.mp3");
  sound2 = loadSound("Gun_shot.wav");

  //Setting stage's value as 1.
  stage = 1;
}

//draw function.
function draw() {
  //Setting background color to black.
  background(0,0,0);

  //Declaring functions when stage's value is 1.
  if(stage === 1) {
    //Displaying text.
    fill("white");
    textSize(20);
    textStyle(BOLD);
    textFont("cursive");
    text("This is a simulator to test the reliability and effectiveness of different walls against different bullets shot by a gun.",20,50);
    text("Based upon the speed and weight of bullet and the thickness of the wall, the damage received by the wall is",20,80);
    text("calculated. The calculation is based on the given formula :-",20,110);
    text("0.5 * weight of bullet * speed of bullet * speed of bullet",20,150);
    text("(Thickness of the wall)",190,190);
    text("~ If damage received is greater than 10, the wall is considered of bad quality.",20,230);
    text("~ If damage received is less than 5, the wall is considered of good quality.",20,260);
    text("~ If damage received is between 5 and 10, wall is considered of average quality.",20,290);
    textSize(15);
    text("3",415,177);
    fill("red");
    textFont("georgia");
    textStyle(ITALIC);
    text("(Press Enter to start the test)",600,370);
    
    //Creating a variable named line1.
    var line1 = createSprite(302,160,565,3);
    //Giving it a lifetime.
    line1.lifetime = 1;
    //Giving it white color.
    line1.shapeColor = "white";

    //Changing stage's value to 2 when enter key is pressed.
    if(keyDown("enter")) {
      stage = 2;
      //Playing sound effects.
      sound1.play();
      sound2.play();
    }
  }

  //Assigning functions when stage's value is 2.
  else if(stage === 2) {
    //Changing bullet's velocity x to the value of speed.
    bullet.velocityX = speed;
    
    //Making bullet and wall visible.
    bullet.visible = true;
    wall.visible = true;
  }

  //Assigning functions when hasCollided function is true.
  if(hasCollided(bullet,wall)) {
    //Setting bullet's x velocity to 0.
    bullet.velocityX = 0;
    //Giving a value to damage variable.
    damage = 0.5*weight*speed*speed / (thickness*thickness*thickness);

    //Changing wall's color based on damage's value.
    if(damage > 10) {
      wall.shapeColor = color(255,0,0);
    }

    if(damage < 5) {
      wall.shapeColor = color(0,255,0);
    }

    if(damage >= 5 && damage <= 10) {
      wall.shapeColor = color(255,255,0);
    }
  }

  //Displaying all the sprites on the canvas.
  drawSprites();  

  //Displaying text when damage's value is 2.
  if(stage === 2) {
    fill("white");
    textSize(20);
    textStyle(BOLD);
    textFont("cursive");
    text("Speed of bullet: " + Math.round(speed),70,50);
    text("Weight of bullet: " + Math.round(weight),400,50);
    text("Thickness of wall: " + Math.round(thickness),730,50);

    if(damage > 10) {
      fill("red");
      text("Status of wall: Bad Quality",380,150);
    }

    if(damage < 5) {
      fill(0,255,0);
      text("Status of wall: Good Quality",380,150);
    }

    if(damage >= 5 && damage <= 10) {
      fill("yellow");
      text("Status of wall: Average",380,150);
    }

    fill("red");
    textFont("georgia");
    textSize(15);
    textStyle(ITALIC);
    text("(Refresh the page to Re-test)",600,370);
  }
  
}

//hasCollided function.
function hasCollided(bullet1, wall1) {
  //Assigning values to two variables, bulletRightEdge and wallLeftEdge.
  bulletRightEdge = bullet1.x + bullet1.width;
  wallLeftEdge = wall1.x;

  //Returning the function true when bulletRightEdge is >= wallLeftEdge; else returning false.
  if(bulletRightEdge >= wallLeftEdge) {
    return true;
  }
  return false;
}