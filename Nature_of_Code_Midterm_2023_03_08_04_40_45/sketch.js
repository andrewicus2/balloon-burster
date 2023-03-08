let cannonball;
let cannon;
let projectiles = [];
let ct = 0;
let ang;
let chrg=10;
let points = 0;
let timer;
let fireSpeedUpgrade, fireSpeedUpgradeCost = 5, fireSpeedLevel = 0, fireSpeedMax = 4;
let firePwrUpgrade, firePwrUpgradeCost = 5, firePwrLevel = 0, firePwrMax = 4;
let bSpeedUpgrade, bSpeedUpgradeCost = 5, bSpeedLevel = 0, bSpeedMax = 4;
let bSpawnSpeedUpgrade, bSpawnSpeedUpgradeCost = 5, bSpawnSpeedLevel = 0, bSpawnSpeedMax = 4;
let hatUpgrade, hatUpgradeCost = 25, hatLevel = 0, hatLevelMax = 4;
let gameWon = false;


let cooldown,delayLength;

let balloons = [];

function preload(){
  AlloyInk = loadFont("AlloyInk-lgdWw.otf");
}

function setup() {
  const can = createCanvas(400, 600);
  can.parent('sketch-holder');
  cannon = new Cannon(); 
  cooldown = 0;
  delayLength = 2;
  
  fireSpeedUpgrade = createButton('Upgrade Fire Speed ('+fireSpeedUpgradeCost+' pts)');
  fireSpeedUpgrade.mousePressed(upgradeFire);
  fireSpeedUpgrade.parent('button-container')
  
  firePwrUpgrade = createButton('Upgrade Fire Power ('+firePwrUpgradeCost+' pts)');
  firePwrUpgrade.mousePressed(upgradeFirePwr);
  firePwrUpgrade.parent('button-container')

  
  bSpeedUpgrade = createButton('Slow Balloons ('+bSpeedUpgradeCost+' pts)')
  bSpeedUpgrade.mousePressed(upgradebSpeed);
  bSpeedUpgrade.parent('button-container')


  bSpawnSpeedUpgrade = createButton('Increase Balloons Spawn Rate ('+bSpawnSpeedUpgradeCost+' pts)')
  bSpawnSpeedUpgrade.mousePressed(upgradebSpawnSpeed);
  bSpawnSpeedUpgrade.parent('button-container')


  hatUpgrade = createButton('Get a Lovely Hat ('+hatUpgradeCost+' pts)')
  hatUpgrade.mousePressed(upgradeHat);
  hatUpgrade.parent('button-container')
  textFont(AlloyInk);

}

function mousePressed(){
  if(millis()/1000 - cooldown > delayLength){
    projectiles.push(new Projectile(cannon.pos.x,cannon.pos.y))
    projectiles[ct].angle = ang.heading();
    projectiles[ct].fire(chrg);
    cannon.fire();
    ct++;
    cooldown=millis()/1000
  }
}

function upgradeFire(){
  if(points>=fireSpeedUpgradeCost&&fireSpeedLevel<=fireSpeedMax){
    delayLength -= 0.3;  
    points-=fireSpeedUpgradeCost;
    fireSpeedUpgradeCost+=5;
    fireSpeedLevel++;
  } 
  if(fireSpeedLevel > fireSpeedMax){
    fireSpeedUpgrade.html('MAX LEVEL')
  } else {
    fireSpeedUpgrade.html('Upgrade Fire Speed ('+fireSpeedUpgradeCost+' pts)')
  }
}

function upgradeFirePwr(){
  if(points>=firePwrUpgradeCost && firePwrLevel <= firePwrMax){
    chrg+=2;
    points-=firePwrUpgradeCost;
    firePwrUpgradeCost+=5;
    firePwrLevel++;
  }
  if(firePwrLevel > firePwrMax){
    firePwrUpgrade.html('MAX LEVEL')
  } else {
    firePwrUpgrade.html('Upgrade Fire Power ('+firePwrUpgradeCost+' pts)')
  }
}

