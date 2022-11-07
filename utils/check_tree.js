let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
//console.log(alphabet);
let cache = this.cache.text;
let wordgraph= cache.get('word_graph'); //load in word_graph text file from cache
let LW= cache.get('legal_words').split('\n');
let sortedDict = sorted(LW, {
  "key": len
});
function check_tree_len(word1, word2) {
    var tree1 = [[sortedDict.indexOf(word1), 0, 0]];
    var tree2 = [[sortedDict.indexOf(word2), 0, 0]];

    if (word1 === word2) {
	return 0;
    }

    let nsteps1 = 1;
    let nsteps2 = 1;
    let fails = 0;
    while  (!(tree1.some(r=> tree2.includes(r)))){
	if (fails === 2) {
	    return -1;
	}
	
	if (tree1.length <= tree2.length) {
	    let tree1a=tree1
	    var graphindex = tree1a.map(function(arr) {
		return [arr[x][0]];
	    });
	    for (const [index, element] of graphindex.entries()) {
    		fulllist=wordgraph[1]
		for 
	    } 
	}
    }
}
