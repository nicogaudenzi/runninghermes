const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = 100;
let y = 100;
let x2 = 200;
let y2 = 300;

function mainLoop(){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)
    move();

}
