class Cannon {
  constructor(){
    this.pos = createVector(50,350)
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.angle = 0;
  }
  
  update(){
    this.acc.limit(5)
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.mult(0.99)
    this.acc.set(0,0);
    if(this.pos.y>=height-50){
      this.vel.set(0,0)
    } else if(this.pos.y <= 150){
      this.vel.set(0,0)
    }
    
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  fire(){
    // this.pos.set(this.pos,0)
  }
  
  show(){
    push()
    stroke(0)
    rectMode(CENTER)
    translate(this.pos.x,this.pos.y)

   
    noStroke()
    if(hatLevel==1){
      fill(0)
      rect(0,-10,10,10)
      rect(0,-10,20,2)
    } else if(hatLevel==2){
      fill(0)
      rect(0,-10,10,10)
      rect(0,-10,20,2)
      fill(255,0,0)
      rect(0,-17.5,10,5)
      rect(0,-15,20,2)
    } else if(hatLevel==3){
      fill(0)
      rect(0,-10,10,10)
      rect(0,-10,20,2)
      fill(255,0,0)
      rect(0,-17.5,10,5)
      rect(0,-15,20,2)
      fill(0,255,0)
      rect(0,-22.5,10,5)
      rect(0,-20,20,2)
    } else if(hatLevel==4){
      fill(0)
      rect(0,-10,10,10)
      rect(0,-10,20,2)
      fill(255,0,0)
      rect(0,-17.5,10,5)
      rect(0,-15,20,2)
      fill(0,255,0)
      rect(0,-22.5,10,5)
      rect(0,-20,20,2)
      fill(0,255,0)
      rect(0,-22.5,10,5)
      rect(0,-20,20,2)
      fill(0,0,255)
      rect(0,-27.5,10,5)
      rect(0,-25,20,2)
    } else if(hatLevel==5){
      fill(255, 215, 0)
      rect(0,-40,10,50)
      rect(0,-20,30,2)

    }


    noFill()
    stroke(0)

    rotate(this.angle)
    if(!gameWon){
      rect(20,0,40,10)
      fill(0)    
      circle(0,0,20)
      strokeCap(SQUARE);
      strokeWeight(10);
      line(0,0,map(timer,0,delayLength,0,40),0)
    } else {
      stroke(255, 215, 0)
      rect(20,0,40,20)
      fill(255, 215, 0)    
      circle(0,0,40)
      strokeCap(SQUARE);
      strokeWeight(20);
      line(0,0,map(timer,0,delayLength,0,40),0)
    }
    pop()
  }
}

