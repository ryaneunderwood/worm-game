import numpy as np

def load_dictionary(filename):
    
    with open(filename) as f:
        words = f.readlines()
        
    global DICTIONARY = words
    
    return



def get_start_word(num_letters):
    
    start_words = [t.strip("\n") for t in DICTIONARY if len(t)==num_letters]
    
    random_no=np.random.uniform(low=0,high=len(start_words))
    start_word= start_words[random_no]
        
    return start_word
        
        
    
def get_target_word(num_letters):
    
    start_words = [t.strip("\n") for t in DICTIONARY if ((len(t)==num_letters) and t.strip("\n")!= START_WORD)]
   
    random_no=np.random.uniform(low=0,high=len(start_words))
    start_word= start_words[random_no]
        
    return start_word



def get_words(num_start_letters,num_target_letters):
    
    filename="Dictionary.txt"
    load_dictionary(filename)
    
    global START_WORD = get_start_word(num_start_letters)
    global TARGET_WORD = get_target_word(num_target_letters)
    
    return


#Check if is chosen word is in a dictionary
def check_word(word):
    
    message=[print("Not a valid word. Enter another word.") for t in DICTIONARY if (word != t.strip('\n'))]        
    
    return

    
    
