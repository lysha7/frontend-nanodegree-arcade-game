class Enemy {
    // Set initial enemy image, location, and speed
    constructor(y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = y;
        this.speed = speed;
    }

    // Render enemy on screen with offsets so that x and y will refer to grid squares
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 20);
    }

    // Move enemy across screen according to its given speed. If enemy goes off screen right, loop back to screen left
    update(dt) {
        if (this.x > 5) {
            this.x = -1;
        }

        else {
            this.x += dt * this.speed;
        }
    }
}

class Player {
    // Set initial player image and location, and initialize checks to see if player is currently moving and if player has already won
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 2;
        this.y = 5;
        this.isMoving = false;
        this.won = false;
    }

    // Render play on screen with offsets so that x and y will refer to grid squares. Set isMoving to false because player is no longer moving once rendered
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 20);
        this.isMoving = false;
    }

    // Check for collisions and wins whenever player updates
    update(allEnemies) {

        // Move player back to starting position if it has collided with an enemy
        if (this.checkCollisions(allEnemies)) {
            this.x = 2;
            this.y = 5;
        }

        // Check if player has reached water, has finished moving, and has not already won. If so, alert "You won" and reload page
        if (this.y === 0 && !this.isMoving && !this.won) {
            this.won = true;
            alert("You won!");
            location.reload();
        }
    }

    // Loop through array of enemies, check if player and enemy are on the same y block and if their x values are within range for collision
    checkCollisions(enemies) {
        for (var enemy of enemies) {
            if (this.y === enemy.y) {
                if (this.x >= enemy.x - 0.5 && this.x <= enemy.x + 0.5) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }

    // Move player left, right, up, or down according to user input, as long as this will not move player off the grid
    handleInput(key) {
        if (key === 'left') {
            this.x = this.x === 0 ? this.x : this.x - 1;
        }
        if (key === 'right') {
            this.x = this.x === 4 ? this.x : this.x + 1;
        }
        if (key === 'up') {
            this.y = this.y === 0 ? this.y : this.y - 1;
        }
        if (key === 'down') {
            this.y = this.y === 5 ? this.y : this.y + 1;
        }
        // Set isMoving variable to true when move is made
        this.isMoving = true;
    }
}

// Initialize 3 enemies and add them to allEnemies array
const enemy1 = new Enemy(1, 2);
const enemy2 = new Enemy(2, 0.5);
const enemy3 = new Enemy(3, 1);

const allEnemies = [enemy1, enemy2, enemy3];

// Initialize 1 player
const player = new Player();

// Listen for keyup events on left, right, up, and down arrows
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
