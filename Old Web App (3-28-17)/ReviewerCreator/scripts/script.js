a = 0;
w = 0;
x = 0;
y = 0;
z = 0;

function generateMCQuiz() {
	a = a + 1;
	w = w + 1;
    document.getElementById("multipleChoiceForm").innerHTML += `<input id=mcQ${a} class="Questions" value="Question ${a}"></input> <br>
    <input id=mC${w} value="Choice ${w}"></input>
    <input id=mC${w+1} value="Choice ${w+1}"></input>
    <input id=mC${w+2} value="Choice ${w+2}"></input>
    <input id=mC${w+3} value="Choice ${w+3}"></input> 
    <h2>Answer: </h2> 
    <input id=mCA${a} value="Answer"></input>` +  "<br>";
    w = w + 3;
}

function generateIQuiz() {
	x = x + 1;
    document.getElementById("identificationForm").innerHTML += `<input id=iQ${x} class="Questions" value="Question ${x}"></input>
    <h2>Answer: </h2> 
    <input id=mCA${x} value="Answer"></input>` + "<br>";
}

function generateMTQuiz() {
	y = y + 1;
    document.getElementById("matchingTypeForm").innerHTML += `<input id=mT${y} value=MatchingType: ></input>`;
}

function generateFIBQuiz() {
	z = z + 1
    document.getElementById("fillInTheBlanksForm").innerHTML += `<input id=mC${z} value=FillInTheBlanks: ></input>`;
}

function saveQuiz() {
    document.getElementById("reviewer").submit();
}