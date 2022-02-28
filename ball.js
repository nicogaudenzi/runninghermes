class Ball{
    constructor(x,y,r, ctx){
        this.x = x;
        this.y = y;
        this.r = r;
        this.ctx = ctx;
    }

    drawBall(){
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        this.ctx.strokeStlye = "black";
        this.ctx.stroke();
        this.ctx.fillStyle ="red";
        this.ctx.fill();
    }
}