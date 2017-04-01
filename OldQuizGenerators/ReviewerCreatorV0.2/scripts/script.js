w = 0;
x = 0;
y = 0;
z = 0;

function generateMCQuiz() {
	w = w + 1;
    document.getElementById("multipleChoiceForm").innerHTML += `<input id=mC${w} value=MultipleChoice: ></input>`;
}

function generateIQuiz() {
	x = x + 1;
    document.getElementById("identificationForm").innerHTML += `<input id=i${x} value=Identification: ></input>`;
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