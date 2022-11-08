import check_tree as ct
LW = (open("../assets/word_graph.txt").readlines())
#print(LW[1].split(',[')[1:][0].strip('\n').strip(']').split(','))


#a=ct.check_tree_len('zuz','lenten')
a=ct.check_tree_len('stuffing','feast')
print(a)
