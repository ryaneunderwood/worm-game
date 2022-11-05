class Boot extends Phaser.Scene {

	constructor () {
		super('boot');
	}


	init () {
		let element = document.createElement('style');
		document.head.appendChild(element);
	}

	// Preload assets from disk
	preload () {
		// this.load.image('press_start', 'assets/sprites/shared/press_start.png');
	}


	create () {
		let scene = this.scene;
		// Start the actual game!
		scene.start('intro');
	}

}
