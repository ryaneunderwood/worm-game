from operator import itemgetter
from copy import deepcopy
alphabet=list('abcdefghijklmnopqrstuvwxyz')
wordmap = (open("word_graph_old.txt").readlines())
LW = (open("../assets/legal_words.txt").readlines())
L=LW
for i in range(len(LW)):
    L[i]=LW[i].strip('\n')
sortedDict=sorted(L, key=len)



def check_dict(word): #Check dictionary to return only real words
    if word in L:
        return True
    else:
        return False
    
def check_tree_len(word1,word2):
    
    tree1=[[sortedDict.index(word1),0,0]]

    tree2=[[sortedDict.index(word2),0,0]]

    if word1==word2:
        return 0
    nsteps1=1
    nsteps2=1    
    fails=0
   
    while not any(j in  [item[0] for item in tree1] for j in [item[0] for item in tree2]):
        if fails==3:
            return -1
        if len(tree1)<=len(tree2):
            tree1a=deepcopy(tree1)
            for count,i in enumerate(list( map(itemgetter(0), tree1a))):                
                try: fulllist=[eval(n) for n in wordmap[tree1a[count][0]].split(':[')[1:][0].strip('\n').strip(']').split(',')]
                except:
                    return -1
                for x in fulllist:
                    if not x in list( map(itemgetter(0), tree1a)):
                        tree1a+=[[x,nsteps1,i]]
            
            if len(tree1a)==len(tree1):
                fails+=1
            tree1=deepcopy(tree1a)
            nsteps1+=1
        else:
            tree2a=deepcopy(tree2)
            for count,i in enumerate(list( map(itemgetter(0), tree2a))):
               
                fulllist=[eval(n) for n in wordmap[tree2a[count][0]].split(':[')[1:][0].strip('\n').strip(']').split(',')]
                for x in fulllist:
                     if not x in list( map(itemgetter(0), tree2a)):
                         tree2a+=[[x,nsteps2,i]]
            
            if len(tree2a)==len(tree2):
                fails+=1
            tree2=deepcopy(tree2a)
            nsteps2+=1
    pathlist=[]
    for c,tree1item in enumerate(list( map(itemgetter(0), tree1))):
        if tree1item in list( map(itemgetter(0), tree2)):
            
            pathlist+=[tree1item]
            break
    
    t1idx=tree1[list( map(itemgetter(0), tree1)).index(tree1item)][2]
    t2idx=tree2[list( map(itemgetter(0), tree2)).index(tree1item)][2]
    tree1items=[item[0] for item in tree1]
    tree2items=[item[0] for item in tree2]
    while t1idx>0:
        
        pathlist.insert(0, tree1[tree1items.index(t1idx)][0])
        t1idx=tree1[tree1items.index(t1idx)][2]
    while t2idx>0:
        
        pathlist+=[tree2[tree2items.index(t2idx)][0]]
        t2idx=tree2[tree2items.index(t2idx)][2]   
    
    pathwords=[sortedDict[item] for item in pathlist]
    return nsteps1+nsteps2-2, pathwords

        
    
def onestage(word,n,tr_prev):
    
    dictn = [item for item in sortedDict if (len(item)>=len(word)-1 and len(item)<=len(word)+1)]
    
    tree=[]
    w="".join(word)
    
    for i in dictn:
        if diffby1(i,w):
            if not i in list( map(itemgetter(0), tr_prev )):
                tree+=([[i,n]])
    return tree
            

def calc_one_word(query_word, query_word_idx, graph_dict, dictn, dictn_idx):
    query_word_str="".join(query_word)
    if query_word_str not in graph_dict:
        graph_dict[query_word_str] = []
    for i in range(len(dictn))[query_word_idx-dictn_idx:]:
        word2 = dictn[i]
        if diffby1(query_word_str,word2):
            graph_dict[query_word_str].append(dictn_idx+i)
            if word2 not in graph_dict:
                graph_dict[word2] = []
            graph_dict[word2].append(query_word_idx)


def diffby1(string1,string2):
    if string1 == string2:
        return False
    if len(string1) == len(string2):
        count_diffs = 0
        for a, b in zip(string1, string2):
            if a!=b:
                if count_diffs: return False
                count_diffs += 1
        return True
    elif len(string1)+1==len(string2):
        for i in range(len(string2)):
           l2= list(string2)
           del l2[i]
          
           if "".join(l2)==string1:
               return True
        return False
    elif len(string1)==len(string2)+1:
        for i in range(len(string1)):
           l1= list(string1)
           del l1[i]
           
           if "".join(l1)==string2:
               return True
        return False
def calc_one_word(query_word, query_word_idx, graph_dict, dictn, dictn_idx):
    query_word_str="".join(query_word)
    if query_word_str not in graph_dict:
        graph_dict[query_word_str] = []
    for i in range(len(dictn))[query_word_idx-dictn_idx:]:
        word2 = dictn[i]
        if diffby1(query_word_str,word2):
            graph_dict[query_word_str].append(dictn_idx+i)
            if word2 not in graph_dict:
                graph_dict[word2] = []
            graph_dict[word2].append(query_word_idx)
