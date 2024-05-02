let bc = randomColor();
let players = [];
let amount = 1200;
let follow = false;

function setup() {
    let canvas = createCanvas(1000, 1000);
    canvas.removeAttribute("style");

    frameRate(30);
    for (let i = 0; i < amount; i++) {
        players.push(new player(vector2(width / 2, height / 2)))
    }
    console.log(players);
}

function draw() {
    background(bc.r, bc.g, bc.b);
    for (let i = 0; i < players.length; i++) {
        players[i].show();
        players[i].bounds();
    }
}

function player(pos) {
    this.pos = pos;
    this.dir = randomVector2();
    this.speed = Math.random();
    this.c = mixColor(reverseColor(bc), randomColor(), 0.65);
    this.r = 20;

    this.show = function() {
        noStroke();
        fill(this.c.r, this.c.g, this.c.b, 200);
        circle(this.pos.x, this.pos.y, this.r);

        if (follow) {
            let mousePos = { x: mouseX, y: mouseY };
            let Fdir = vectorToTarget(mousePos, this.pos);

            this.pos.x += Fdir.x * this.speed;
            this.pos.y += Fdir.y * this.speed;
        } else {
            this.pos.x += this.dir.x * this.speed;
            this.pos.y += this.dir.y * this.speed;
        }
    }

    this.bounds = function() {
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y < 0) this.pos.y = height;
    }

    return this;
}

function randomizeColors() {
    bc = randomColor();
    for (let i = 0; i < players.length; i++) {
        players[i].c = mixColor(reverseColor(bc), randomColor(), 0.8);
    }
}

function reverseColors() {
    bc = reverseColor(bc);
    for (let i = 0; i < players.length; i++) {
        players[i].c = reverseColor(players[i].c);
    }
}

function toggleFollow() {
    follow = !follow;
}

function randomC() {
    return Math.random() * 255;
}

function reverseC(c) {
    return (1 - (c / 255)) * 255;
}

function mousePressed() {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return

    for (let i = 0; i < players.length; i++) {
        players[i].pos = vector2(mouseX, mouseY);
    }
}

function randomColor() {
    return { r: randomC(), g: randomC(), b: randomC() };
}

function reverseColor(c) {
    return { r: reverseC(c.r), g: reverseC(c.g), b: reverseC(c.b) };
}

function reverseVector(v) {
    let x = 1 - v.x;
    let y = 1 - v.y;
    return { x: x, y: y };
}

function vector2(x, y) {
    return { x: x, y: y };
}

function randomVector2() {
    let v = p5.Vector.random2D();
    return { x: v.x, y: v.y };
}

function mixColor(c1, c2, ratio) {
    let r = (ratio * c1.r) + ((1 - ratio) * c2.r);
    let g = (ratio * c1.g) + ((1 - ratio) * c2.g);
    let b = (ratio * c1.b) + ((1 - ratio) * c2.b);
    return { r: r, g: g, b: b };
}

function mixVector(v1, v2, ratio) {
    let x = (ratio * v1.x) + ((1 - ratio) * v2.x);
    let y = (ratio * v1.y) + ((1 - ratio) * v2.y);
    return { x: x, y: y };
}

function vectorToTarget(pos1, pos2) {
    let x = pos1.x - pos2.x;
    let y = pos1.y - pos2.y;
    let v = createVector(x, y).normalize();
    return { x: v.x, y: v.y };
}