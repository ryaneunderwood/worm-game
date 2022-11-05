WINDOW_WIDTH = 640;
WINDOW_HEIGHT = 640;

var config = {
    type: Phaser.AUTO,
    parent: "game",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    dom: {createContainer: true},
    scene: [ Boot, Game, Intro ]
};

var game = new Phaser.Game(config);
