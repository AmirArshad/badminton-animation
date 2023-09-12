// Initialize Pixi Application
const app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0xFFFFFF, view: document.getElementById('gameCanvas')
});
document.body.appendChild(app.view);

// Create text labels within the canvas area
const amirLabel = new PIXI.Text('Amir', {fontFamily: 'Arial', fontSize: 24, fill: 'blue'});
amirLabel.x = 100;
amirLabel.y = 550; // Moved within canvas bounds
app.stage.addChild(amirLabel);

const yasiLabel = new PIXI.Text('Yasi', {fontFamily: 'Arial', fontSize: 24, fill: 'red'});
yasiLabel.x = 700;
yasiLabel.y = 550; // Moved within canvas bounds
app.stage.addChild(yasiLabel);

// Initialize players and shuttlecock
const amir = new PIXI.Graphics();
const yasi = new PIXI.Graphics();
const shuttlecock = new PIXI.Graphics();

// Draw human-like shape for players
const drawHuman = (graphics, color) => {
    graphics.beginFill(color);
    // Head
    graphics.drawCircle(25, 25, 25);
    // Body
    graphics.drawRect(20, 50, 10, 25);
    // Legs
    graphics.drawRect(20, 75, 5, 20);
    graphics.drawRect(25, 75, 5, 20);
    // Arms
    graphics.drawRect(15, 50, 5, 20);
    graphics.drawRect(30, 50, 5, 20);
    graphics.endFill();
};

drawHuman(amir, 0x0000FF);
drawHuman(yasi, 0xFF0000);

amir.x = 100;
amir.y = 275;
yasi.x = 700;
yasi.y = 275;

// Draw rackets for players
const amirRacket = new PIXI.Graphics();
amirRacket.beginFill(0x000000);
amirRacket.drawRect(0, 0, 10, 40);
amirRacket.endFill();
amirRacket.x = 160;
amirRacket.y = 325;  // Start at a position aligned with Amir
app.stage.addChild(amirRacket);

const yasiRacket = new PIXI.Graphics();
yasiRacket.beginFill(0x000000);
yasiRacket.drawRect(0, 0, 10, 40);
yasiRacket.endFill();
yasiRacket.x = 760;
yasiRacket.y = 325;  // Start at a position aligned with Yasi
app.stage.addChild(yasiRacket);

// Draw shuttlecock as a triangle
shuttlecock.lineStyle(2, 0x000000, 1);
shuttlecock.beginFill(0xFFFFFF);
shuttlecock.moveTo(0, -10);
shuttlecock.lineTo(10, 10);
shuttlecock.lineTo(-10, 10);
shuttlecock.closePath();
shuttlecock.endFill();
shuttlecock.x = 400;
shuttlecock.y = 300;

// Add objects to stage
app.stage.addChild(amir, yasi, shuttlecock, amirRacket, yasiRacket);

// Velocity and initial positions
let shuttleVelX = 5;
let amirVelY = 2;
let yasiVelY = -2;

// New variable for shuttle vertical velocity
let shuttleVelY = 3;

// Main animation loop
const animate = () => {
    // Move shuttlecock diagonally
    shuttlecock.x += shuttleVelX;
    shuttlecock.y += shuttleVelY;

    // Move players vertically
    amir.y += amirVelY;
    yasi.y += yasiVelY;

    // ... (boundary checks remain the same)

    // Reverse direction when reaching a player and adjust vertical speed
    if (shuttlecock.x <= (amir.x + 60) || shuttlecock.x >= yasi.x) {
        shuttleVelX = -shuttleVelX;
        shuttleVelY = amir.y < 300 ? 3 : -3;
    }

    // Sync rackets with players
    amirRacket.y = amir.y + 50;
    yasiRacket.y = yasi.y + 50;

    // Re-render
    app.render();
    requestAnimationFrame(animate);
};

// Start animation
animate();