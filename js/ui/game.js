class Game extends Phaser.Scene {

    constructor() {
	super('game');
	this.initial_word;
	this.end_word;
	this.past_word;
	
	this.input_box;
	this.return_key;
	
	this.counts = 0;
	this.enter;

	}

    create() {
	this.initial_word = this.add.text(WINDOW_WIDTH*1/10,WINDOW_HEIGHT*4/10,"START");
	this.end_word = this.add.text(WINDOW_WIDTH*7/10,WINDOW_HEIGHT*4/10,"END");
	this.past_word = this.add.text(WINDOW_WIDTH*2/10,WINDOW_HEIGHT*2/10,"", { wordWrap: { width: 400 , useAdvancedWrap: true}});
	this.input_box = this.add.dom(WINDOW_WIDTH*5/10, WINDOW_HEIGHT*6/10).createFromCache("form");
	
	this.return_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	this.return_key.on('down', function (event) {
	    let input_word = this.input_box.getChildByName("input_word").value;
	    if (this.check_word(input_word)) {
		console.log(input_word);
	    }
	    if ( this.counts > 0 ) {
		this.past_word.setText(this.past_word.text + " -> " + this.initial_word.text);
	    }
	    else { this.past_word.setText(this.initial_word.text)}
	    this.initial_word.setText(input_word);
	    this.counts++;
	}, this);
    }
    
    check_word(word) {
	if(word == "") {
	    return false;
	}
	return true;
    }	

    
}
