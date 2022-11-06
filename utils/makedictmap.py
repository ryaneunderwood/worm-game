import check_tree as ct
from operator import itemgetter

alphabet=list('abcdefghijklmnopqrstuvwxyz')
LW = (open("utils/legal_words.txt").readlines())
L=LW
for i in range(len(LW)):
    L[i]=LW[i].strip('\n')
sortedDict=sorted(L, key=len)
f=open("./utils/wordmap.txt","w")

for i in range(len(sortedDict))[17823:27000]:
    #f2.write("#"+str(i+1)+"\n"+j[5:]+"\n")
    tree=ct.onestage(sortedDict[i],1,[sortedDict[i]])
    tree1=list( map(itemgetter(0), tree ))
    
    indices=[]
    for j in tree1:
        indices+=[sortedDict.index(j)]
    f.write(str(sortedDict[i])+','+str(indices)+'\n')
    if i%100==0:
        print(round(i/len(sortedDict),3)*100,'%')
    
    



'''
print('Test 1: cat-cat')
#a=ct.check_tree_len('xylophone','cat')
#print(a)
print('Test 2: cat-bat')
a=ct.check_tree_len('cat','bat')
print(a)
print('Test 3: clap-shin')
a=ct.check_tree_len('busy','carpet')
print(a)
print(ct.diffby1('busy','carp'),ct.diffby1('cat','cbar'), ct.diffby1('cat','car'))
'''
