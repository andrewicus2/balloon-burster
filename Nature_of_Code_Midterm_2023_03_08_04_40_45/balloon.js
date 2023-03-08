class Balloon{
  constructor(x,y,r,c){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.r = r;
    this.sway = random(-10,10);
    this.swayDir = 1;
    switch(c) {
      case 0:
        this.color = color(255,0,0);
        break;
      case 1:
        this.color= color(0,255,0);
        break;
      case 2:
        this.color= color(0,0,255);
        break;
      case 5:
        this.color = color(255, 215, 0)
    }
    this.popped = false;
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0,0);
    
    if(this.pos.y<-this.r*2){
      this.popped=true;
    }
  }
  
  show(){
    push();
    translate(this.pos.x,this.pos.y)
    
    
    angleMode(DEGREES)
    
    
    rotate(this.sway)
    this.sway+=0.1*this.swayDir;
    
    if(this.sway>=10||this.sway<=-10){
      this.swayDir*=-1;
    }
    
    angleMode(RADIANS)

    //string   
    // fill(0);
    // for(let y=this.r;y<this.r*8;y+=this.r/8){
    //   let x = sin(frameCount/15 + map(y, this.r, this.r*8, 0, TWO_PI))
    //   ellipse(x*map(y, this.r,this.r*8,0.1,3)*this.r/8,y,this.r/10)
    // }    
    
    
    fill(this.color);
    //tie off
    beginShape()
    vertex(0,this.r*1.1)
    vertex(this.r*0.2,this.r*1.5)
    vertex(-this.r*0.2,this.r*1.5);
    endShape(CLOSE)
    
    //balloon
    ellipse(0,0,this.r*2, this.r*2.5)
    pop();
  }
}