class Intro extends Phaser.Scene {

	constructor() {
		super('intro');
	}

	create() {
		this.add.text(0,0,"Hello World");
	}
}