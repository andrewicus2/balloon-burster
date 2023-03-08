class Projectile{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.angle = 0;
    this.fired = false;
    this.gone = false;
    this.r = 5;
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  
  update(){
    if(this.pos.y>height||this.pos.x>width){
      this.gone=true;
    } else {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.angle = this.vel.heading();  
    }
  }
  
  fire(chrg){
    let v = p5.Vector.fromAngle(this.angle);
    v.mult(chrg)
    this.vel.set(v)
    this.fired = true;
  }
  
  show(){
    push()
    noStroke()
    if(gameWon){
      fill(255, 215, 0)
    } else{
      fill('#4141c0')
    }
    stroke('#4141c0')
    translate(this.pos.x,this.pos.y)
    rotate(this.angle)
    circle(0,0, this.r*2);
    rectMode(CENTER)
    // rect(0,0,10);
    // line(0,0,10,0)
    pop()
  }
}