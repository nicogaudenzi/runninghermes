const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const BALLZ = [];
const WALLZ = [];

let LEFT, UP, RIGHT, DOWN;
let friction = 0.08;


document.addEventListener('keydown', function(e){
    if(e.code === "ArrowLeft"){
        LEFT = true;
    }
    if(e.code === "ArrowUp"){
        UP = true;
    }
    if(e.code === "ArrowRight"){
        RIGHT = true;
    }
    if(e.code === "ArrowDown"){
        DOWN = true;
    }
});

document.addEventListener('keyup', function(e){
    if(e.code ===  "ArrowLeft"){
        LEFT = false;
    }
    if(e.code === "ArrowUp"){
        UP = false;
    }
    if(e.code ===  "ArrowRight"){
        RIGHT = false;
    }
    if(e.code ===  "ArrowDown"){
        DOWN = false;
    }
});
function round(number, precision){
    let factor = 10**precision;
    return Math.round(number * factor) / factor;
}

//collision detection between two balls
function coll_det_bb(b1, b2){
    if(b1.r + b2.r >= b2.pos.subtr(b1.pos).mag()){
        return true;
    } else {
        return false;
    }
}

//penetration resolution
//repositions the balls based on the penetration depth and the collision normal
function pen_res_bb(b1, b2){
    let dist = b1.pos.subtr(b2.pos);
    let pen_depth = b1.r + b2.r - dist.mag();
    let pen_res = dist.unit().mult(pen_depth/2);
    b1.pos = b1.pos.add(pen_res);
    b2.pos = b2.pos.add(pen_res.mult(-1));
}


//collision resolution
//calculates the balls new velocity vectors after the collision
function coll_res_bb(b1, b2){
	//collision normal vector
    let normal = b1.pos.subtr(b2.pos).unit();
    //relative velocity vector
    let relVel = b1.vel.subtr(b2.vel);
    //separating velocity - relVel projected onto the collision normal vector
    let sepVel = Vector.dot(relVel, normal);
    //the projection value after the collision (multiplied by -1)
    let new_sepVel = -sepVel;
    //collision normal vector with the magnitude of the new_sepVel
    let sepVelVec = normal.mult(new_sepVel);

    //adding the separating velocity vector to the original vel. vector
    b1.vel = b1.vel.add(sepVelVec);
    //adding its opposite to the other balls original vel. vector
    b2.vel = b2.vel.add(sepVelVec.mult(-1));
}

function momentum_display(){
    let momentum = Ball1.vel.add(Ball2.vel).mag();
    ctx.fillText("Momentum: "+round(momentum, 4), 500, 330);
}
//returns with the closest point on a line segment to a given point
function closestPointBW(b1, w1){
    let ballToWallStart = w1.start.subtr(b1.pos);
    if(Vector.dot(w1.wallUnit(), ballToWallStart) > 0){
        return w1.start;
    }

    let wallEndToBall = b1.pos.subtr(w1.end);
    if(Vector.dot(w1.wallUnit(), wallEndToBall) > 0){
        return w1.end;
    }

    let closestDist = Vector.dot(w1.wallUnit(), ballToWallStart);
    let closestVect = w1.wallUnit().mult(closestDist);
    return w1.start.subtr(closestVect);
}
//collision detection between ball and wall
function coll_det_bw(b1, w1){
    let ballToClosest = closestPointBW(b1, w1).subtr(b1.pos);
    if (ballToClosest.mag() <= b1.r){
        return true;
    }
}
function pen_res_bw(b1, w1){
    let penVect = b1.pos.subtr(closestPointBW(b1, w1));
    b1.pos = b1.pos.add(penVect.unit().mult(b1.r-penVect.mag()));
}
function coll_res_bw(b1, w1){
    let normal = b1.pos.subtr(closestPointBW(b1, w1)).unit();
    let sepVel = Vector.dot(b1.vel, normal);
    let new_sepVel = -sepVel * b1.elasticity;
    let vsep_diff = sepVel - new_sepVel;
    b1.vel = b1.vel.add(normal.mult(-vsep_diff));
}
function randInt(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

//The rotation matrix function
function rotMx(angle){
    let mx = new Matrix(2,2);
    mx.data[0][0] = Math.cos(angle);
    mx.data[0][1] = -Math.sin(angle);
    mx.data[1][0] = Math.sin(angle);
    mx.data[1][1] = Math.cos(angle);
    return mx;
}
function mainLoop(timestamp) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    BALLZ.forEach((b, index) => {
        b.drawBall();
        if (b.player){
            b.keyControl();
        }
        WALLZ.forEach((w) => {
            if(coll_det_bw(BALLZ[index], w)){
                pen_res_bw(BALLZ[index], w);
                coll_res_bw(BALLZ[index], w);
            }
        })

        for(let i = index+1; i<BALLZ.length; i++){
            if(coll_det_bb(BALLZ[index], BALLZ[i])){
                pen_res_bb(BALLZ[index], BALLZ[i]);
                coll_res_bb(BALLZ[index], BALLZ[i]);
            }
        }
        b.display();
        b.reposition();
    });
    WALLZ.forEach((w) => {
        w.drawWall();
        w.keyControl();
        w.reposition();
    })

    //momentum_display();

    requestAnimationFrame(mainLoop);
}
let Wall2 = new Wall(300, 400, 550, 200);

//walls along the canvas edges
let edge1 = new Wall(0, 0, canvas.clientWidth, 0);
let edge2 = new Wall(canvas.clientWidth, 0, canvas.clientWidth, canvas.clientHeight);
let edge3 = new Wall(canvas.clientWidth, canvas.clientHeight, 0, canvas.clientHeight);
let edge4 = new Wall(0, canvas.clientHeight, 0, 0);

WALLZ.push(Wall2);
WALLZ.push(edge1);
WALLZ.push(edge2);
WALLZ.push(edge3);
WALLZ.push(edge4);


for (let i = 0; i < 5; i++){
    let newBall = new Ball(randInt(100,500), randInt(50,400), randInt(20,50), randInt(0,10));
    newBall.elasticity = randInt(0,10) / 10;
    BALLZ.push(newBall);
}

let Ball1 = new Ball(200, 200, 30,5);
BALLZ.push(Ball1);
Ball1.player = true;

requestAnimationFrame(mainLoop);
