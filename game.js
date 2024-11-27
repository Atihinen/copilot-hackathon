const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constants
const SCREEN_WIDTH = canvas.width;
const SCREEN_HEIGHT = canvas.height;
const LIFT_WIDTH = 100;
const LIFT_HEIGHT = 400;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const LIFT_LANES = [100, 350, 600]; // X positions of the lift lanes
const FLOORS = 5;
const FLOOR_HEIGHT = SCREEN_HEIGHT / FLOORS;

// Floor class
class Floor {
    constructor(y) {
        this.y = y;
    }

    draw() {
        ctx.strokeStyle = 'gray';
        ctx.beginPath();
        ctx.moveTo(0, this.y);
        ctx.lineTo(SCREEN_WIDTH, this.y);
        ctx.stroke();
    }
}

// Player class
class Player {
    constructor() {
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.currentLane = 1; // Start at the middle lift lane
        this.currentFloor = 4; // Start at the top floor
        this.x = LIFT_LANES[this.currentLane] + (LIFT_WIDTH - this.width) / 2;
        this.y = SCREEN_HEIGHT - (this.currentFloor + 1) * FLOOR_HEIGHT; // Position on top of the bottom floor
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        if (this.currentLane > 0) {
            this.currentLane--;
            this.x = LIFT_LANES[this.currentLane] + (LIFT_WIDTH - this.width) / 2;
        }
    }

    moveRight() {
        if (this.currentLane < LIFT_LANES.length - 1) {
            this.currentLane++;
            this.x = LIFT_LANES[this.currentLane] + (LIFT_WIDTH - this.width) / 2;
        }
    }

    moveUp() {
        if (this.currentFloor > 0) {
            this.currentFloor--;
            this.y = this.currentFloor * FLOOR_HEIGHT - this.height;
        }
    }

    moveDown() {
        if (this.currentFloor < FLOORS - 1) {
            this.currentFloor++;
            this.y = this.currentFloor * FLOOR_HEIGHT - this.height;
        }
    }
}

// Lift class
class Lift {
    constructor(x) {
        this.width = LIFT_WIDTH;
        this.height = LIFT_HEIGHT;
        this.x = x;
        this.y = SCREEN_HEIGHT - this.height;
        this.floors = this.createFloors();
    }

    createFloors() {
        const floors = [];
        for (let i = 0; i < FLOORS; i++) {
            floors.push(new Floor(i * FLOOR_HEIGHT));
        }
        return floors;
    }

    draw() {
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.floors.forEach(floor => floor.draw());
    }
}

// Create lifts
const lifts = LIFT_LANES.map(x => new Lift(x));

// Create floors
const floors = [];
for (let i = 0; i < FLOORS; i++) {
    floors.push(new Floor(i * FLOOR_HEIGHT));
}

// Initialize player
const player = new Player();

// Draw function
function draw() {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    floors.forEach(floor => floor.draw());
    lifts.forEach(lift => lift.draw());
    player.draw();
}

// Game loop
function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// Event listeners for player movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        player.moveLeft();
    } else if (event.key === 'ArrowRight') {
        player.moveRight();
    } else if (event.key === 'ArrowUp') {
        player.moveUp();
    } else if (event.key === 'ArrowDown') {
        player.moveDown();
    }
});

// Start the game loop
gameLoop();