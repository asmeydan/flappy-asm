const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth*29/30;
canvas.height = window.innerHeight*29/30;


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

        if(this.position.y+this.height+this.velocity.y<=canvas.height) {
            this.velocity.y += 0.5;
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




const platforms = [new Platform({x: 500, y: 250}),
    new Platform({x: 700, y: 350}),
    new Platform({x: 900, y: 250}),
    new Platform({x: 1100, y: 150}),
    new Platform({x: 1300, y: 50})]
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
                document.querySelector(".container").style.display = "flex";
                document.querySelector(".lose").style.display = "flex";
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


window.addEventListener("keydown",({keyCode}) => {
    console.log(keyCode);
    if(keyCode == 87) {
        console.log("up");
        player.velocity.y = -10;
    }
})


function reset() {
    document.querySelector(".container").style.display = "none";
    document.querySelector(".win").style.display = "none";
    document.querySelector(".lose").style.display = "none";
    player.position.x = 100;
    player.position.y = 100;
    speed = 5;
    finish.position.x = 1700;
    console.log(platforms[(0)].open)


    platforms[0].position.x = 500;
    platforms[1].position.x = 700;
    platforms[2].position.x = 900;
    platforms[3].position.x = 1100;
    platforms[4].position.x = 1300;

}



document.querySelector("#btn2").addEventListener("click", reset);
document.querySelector("#btn1").addEventListener("click", reset);
