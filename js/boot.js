// Today's ET calendar date as YYYY-MM-DD. Daily content rolls over at
// ET midnight, so the once-per-day intro gate uses the same anchor.
function et_today_iso() {
    const fmt = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/New_York',
        year: 'numeric', month: '2-digit', day: '2-digit',
    });
    const parts = {};
    for (const p of fmt.formatToParts(new Date())) parts[p.type] = p.value;
    return `${parts.year}-${parts.month}-${parts.day}`;
}

class Boot extends Phaser.Scene {

    constructor () {
	super('boot');
    }
    
    
    init () {
	let element = document.createElement('style');
	document.head.appendChild(element);
    }
    
	// Preload assets from disk. Append ?v=WG_VER to local files so
	// cache busts in lockstep with the JS bundle whenever a deploy
	// changes the dictionary or daily list.
	preload () {
		const v = window.WG_VER ? ('?v=' + window.WG_VER) : '';
		this.load.plugin('rexshakepositionplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexshakepositionplugin.min.js', true);
		this.load.html("form", "html/form.html" + v);
	    this.load.text('legal_words', 'assets/legal_words.txt' + v);
	    this.load.text('word_graph', 'assets/word_graph_merged15.txt' + v);
	    this.load.text('daily_list', 'assets/daily_list.txt' + v);
	}


    create () {
		let scene = this.scene;
		// Show the splash at most once per ET calendar day. Returning
		// players today get dropped straight into the daily screen.
		const last = (() => {
		    try { return localStorage.getItem('wg_intro_last_seen'); }
		    catch (_) { return null; }
		})();
		const today = et_today_iso();
		if (last === today) scene.start('game');
		else                scene.start('intro');
    }

}
