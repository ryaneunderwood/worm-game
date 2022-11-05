# Creates list of common words while removing simple plurals
# and other word variations that are not useful for the game.
# The file legal_words contains all words the user can utilize in the game.
# The file common_words contains the most common words in the English language,
# minus plurals and other stems.

from word_stemming import PorterStemmer

# acquire word list
with open("legal_words.txt") as f:
    legal_words = f.read().splitlines()

with open("common_words") as f:
    common_words = f.read().splitlines()

stemmer = PorterStemmer()
newlist = []

# stem words
for word in common_words:
    newword = stemmer.stem(word, 0, len(word)-1)
    if len(newword) > 3:
        newlist.append(newword)

# remove duplicated words
newlist = list(dict.fromkeys(newlist))

# add to stemmed word list
with open("words_stemmed", "w") as f:
    for item in newlist:
        if item in legal_words: # make sure the stemmer didn't do anything weird
            f.write(f"{item}\n")
