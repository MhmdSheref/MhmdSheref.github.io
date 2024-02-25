let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
let stopped = false

document.getElementById("start").addEventListener("click", function () {
    stopped = false
    main()
})
document.getElementById("stop").addEventListener("click", function () {
    stopped = true
})
function print(x) {console.log(x)}

function normalize(vector) {
    let norm = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
    if (norm === 0) {
        return [vector[0], vector[1]]
    }
    return [vector[0]/norm, vector[1]/norm];
}

let grid = [];


function noise_grid(t) {
    grid = [];
    for (let i = 0; i < 4000; i++) {
        let j = Math.floor(i/80);
        let perlin_noise = noise.perlin3(((i%80+1)/80), ((j+1)/45), t)

        let point = [Math.cos(perlin_noise * Math.PI), Math.sin(perlin_noise * Math.PI)];
        // let normalized = [0, -1]
        grid.push(point);
    }
}

function point_grid(X, Y) {
    grid = [];
    for (let i = 0; i < 4000; i++) {
        let j = Math.floor(i/80);

        let point = [(X)-((i%80+1)*16), (Y)-((j+1)*16)]
        let normalized = normalize(point)
        grid.push(normalized);
    }
}

function outwards(X, Y) {
    grid = [];
    for (let i = 0; i < 4000; i++) {
        let j = Math.floor(i/80);

        let point = [((i%80+1)*16)-(X), ((j+1)*16)-(Y)]
        let normalized = normalize(point)
        grid.push(normalized);
    }
}
function stroke_grid() {

    for (let i = 0; i < grid.length; i++) {
        let j = Math.floor(i/80);
        ctx.beginPath()
        ctx.strokeStyle = "white";
        ctx.moveTo(i%80*16+8, j*16+8);
        ctx.lineTo(i%80*16+8 + grid[i][0]*5, j*16 + 8 + grid[i][1]*5);
        ctx.stroke();

    }

}

function color_randomizer() {
    return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
}

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.movementVector = [0, 0];
    this.baseColor = color_randomizer()

    this.move = function(color, speed) {
        const pos = {
            x: this.x,
            y: this.y,
        };

        this.color = color
        this.speed = speed;

        if (this.color === true) {
            this.color = this.baseColor
        }

        let selected_vector = Math.round((pos.x)/16) + 80*Math.round((pos.y)/16);
        if (selected_vector < 0) {
            selected_vector += 80
        }
        if (this.speed > 15) {
            if (selected_vector < 0) {selected_vector = 0}
            if (selected_vector >=3600) {selected_vector = 3599}
        }

        this.movementVector[0] += grid[selected_vector][0]/20
        this.movementVector[1] += grid[selected_vector][1]/20
        this.movementVector = normalize(this.movementVector)


        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(pos.x, pos.y);
        let new_pos = [pos.x + this.movementVector[0]*this.speed, pos.y + this.movementVector[1]*this.speed]
        this.x = new_pos[0];
        this.y = new_pos[1];
        ctx.lineTo(new_pos[0], new_pos[1]);
        ctx.stroke();
        if (document.getElementById("anime").checked) {
            if (pos.x > c.width || pos.x < 0 || pos.y > c.height || pos.y < 0) {
                this.x = Math.random()*c.width
                this.y = Math.random()*c.height
                this.movementVector = [0,0]
            }
        } else {
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
}
main()
function main() {
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, c.width, c.height);
    noise.seed(Math.random());

    let num = document.getElementById("number").value
    let particles = []
    for (let i = 0; i < num; i++) {
        let part = new Particle(Math.random()*c.width, Math.random()*c.height);
        particles.push(part);
    }


    let sus = 0;
    function anim() {
        if (!stopped) {requestAnimationFrame(anim);}
        if (document.getElementById("noise").checked) {noise_grid(0)}
        if (document.getElementById("waves").checked) {noise_grid(sus/120)}
        if (document.getElementById("center").checked){point_grid(c.width/2, c.height/2)}
        if (document.getElementById("anime").checked) {
            outwards(c.width/2, c.height/2)
            if (document.getElementById("disappearing").checked) {
                ctx.fillRect(0, 0, c.width, c.height);
            }
        }
        // stroke_grid()
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        sus++
        if (sus%5 === 0 && document.getElementById("disappearing").checked) {
            ctx.fillRect(0, 0, c.width, c.height);
        }
        particles.forEach((particle) => particle.move(document.getElementById("randomize").checked? true : (document.getElementById("color").value + (document.getElementById("visibility").checked? "35" : "ff")), parseFloat(document.getElementById("speed").value) + Math.random()))

    }
    anim();
}

