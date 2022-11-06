from operator import itemgetter

alphabet=list('abcdefghijklmnopqrstuvwxyz')
wordmap = (open("utils/wordmaP.txt").readlines())
alphabet=list('abcdefghijklmnopqrstuvwxyz')
LW = (open("utils/legal_words.txt").readlines())
L=LW
for i in range(len(LW)):
    L[i]=LW[i].strip('\n')
sortedDict=sorted(L, key=len)



def check_dict(word): #Check dictionary to return only real words
    if word in L:
        return True
    else:
        return False
    '''
def check_tree_len(word1,word2):
    
    tree1=[[word1,0]]
    word1=list(word1)
    tree2=[[word2,0]]
    word2=list(word2)
    if word1==word2:
        print('Words are identitical')
        return 0
    nsteps1=0
    nsteps2=0
    tree1+=(onestage(word1,nsteps1+1,tree1))
    nsteps1+=1
    if not max(list( map(itemgetter(1), tree1)))==nsteps1:
        return -1
    
    if "".join(word2) in list( map(itemgetter(0), tree1)):
        
        return 1
                        
    tree2+=(onestage(word2,nsteps2+1,tree2))
    if any(j in list( map(itemgetter(0), tree1)) for j in list( map(itemgetter(0), tree2))):
        return 2
    nsteps2+=1
    while not any(j in list( map(itemgetter(0), tree1)) for j in list( map(itemgetter(0), tree2))):
        if len(tree1)<=len(tree2):
            for i in tree1:
                if i[1]==nsteps1:
                    tree1+=(onestage(list(i[0]),nsteps1+1,tree1))
            nsteps1+=1
                    #print(tree1)
        else:
            for i in tree2:
                if i[1]==nsteps2:
                    tree2+=(onestage(list(i[0]),nsteps2+1,tree2))
            nsteps2+=1
                    #print(tree2)
           
    return nsteps1+nsteps2

    '''    
    
def onestage(word,n,tr_prev):
    
    dictn = [item for item in sortedDict if (len(item)>=len(word)-1 and len(item)<=len(word)+1)]
    
    tree=[]
    w="".join(word)
    
    for i in dictn:
        if diffby1(i,w):
            if not i in list( map(itemgetter(0), tr_prev )):
                #print(i)
                tree+=([[i,n]])
    return tree
            
                
def diffby1(string1,string2):
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
