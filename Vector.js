//a class Vector with basic vector operations
class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    static dot(v,w){
        return v.x * w.x + v.y * w.y;
    }

    add(v){
        return new Vector(this.x+v.x, this.y+v.y);
    }

    subtr(v){
        return new Vector(this.x-v.x, this.y-v.y);
    }

    unit(){
        if(this.mag()===0)return new Vector(0,0);
        else return new Vector(this.x/this.mag(), this.y/this.mag());
    }
    normal(){
        return new Vector(-this.y,this.x).unit();
    }
    

    mag(){
        return Math.sqrt(this.x**2 + this.y**2)
    }

    mult(n){
        return new Vector(this.x*n, this.y*n);
    }

    drawVec(start_x, start_y, n, color){
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }
}