class Game extends Phaser.Scene {

    constructor() {
	super('game');
	this.start_word;
	this.prev_word;
	this.goal_word;
	this.score_counter;
	this.word_history;
		
	this.input_box;
	this.shake_input;
	this.return_key;
	
	this.count = 0;
        this.VICTORY = 0;
        this.complaint_counter = 0;
        this.freeplay = 0;
	
	this.sound_toggle;
	this.bgm;
	this.reset;
	this.restart;

	this.daily_challenge;
	this.free_play;
	this.regular;
		
	this.tween_notinenglish
	}

    create() {
	this.prev_word = this.add.text(PREV_WORD_X,PREV_WORD_Y,"START",
					       { fontSize: WORD_FONTSIZE, fontFamily: "monospace"}).setResolution(RESOLUTION);
	this.prev_word.setOrigin(0.5,0.5);
	this.goal_word = this.add.text(GOAL_WORD_X,GOAL_WORD_Y,"END",
					       { fontSize: WORD_FONTSIZE, fontFamily: "monospace"}).setResolution(RESOLUTION);
	this.goal_word.setOrigin(0.5,0.5);
	this.score_counter = this.add.text(SCORE_X,SCORE_Y,"0",
						   { fontSize: WORD_FONTSIZE, fontFamily: "monospace"}).setResolution(RESOLUTION);
	this.score_counter.setOrigin(0.5,0.5);
	
	this.input_box = this.add.dom(INPUT_BOX_X, INPUT_BOX_Y).createFromCache("form");
	this.input_box.setOrigin(0.5,0.5);
	this.shake_input = this.plugins.get('rexshakepositionplugin').add(this.input_box, {
		    duration: 100,
		    magnitude: 15
		});
		
	this.word_history = this.add.text(HISTORY_BOX_X,HISTORY_BOX_Y,"", 
						  { fontSize: HISTORY_BOX_FONTSIZE, fontFamily: "monospace", wordWrap: { width: 400 , useAdvancedWrap: true}}).setResolution(RESOLUTION);
	this.word_history.setText("> "+this.prev_word.text);

	this.error_msg = this.add.text(ERROR_BOX_X, ERROR_BOX_Y,"", { fontSize: HISTORY_BOX_FONTSIZE, fontFamily: "monospace", wordWrap: { width: 500 , useAdvancedWrap: true}}).setResolution(RESOLUTION);
	
	
	var graphics = this.make.graphics();
	graphics.fillRect(HISTORY_BOX_X, HISTORY_BOX_Y, HISTORY_BOX_W, HISTORY_BOX_H);
	var history_mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
	this.word_history.setMask(history_mask);
	var history_zone = this.add.zone(HISTORY_BOX_X, HISTORY_BOX_Y, HISTORY_BOX_W, HISTORY_BOX_H).setOrigin(0).setInteractive();
	
		history_zone.on('wheel', function (pointer) {
		    if (this.word_history.displayHeight > HISTORY_BOX_H) {
			    this.word_history.y -= (pointer.deltaY / 5);
			    this.word_history.y = Phaser.Math.Clamp(this.word_history.y, 
									HISTORY_BOX_Y + HISTORY_BOX_H - this.word_history.displayHeight, HISTORY_BOX_Y);
			}
		}, this);

	this.return_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	this.return_key.on('down', function (event) {
                    if (this.freeplay == 0) {
                    if (this.VICTORY==0) {
		    let input_word = this.input_box.getChildByName("input_word").value.toUpperCase();
		    if (this.check_word(input_word) && this.check_word_English(input_word) && !this.check_victory(input_word)) {
			    this.word_history.text = this.word_history.text + "\n> " + input_word;
			    this.prev_word.setText(input_word);
			    this.count++;
			    this.score_counter.setText(this.count);
				if (this.word_history.displayHeight > HISTORY_BOX_H) {
				    this.word_history.y = HISTORY_BOX_Y + HISTORY_BOX_H - this.word_history.displayHeight;
				    //this.word_history.text = this.word_history.text.substring(this.word_history.text.indexOf("\n") + 1);
				}
			} else if ((this.check_word(input_word))&& this.check_word_English(input_word) && (this.check_victory(input_word))) {
				this.word_history.text = this.word_history.text + "\n> " + input_word;
				this.prev_word.setText(input_word);
				this.count++;
                                let victory_string = 'YOU WIN IN ';
				this.score_counter.setText(victory_string.concat(this.count));
                                this.VICTORY = 1;
		        } else if (!this.check_word_English(input_word)){
			        this.shake_input.shake();
			        this.error_msg.setText("This is not an English word");
			        this.timedEvent = this.time.delayedCall(2000, function (event) {this.error_msg.setText("")}, [], this); 
		        } else {
			        this.shake_input.shake();
			        this.error_msg.setText("This is not a permitted word");
			        this.timedEvent = this.time.delayedCall(2000, function (event) {this.error_msg.setText("")}, [], this);    
		        } 
                        } else {
                                this.shake_input.shake();
                                if (this.complaint_counter < this.arrayComplaints.length) {
                                    let complain_string = this.arrayComplaints.at(this.complaint_counter);
                                    this.score_counter.setText(complain_string);
                                } else {
                                    let complain_string = 'YOU WIN, PLAY AGAIN';
                                    this.score_counter.setText(complain_string);
                                }
                                this.complaint_counter++;
                        }
                        } else if (this.freeplay == 1) {
                            let input_word = this.input_box.getChildByName("input_word").value.toUpperCase();
                            if (!this.check_word_English(input_word)){ 
			        this.shake_input.shake();
			        this.error_msg.setText("This is not an English word");
			        this.timedEvent = this.time.delayedCall(2000, function (event) {this.error_msg.setText("")}, [], this); 
                            } else {
                                this.start_word = input_word;
	                        this.prev_word.setText(this.start_word);
	                        this.word_history.setText("> "+this.start_word);
                                this.freeplay = 2;
                                this.error_msg.setText("Enter goal word.");
                                }
                        } else if (this.freeplay == 2) {
                            let input_word = this.input_box.getChildByName("input_word").value.toUpperCase();
                            if (!this.check_word_English(input_word)){ 
			        this.shake_input.shake();
			        this.error_msg.setText("This is not an English word");
			        this.timedEvent = this.time.delayedCall(2000, function (event) {this.error_msg.setText("")}, [], this); 
                            } else {
                                if (input_word == this.start_word) {
                                    this.shake_input.shake();
                                    this.error_msg.setText("Goal word cannot be starting word.");
                                    } else {
	                                this.goal_word.setText(input_word);
                                        this.freeplay = 0;
                                        this.error_msg.setText("");
                                    }
                                }
                        }
		}, this);

	this.loadWords();
        this.loadComplaints();

	//Mute button

		this.bgm = this.sound.add("boar_game_music", {loop : true});
		this.bgm.play();

		this.sound_toggle = this.add.text(SOUND_TOGGLE_X, SOUND_TOGGLE_Y, "SOUND", 
	                { fontSize: WORD_FONTSIZE, fontFamily: "monospace", color: "#ff0000"}).setResolution(RESOLUTION);
		this.sound_toggle.setOrigin(1,0);
                this.sound_toggle.setInteractive();
		this.sound_toggle.on('pointerdown', function (event) {
			if (!this.bgm.mute) {
				this.bgm.mute = true;
				this.sound_toggle.alpha = 0.2;
			} else {
				this.bgm.mute = false;
				this.sound_toggle.alpha = 1.;
			}
		}, this);

	//Reset button. This will clear the word history and word count while retaining the same start and end word.
	this.reset = this.add.text(RESET_X, RESET_Y, "RESET",
				   {fontSize: WORD_FONTSIZE, fontFamily: "monospace",color: "#ff0000"}).setResolution(RESOLUTION);
        this.reset.setOrigin(0,0);                           
	this.reset.setInteractive();
	this.reset.on('pointerdown',function(event){
	    this.prev_word.setText(this.start_word);
	    this.word_history.setText("> "+this.start_word);
	    this.count = 0;
	    this.score_counter.setText("0");
	}, this);

	//New game button
	this.restart = this.add.text(RESTART_X, RESTART_Y, "NEW GAME",
				     {fontSize: WORD_FONTSIZE, fontFamily: "monospace",color: "#ff0000"}).setResolution(RESOLUTION);
        this.restart.setOrigin(0,0);
	this.restart.setInteractive();
	this.restart.on('pointerdown',function(event){
	    this.start_word = "START" //New start word
	    this.prev_word.setText(this.start_word);
	    this.word_history.setText("> "+this.start_word);
	    this.count = 0;
            this.VICTORY = 0;
            this.complaint_counter = 0;
	    this.score_counter.setText("0");
	    this.goal_word.setText("END"); //New end word
	}, this);

	//---------------- Add game modes-------------------------
	//Regular mode. This is the default mode where start and goal words are picked from the dictionary.
	this.regular = this.add.text(GMODE1_X, GMODE1_Y, "REGULAR",
				     {fontSize: WORD_FONTSIZE, fontFamily: "monospace", color: "#00ff00"}).setResolution(RESOLUTION);
	this.regular.setOrigin(0,0);
        this.regular.setInteractive();
	this.regular.on('pointerdown',function(event){
	    this.error_msg.setText("");
            this.start_word = "START";
	    this.prev_word.setText(this.start_word);
	    this.word_history.setText("> "+this.start_word);
	    this.count = 0;
            this.VICTORY = 0;
            this.complaint_counter = 0;
            this.freeplay = 0;
	    this.score_counter.setText("0");
	    this.goal_word.setText("END"); //New end word
	}, this);

	//Daily challenge. The start and goal words are set by the developers in game_mode_settings.js
	this.daily_challenge = this.add.text(GMODE2_X, GMODE2_Y, "DAILY CHALLENGE",
					     {fontSize: WORD_FONTSIZE, fontFamily: "monospace",color: '#00ff00'}).setResolution(RESOLUTION);
	this.daily_challenge.setOrigin(0.5,0);
	this.daily_challenge.setInteractive();
        this.daily_challenge.on('pointerdown',function(event){
	    this.error_msg.setText("");
            this.start_word = DAILY_START_WORD;
	    this.prev_word.setText(this.start_word);
	    this.word_history.setText("> "+this.start_word);
	    this.count = 0;
            this.VICTORY = 0;
            this.complaint_counter = 0;
            this.freeplay = 0;
	    this.score_counter.setText("0");
	    this.goal_word.setText(DAILY_GOAL_WORD); //New end word
	}, this);

	//Free Play. Start and ends goal words are chosen by the user.
	this.free_play = this.add.text(GMODE3_X, GMODE3_Y, "FREE PLAY",
					     {fontSize: WORD_FONTSIZE, fontFamily: "monospace",color: '#00ff00'}).setResolution(RESOLUTION);
	this.free_play.setOrigin(1,0);
        this.free_play.setInteractive();
	this.free_play.on('pointerdown',function(event){
            this.error_msg.setText("Enter starting word.");
    	    this.count = 0;
            this.VICTORY = 0;
            this.complaint_counter = 0;
            this.freeplay = 1;
    	    this.score_counter.setText("0");
	}, this);
    }
    
