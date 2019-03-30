# Welcome to DNA
The algorithm is divided into three functions

### One
	hasMutation(DNA: string[]);

This function receives the DNA and looks inside for more than a sequence of four letters vertically, horizontally and obliquely .

### Two
	isDNAValid(DNA: string[]);
	
Validate that the DNA only has the following words **ATCG**
### Three
	prepareForTheSearch(DNA: string[]);
	
Order the DNA in four directions, horizontal, vertical, oblique and reverse oblique
	
#### Oblique
	[ 'A', 'TC', 'GAT', 'CGTA', 'GTAGG', 'AGTACT', 'CTCGC', 'TGTA', 'GCC', 'AT', 'G' ]
![De forma diagonal](https://raw.githubusercontent.com/FranciscoGustavo/DNA/master/oblicua.PNG)
#### Oblique Reverse
	['A','GC','CGT','GTGG','TGTGA','AAAATG','CTACT','TGCC','ACA','CC','T' ]	
![De forma diagonal inversa](https://raw.githubusercontent.com/FranciscoGustavo/DNA/master/reverseoblicua.PNG)
#### Horizontal
	 ['ATGCGA','CAGTGC','TTATGT','AGAAGG','CCCCTA','TCACTG' ]
![De forma horizontal](https://raw.githubusercontent.com/FranciscoGustavo/DNA/master/horizontal.PNG)
#### Vertical
	['ACTACT','TATGCC','GGAACA','CTTACC','GGGGTT','ACTGAG']
![De forma vertical](https://raw.githubusercontent.com/FranciscoGustavo/DNA/master/vertical.PNG)
