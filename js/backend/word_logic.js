// Get a random starting word
function get_start_word(start_words) {
	let start_word_idx = Math.floor(Math.random() * start_words.length);
	return start_words[start_word_idx];
}

// Generate the path from word1 to word2
function calc_word_path(word1, word2, word_array, word_graph) {
	let idx1 = word_array.indexOf(word1.toLowerCase()); // Use indices of each word instead of strings
	let idx2 = word_array.indexOf(word2.toLowerCase());
	word_path = calc_word_path_linked_list(idx1, idx2, word_graph); // Returns a linked list of nodes
	if (word_path.idx == idx1) // If index of last node is starting index, no valid path
		return [];
	
	let node = word_path;
	let word_path_array = [word_array[node.idx]];
	while (node.parent) { // Iterate through linked list from end to start, storing words into array
		node = node.parent;
		word_path_array.push(word_array[node.idx]);
	}
	word_path_array = word_path_array.reverse();
	return word_path_array;
}

// Generate a linked list of words, pointing from end word up to start word
function calc_word_path_linked_list(start_idx, end_idx, word_graph) {
	// A node stores its word index, points to parent node
	let base_node = {parent: null, idx: start_idx};
	let current_node_layer = [base_node];
	let seen_words = new Set([start_idx]); // Use a hashset for fast querying

	// Do a breadth-first search of the word graph, one layer at a time
	// Each layer contains words that are the same # of steps away from the start word
	for (let layers = 0; layers < 100; layers++) { // Exit if too many layers, as a failsafe
		let last_node_layer = current_node_layer;
		current_node_layer = [];
		for (let i = 0; i < last_node_layer.length; i++) { // Loop through last layer of nodes
			let node = last_node_layer[i];
			let neighbors = word_graph[node.idx];
			for (let j = 0; j < neighbors.length; j++) { // Loop through this word's neighbors
				if (!seen_words.has(neighbors[j])) { // Only add a node if this word has never been seen
					new_node = {parent: node, idx: neighbors[j]};
					if (neighbors[j] == end_idx) // If this new word is our end word, return new node
						return new_node;
					current_node_layer.push(new_node);
					seen_words.add(neighbors[j]);
				}
			}
		}
		if (current_node_layer.length == 0) // If no new nodes were added, there is no valid path
			return base_node;
	}
	return base_node; // Failsafe return
}

function generate_random_word_path(start_word, min_num_steps, max_num_steps, word_array, word_graph) {
	let start_idx = word_array.indexOf(start_word);
	// A node stores its word index, points to children nodes
	let base_node = {children: [], idx: start_idx};
	let current_node_layer = [base_node];
	let seen_words = new Set([start_idx]); // Use a hashset for fast querying

	// Build a tree of depth num_steps
	let max_depth = 0
	for (let step = 0; step < max_num_steps; step++) { 
		let last_node_layer = current_node_layer;
		current_node_layer = [];
		for (let i = 0; i < last_node_layer.length; i++) { // Loop through last layer of nodes
			let node = last_node_layer[i];
			let neighbors = word_graph[node.idx];
			for (let j = 0; j < neighbors.length; j++) { // Loop through this word's neighbors
				if (!seen_words.has(neighbors[j])) { // Only add a node if this word has never been seen
					new_node = {children: [], idx: neighbors[j]};
					node.children.push(new_node)
					current_node_layer.push(new_node);
					seen_words.add(neighbors[j]);
				}
			}
		}
		if (current_node_layer.length == 0) {
			if (step < min_num_steps)
				return [];
		}
	}
	// Traverse tree randomly to build word path
	let word_path_array = [start_word];
	let node = base_node;
	while (node.children.length > 0) {
		random_child_idx = Math.floor(Math.random() * node.children.length); 
		node = node.children[random_child_idx];
		word_path_array.push(word_array[node.idx]);
	}
	return word_path_array;
}