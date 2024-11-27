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

// Player class
const frogImage = new Image();
frogImage.src = 'frog.png'; 

class Player {
    constructor() {
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.x = LIFT_LANES[1] + (LIFT_WIDTH - this.width) / 2; // Start at the middle lift
        this.y = 0;
        this.currentLane = 1; // Start at the middle lift lane
    }

    draw() {
        ctx.drawImage(frogImage, this.x, this.y, this.width, this.height);
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
}

// Lift class
class Lift {
    constructor(x) {
        this.width = LIFT_WIDTH;
        this.height = LIFT_HEIGHT;
        this.x = x;
        this.y = SCREEN_HEIGHT - this.height;
    }

    draw() {
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Game setup
const player = new Player();
const lifts = LIFT_LANES.map(x => new Lift(x));

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // Draw lifts
    lifts.forEach(lift => lift.draw());

    // Draw player
    player.draw();

    requestAnimationFrame(gameLoop);
}

// Event listeners for player movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        player.moveLeft();
    } else if (event.key === 'ArrowRight') {
        player.moveRight();
    }
});

// Start the game loop
gameLoop();