function upgradebSpeed(){
  if(points>=bSpeedUpgradeCost && bSpeedLevel <= bSpeedMax){
    points-=bSpeedUpgradeCost;
    bSpeedUpgradeCost+=5;
    bSpeedLevel++;
  }
  if(bSpeedLevel > bSpeedMax){
    bSpeedUpgrade.html('MAX LEVEL')
  } else{
    bSpeedUpgrade.html('Slow Balloons ('+bSpeedUpgradeCost+' pts)')
  }
}

function upgradebSpawnSpeed(){
  if(points>=bSpawnSpeedUpgradeCost && bSpawnSpeedLevel <= bSpawnSpeedMax){
    points-=bSpawnSpeedUpgradeCost;
    bSpawnSpeedUpgradeCost+=5;
    bSpawnSpeedLevel++;
  }
  if(bSpawnSpeedLevel > bSpawnSpeedMax){
    bSpawnSpeedUpgrade.html('MAX LEVEL')
  } else{
    bSpawnSpeedUpgrade.html('Increase Balloons Spawn Rate ('+bSpawnSpeedUpgradeCost+' pts)')
  }
}

function upgradeHat(){
  if(points>=hatUpgradeCost && hatLevel <= hatLevelMax){
    points-=hatUpgradeCost;
    hatUpgradeCost+=15;
    hatLevel++;
  }
  if(hatLevel > hatLevelMax){
    hatUpgrade.html('MAX LEVEL')
  } else{
    hatUpgrade.html('Upgrade Hat ('+hatUpgradeCost+' pts)')
  }
}

function draw() {
  background(255);
  
  fill('#4141c0')
  textAlign(CENTER);
  textSize(50);
  textStyle(BOLD);
  text(points,width/2,80)
    
  if(random(1)<map(bSpawnSpeedLevel,0,5,0.02,0.2)){
    let colorCode = floor(random(3))
    balloons.push(new Balloon(random(150,width),height+50,random(10,20),colorCode))
  }
  
  for(let i = balloons.length-1;i>=0;i--){
      if(balloons[i].popped){
        balloons.splice(i,1)
      }
    }
  
  for(let i = projectiles.length-1;i>=0;i--){
      if(projectiles[i].gone){
        projectiles.splice(i,1)
        ct--;
      }
    }

  let helium;
  if(!gameWon){
    helium = createVector(0,map(bSpeedLevel,0,5,-0.02,-0.007));
  } else {
    helium = createVector(0,-0.5)
  }
  
  for(let i=0;i<balloons.length;i++){
    balloons[i].applyForce(helium)
    balloons[i].update();
    balloons[i].show();
    
    for(let j=0;j<projectiles.length;j++){
      if(dist(balloons[i].pos.x,balloons[i].pos.y,projectiles[j].pos.x,projectiles[j].pos.y) < balloons[i].r+projectiles[j].r){
        balloons[i].popped = true;
        points++;
      }
    }
  }
  
  // CANNON
  if(millis()/1000-cooldown <= delayLength){
    timer = millis()/1000-cooldown
  }

  let gravity = createVector(0,0.02)
  
  ang = createVector(mouseX-cannon.pos.x, mouseY-cannon.pos.y)
  cannon.angle = ang.heading();
 
  for(let i=0;i<projectiles.length;i++){
    projectiles[i].show()
    projectiles[i].update();
    projectiles[i].applyForce(gravity)
  }
  
  cannon.show();
  cannon.update();
  
  if(keyIsPressed){
    if(keyCode == 87 && cannon.pos.y > 200){
      cannon.applyForce(createVector(0,-0.1))
    }
    else if(keyCode == 83 && cannon.pos.y <= height - 100){
      cannon.applyForce(createVector(0,0.1))
    } else if(keyCode == 187){
      points++;
    }
  }

  if(fireSpeedLevel==5&&firePwrLevel==5&&bSpeedLevel==5&&bSpawnSpeedLevel==5&hatLevel==5){
    gameWon=true;
    if(random(1)<0.8){
      let colorCode = 5
      balloons.push(new Balloon(random(150,width),height+50,random(10,20),colorCode))
    }  
  }


  if(mouseIsPressed&&gameWon){
    projectiles.push(new Projectile(cannon.pos.x,cannon.pos.y))
    projectiles[ct].angle = ang.heading();
    projectiles[ct].fire(chrg);
    cannon.fire();
    ct++;
  }
  
  
}







