function generateMCQuiz() {
    document.getElementById("multipleChoiceForm").innerHTML += "<input value='MultipleChoice: '></input>";
}

function generateIQuiz() {
    document.getElementById("identificationForm").innerHTML += "<input value='Identification: '></input>";
}

function generateMTQuiz() {
    document.getElementById("matchingTypeForm").innerHTML += "<input value='MatchingType: '></input>";
}

function generateFIBQuiz() {
    document.getElementById("fillInTheBlanksForm").innerHTML += "<input value='FillInTheBlanks: '></input>";
}

function saveQuiz() {
    document.getElementById("reviewer").submit();
}