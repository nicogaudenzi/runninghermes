//Walls are line segments between two points
class Wall{
    constructor(x1, y1, x2, y2){
        this.start = new Vector(x1, y1);
        this.end = new Vector(x2, y2);
        this.center = this.start.add(this.end).mult(0.5);
        this.length = this.end.subtr(this.start).mag();
        this.refStart = new Vector(x1, y1);
        this.refEnd = new Vector(x2, y2);
        this.refUnit = this.end.subtr(this.start).unit();
        this.angVel = 0;
        this.angle = 0;
    }

    drawWall(){
        let rotMat = rotMx(this.angle);
        let newDir = rotMat.multiplyVec(this.refUnit);
        this.start = this.center.add(newDir.mult(-this.length/2));
        this.end = this.center.add(newDir.mult(this.length/2));
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }

    keyControl(){
        if(LEFT){
        console.log("Here")

            this.angVel = -0.1;
        }
        if(RIGHT){
            this.angVel = 0.1;
        }
    }

    reposition(){
        this.angle += this.angVel;
        this.angVel *= 0.99;
    }

    wallUnit(){
        return this.end.subtr(this.start).unit();
    }
}