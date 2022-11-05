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
		this.load.html("form", "html/form.html");
	}


	create () {
		let scene = this.scene;
		// Start the actual game!
		scene.start('game');
	}

}
