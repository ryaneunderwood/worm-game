class Game extends Phaser.Scene {

	constructor() {
	    super('game');
	    this.initial_word;
	    this.end_word;
	    this.past_word;
	}

	create() {
	    this.initial_word = this.add.text(WINDOW_WIDTH*1/10,WINDOW_HEIGHT*4/10,"ABCDEFGH");
	    this.end_word = this.add.text(WINDOW_WIDTH*7/10,WINDOW_HEIGHT*4/10,"ABCDEFGH");
	    this.past_word = this.add.text(WINDOW_WIDTH*4/10,WINDOW_HEIGHT*2/10,"ABCDE AAA BBB", { wordWrap: { width: 100 , useAdvancedWrap: true}})
	}

}
