var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = window.innerWidth*29/30;
canvas.height = window.innerHeight*29/30;


const gravity = 0.5;
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30;
        this.height = 30;
    }
    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(player.position.y+player.height+this.velocity.y<=canvas.height) {
            this.velocity.y += gravity;
        }
        else {
            this.velocity.y = 0;
        }
    }
}

var speed = 5;
class Platform {
    constructor({x,y}) {
        this.position = {
            x,
            y
        }
        this.open = 150;
        this.width = 100;
        this.topheight = this.position.y;
        this.bottomheight = canvas.height-(this.position.y+this.open);
        
    }
    draw() {
        c.fillStyle = "blue";
        c.fillRect(this.position.x,0,this.width,this.topheight);
        c.fillRect(this.position.x,this.position.y+this.open,this.width,this.bottomheight);
    }
    update() {
        this.position.x -= speed;
    }
}

class Finish {
    constructor() {
        this.position = {
            x:1700,
            y:0
        }
        this.width = 200;
    }
    draw() {
        c.fillStyle = "green";
        c.fillRect(this.position.x,0,this.width,canvas.height);

    }
    update() {
        this.position.x -= speed;
    }
}




const platforms = [new Platform({x: 500, y: 300}),
    new Platform({x: 700, y: 400}),
    new Platform({x: 900, y: 300}),
    new Platform({x: 1100, y: 200}),
    new Platform({x: 1300, y: 100})]
const player = new Player();
const finish = new Finish();






function animate() {
    c.clearRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(animate);
    player.draw();
    player.update();
    platforms.forEach(platform => {
        platform.draw();
        platform.update();
    });
    finish.draw();
    finish.update();

    platforms.forEach(platform => {
        if(player.position.x+player.width>=platform.position.x
        &&player.position.x<=platform.position.x+platform.width
        &&(player.position.y<=platform.position.y
            ||player.position.y+player.height>=platform.position.y+platform.open)){
                player.velocity.y = 0;
                speed = 0;
                console.log("kaybettin");
                document.querySelector(".container").style.display = "flex";
                document.querySelector(".lose").style.display = "flex";
                document.querySelector(".win").remove();
            }
    })

    if(player.position.x+player.width>=finish.position.x){
        player.velocity.y = 0;
        speed = 0;
        document.querySelector(".container").style.display = "flex";
        document.querySelector(".win").style.display = "flex";
    }
}


animate();


addEventListener("keydown",({keyCode}) => {
    console.log(keyCode);
    if(keyCode == 87) {
        console.log("üst");
        player.velocity.y = -10;
    }
})

function reset() {
    window.location.reload();
}