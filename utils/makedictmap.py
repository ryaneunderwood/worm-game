import check_tree as ct
from operator import itemgetter

alphabet=list('abcdefghijklmnopqrstuvwxyz')
LW = (open("legal_words.txt").readlines())
L=LW
for i in range(len(LW)):
    L[i]=LW[i].strip('\n')
sortedDict=sorted(L, key=len)
f=open("wordmap.txt","w")

for i in range(len(sortedDict))[17823:27000]:
    
    tree=ct.onestage(sortedDict[i],1,[sortedDict[i]])
    tree1=list( map(itemgetter(0), tree ))
    
    indices=[]
    for j in tree1:
        indices+=[sortedDict.index(j)]
    f.write(str(sortedDict[i])+','+str(indices)+'\n')
    if i%100==0:
        print(round(i/len(sortedDict),3)*100,'%')
    
    
