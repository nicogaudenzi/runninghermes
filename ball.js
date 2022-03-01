class Ball{
    constructor(x, y, r,m){
        this.pos = new Vector(x,y);
        this.r = r;
        this.vel = new Vector(0,0);
        this.acc = new Vector(0,0);
        this.acceleration = .5;
        this.player = false;
        this.m = m;
        if (this.m === 0){
            this.inv_m = 0;
        } else {
            this.inv_m = 1 / this.m;
        }
        this.elasticity = 1;
        // BALLZ.push(this);
    }

    drawBall(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    display(){
        this.vel.drawVec(this.pos.x, this.pos.y, 10, "green");
        this.acc.drawVec(this.pos.x, this.pos.y, 100, "blue");
    }
    reposition(){
        this.acc = this.acc.unit().mult(this.acceleration);
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.mult(1-friction);
        this.pos = this.pos.add(this.vel);
    }
    keyControl(){
    
        if(LEFT){
            this.acc.x = -this.acceleration;
        }
        if(UP){
            this.acc.y = -this.acceleration;
        }
        if(RIGHT){
            this.acc.x = this.acceleration;
        }
        if(DOWN){
            this.acc.y = this.acceleration;
        }
        if(!LEFT && !RIGHT){
            this.acc.x = 0;
        }
        if(!UP && !DOWN){
            this.acc.y = 0;
        }
        
        //acceleration vector gets added to the velocity vector
        // b.acc = b.acc.unit().mult(b.acceleration);
        // b.vel = b.vel.add(b.acc);
        // b.vel = b.vel.mult(1-friction);
        // b.pos = b.pos.add(b.vel);
    }
}