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
    setupKeyboardScroll();
}

// On mobile, focusing the word <input> pops up the on-screen keyboard
// and the browser centres the input in the visible area — which hides
// the word chain above it. Instead we shift the whole #game element
// up by exactly enough that the input sits a few pixels above the
// keyboard's top edge, leaving as much chain visible as possible.
function setupKeyboardScroll() {
    const vv = window.visualViewport;
    const game_el = document.getElementById('game');
    if (!vv || !game_el) return;
    let applied_shift = 0;
    const reset = () => {
	applied_shift = 0;
	game_el.style.transform = '';
    };
    const adjust = () => {
	const focused = document.activeElement;
	const is_input = focused && focused.tagName === 'INPUT';
	const kb_height = window.innerHeight - vv.height;
	if (!is_input || kb_height < 80) { reset(); return; }
	const rect = focused.getBoundingClientRect();
	// rect.bottom already reflects the currently-applied transform,
	// so the additional shift we need is just (rect.bottom - target).
	const target_bottom = vv.height + vv.offsetTop - 8;
	applied_shift = Math.max(0, applied_shift + (rect.bottom - target_bottom));
	game_el.style.transform = `translateY(${-applied_shift}px)`;
    };
    vv.addEventListener('resize', adjust);
    vv.addEventListener('scroll', adjust);
    document.addEventListener('focusin', () => setTimeout(adjust, 50));
    document.addEventListener('focusout', reset);
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
