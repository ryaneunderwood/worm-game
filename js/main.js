var config = {
    type: Phaser.AUTO,
    parent: "game",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: "#1e1e2e",
    dom: {createContainer: true},
    // Let the browser handle native touch gestures (pinch-zoom,
    // pan-scroll) over the game canvas on mobile. capture:false
    // means Phaser's touch plugin won't preventDefault() on them.
    input: { touch: { capture: false } },
    scene: [ Boot, Game, Intro ]
};

function startGame() {
    const game = new Phaser.Game(config);
    // Phaser sets the canvas' inline touch-action to 'none' during
    // Scale Manager setup; override it so single-finger drags scroll
    // the page and two-finger pinches zoom, the same way the rest of
    // the page already does.
    game.events.once('ready', () => {
	if (game.canvas) game.canvas.style.touchAction = 'auto';
    });
}

if (document.fonts && document.fonts.load) {
    Promise.all([
        document.fonts.load("24px 'Inter'"),
        document.fonts.load("600 24px 'Inter'"),
        document.fonts.load("700 36px 'Fredoka'")
    ]).then(startGame).catch(startGame);
} else {
    startGame();
}
