class Game extends Phaser.Scene {

    constructor() {
	super('game');
	this.current_word;
	this.goal_word;
	this.past_word;
	
	this.input_box;
	this.return_key;
	
	this.counts = 0;
	this.enter;

	}

    create() {
		this.current_word = this.add.text(WINDOW_WIDTH*1/10,WINDOW_HEIGHT*4/10,"START");
		this.goal_word = this.add.text(WINDOW_WIDTH*7/10,WINDOW_HEIGHT*4/10,"END");
		this.past_word = this.add.text(WINDOW_WIDTH*2/10,WINDOW_HEIGHT*2/10,"", { wordWrap: { width: 400 , useAdvancedWrap: true}});
		this.past_word.setText(this.current_word.text);
		this.input_box = this.add.dom(WINDOW_WIDTH*5/10, WINDOW_HEIGHT*6/10).createFromCache("form");
		
		this.return_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.return_key.on('down', function (event) {
			let input_word = this.input_box.getChildByName("input_word").value;
			if (this.check_word(input_word)) {
				console.log("Good! " + input_word)
				this.past_word.setText(this.past_word.text + " -> " + input_word);
				this.current_word.setText(input_word);
				this.counts++;
			}
		}, this);
    }
    
	check_word(input_word) {
		let current_word = this.current_word.text;
		if(input_word === current_word || Math.abs(input_word.length - current_word.length)>=2) {
			return false;
		}

		for (let i = 0; i < input_word.length; i++) {
			if (i >= current_word.length)
				break;

			if (input_word[i] !== current_word[i]) {
				if (input_word.length == current_word.length)
					return input_word.substring(i+1) === current_word.substring(i+1);
				else if (input_word.length < current_word.length)
					return input_word.substring(i) === current_word.substring(i+1);
				else if (input_word.length > current_word.length)
					return input_word.substring(i+1) === current_word.substring(i);
			}
		}
		return true;
	}
}