	check_word(input_word) {
	    let prev_word = this.prev_word.text;
		if(input_word.length == 0 || 
		   input_word === prev_word || 
		   Math.abs(input_word.length - prev_word.length)>=2 ) {
		    return false;
		}

	    for (let i = 0; i < input_word.length; i++) {
		if (i >= prev_word.length)
		    break;
		
		if (input_word[i] !== prev_word[i]) {
		    if (input_word.length == prev_word.length)
			return input_word.substring(i+1) === prev_word.substring(i+1);
		    else if (input_word.length < prev_word.length)
			return input_word.substring(i) === prev_word.substring(i+1);
		    else if (input_word.length > prev_word.length)
			return input_word.substring(i+1) === prev_word.substring(i);
		}
	    }
	    return true;
	}
    
        check_word_English(input_word) {
	    if(this.arrayWords.includes(input_word.toLowerCase()) ) {
	        return true;
	    }
        }

        loadWords() {
	    let cache = this.cache.text;
	    let myWords= cache.get('legal_words');
	    this.arrayWords = myWords.split('\n');
        }

        check_victory(input_word) {
                let goal_word = this.goal_word.text;
                if(input_word == goal_word) {
                        return true
                }
        }

        loadComplaints(complaint_number) {                
            this.arrayComplaints = ['WHAT ARE YOU DOING','STOP','PLEASE','CONTROL YOURSELF','HAVE YOU NO SHAME','RESET PLEASE','OR ELSE','','','','HAPPY NOW?','GOODBYE'];
        }

}
