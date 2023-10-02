let c = document.getElementById("perlin");
let ctx = c.getContext("2d");
ctx.fillStyle = "rgba(0,0,0)";
ctx.fillRect(0, 0, c.width, c.height);
noise.seed(Math.random());

let num = 100

function print(x) {console.log(x)}

function normalize(vector) {
    let norm = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
    if (norm === 0) {
        return [vector[0], vector[1]]
    }
    return [vector[0]/norm, vector[1]/norm];
}

let grid = [];
make_grid(0)
function make_grid(t) {
    grid = [];
    for (let i = 0; i < 3600; i++) {
        let j = Math.floor(i/80);
        let perlin_noise = noise.perlin3(((i%80+1)/80), ((j+1)/45)*3, t)
        let perlin_noise_2 = noise.perlin3(((i%80+1)/80), ((j+1)/45)*3, t+1)

        let rands = [perlin_noise_2, perlin_noise];
        let normalized = normalize(rands);
        // let normalized = [0, -1]
        grid.push(normalized);
    }
}
stroke_grid()
function stroke_grid() {
    ctx.beginPath()
    ctx.strokeStyle = "white";
    for (let i = 0; i < grid.length; i++) {
        let j = Math.floor(i/80);
        ctx.moveTo(i%80*16, j*16+8);
        ctx.lineTo(i%80*16 + grid[i][0]*5, j*16 + 8 + grid[i][1]*5);
    }
    ctx.stroke();
}

function Particle(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.movementVector = [0, 0];

    this.move = function() {
        const pos = {
            x: this.x,
            y: this.y,
        };
        let selected_vector = Math.round(pos.x/16) + Math.round(80*((pos.y+8)/16));
        if (selected_vector >= 3600) {
            selected_vector = 3599
        }
        if (selected_vector < 0) {
            selected_vector = 0
        }

        this.movementVector[0] += grid[selected_vector][0]/16
        this.movementVector[1] += grid[selected_vector][1]/16
        this.movementVector = normalize(this.movementVector)


        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(pos.x, pos.y);
        let new_pos = [pos.x + this.movementVector[0]*this.speed, pos.y + this.movementVector[1]*this.speed]
        this.x = new_pos[0];
        this.y = new_pos[1];
        ctx.lineTo(new_pos[0], new_pos[1]);
        ctx.stroke();
        if (pos.x > c.width) {
            this.x = 0
        }
        if (pos.x < 0) {
            this.x = c.width
        }
        if (pos.y > c.height) {
            this.y = 0
        }
        if (pos.y < 0) {
            this.y = c.height
        }

    }
}
let particles = []
for (let i = 0; i < num; i++) {
    let part = new Particle(Math.random()*c.width, Math.random()*c.height, 10);
    particles.push(part);
}

let sus = 0;
function anim() {
    requestAnimationFrame(anim);
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    sus++
    if (sus%5 === 0) {
    ctx.fillRect(0, 0, c.width, c.height);
    }
    particles.forEach((particle) => particle.move())
    // make_grid(sus)
    if (sus%60 === 0) {
        make_grid(sus/20)
    }

}
anim();

