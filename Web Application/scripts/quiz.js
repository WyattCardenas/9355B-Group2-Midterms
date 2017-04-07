a = 0;
w = 0;
// x = 0;
// y = 0;
// z = 0;

function quizes(){
    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var subDrop = document.getElementById("subdrop");
    var classCodes = [];

    for( i=0; i<subjects.length; i++){
        classCodes.push(subjects[i].classCode);
    }

    for( i=0; i<classCodes.length; i++){
        if( localStorage.getItem(`${classCodes[i]}`) != null ){
            var asd = JSON.parse(localStorage.getItem(`${classCodes[i]}`));
            subDrop.innerHTML += `<span class="subject">${asd[0].subject}</span>`
            for( ii=0; ii<asd.length; ii++){
                subDrop.innerHTML += `
                    <div class="notedrop">
                        <div data-toggle="${asd[ii].subject}" class="title"> <button class="button" onclick="loadQuiz()"> ${asd[ii].title} </button></div>
                    </div>
                `
            }
        }
    }
}

function generateMCQuiz() {
    document.getElementById("multipleChoiceForm").innerHTML += `<h2>Question ${a+1}: </h2>
    <input id=mcQ${a} class="Questions" value="Question: "></input> <br>
    <h3>Choices:</h3>
    <input id=mC${w} value="Choice 1"></input>
    <input id=mC${w+1} value="Choice 2"></input>
    <input id=mC${w+2} value="Choice 3"></input>
    <input id=mC${w+3} value="Choice 4"></input>
    <h2>Answer: </h2> 
    <input id=answer${a} value="Answer"></input><br>`;

    w = w + 4;
    a = a + 1; 

    localStorage.setItem("a", a);
}

// function generateIQuiz() {
// 	x = x + 1;
//     document.getElementById("identificationForm").innerHTML += `<input id=iQ${x} class="Questions" value="Question ${x}"></input>
//     <h2>Answer: </h2> 
//     <input id=mCA${x} value="Answer"></input>` + "<br>";
// }

// function generateMTQuiz() {
// 	y = y + 1;
//     document.getElementById("matchingTypeForm").innerHTML += `<input id=mT${y} value=MatchingType: ></input>`;
// }

// function generateFIBQuiz() {
// 	z = z + 1
//     document.getElementById("fillInTheBlanksForm").innerHTML += `<input id=mC${z} value=FillInTheBlanks: ></input>`;
// }

// function saveValue(){
//     question = document.getElementById(`mcQ${a}`).value;
//     choice1 = document.getElementById(`mC${w}`).value;
//     choice2 = document.getElementById(`mC${w}`).value;
//     choice3 = document.getElementById(`mC${w}`).value;
//     choice4 = document.getElementById(`mC${w}`).value;
//     answer = document.getElementById('answer${a}').value;

//     // saveMCQuiz(question, choice1, choice2, choice3, choice4, answer);    

//     // alert(`${question} is saved!`);
// }

// function saveMCQuiz(question, choice1, choice2, choice3, choice4, answer) {
//     //document.getElementById("reviewer").submit();
// }

function displaySubjects(){
    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var writeTo = document.getElementById("subject");
    for( i=0; i<subjects.length; i++ ) {
        writeTo.innerHTML += `<option>${subjects[i].classCode}-${subjects[i].courseDescription}</option>`;
    }
}

function saveQuiz(){
    alert("Quiz Saved");
    
    var subject = document.getElementById("subject").value;
    var title = document.getElementById("title").value;
    choices = [];
    questions = [];
    answers = [];
    quizArray = [];

    var a = JSON.parse(localStorage.getItem("a"));
    var w = a*4;
    for(var x = 0; x < a; x++){
        questions.push(document.getElementById(`mcQ${x}`).value);
    }

    for(var y = 0; y < w; y++){
        choices.push(document.getElementById(`mC${y}`).value);
    }

    for(var z = 0; z < a; z++){
        answers.push(document.getElementById(`answer${z}`).value);
    }

    var noteObject = {
        "subject" : subject,
        "title" : title,
        "questions" : questions,
        "choices" : choices,
        "answers" : answers 
    }
    
    var quizArray = [];
    
    if( localStorage.getItem(`${subject.split("-")[0]}`) === null ){
        quizArray.push(noteObject); 
        var quizJSON = JSON.stringify(quizArray);   
        localStorage.setItem(`${subject.split("-")[0]}`, quizJSON);
        alert("saved");
    }else{
        quizArray = JSON.parse(localStorage.getItem(`${subject.split("-")[0]}`));
        quizArray.push(noteObject); 
        var quizJSON = JSON.stringify(quizArray);   
        localStorage.setItem(`${subject.split("-")[0]}`, quizJSON);
        alert("saved"); 
    }

    window.location = "review.html";
}

function loadQuiz(){
    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var questions = [];
    var a = 0;
    var classCodes = [];

    for( i=0; i<subjects.length; i++){
        classCodes.push(subjects[i].classCode);
    }

    //var num = JSON.parse(localStorage.getItem("nOQuizes"));
    // var quizzz = JSON.parse(localStorage.getItem(`quiz${num}`));
    for( i=0; i<classCodes.length; i++){
        if( localStorage.getItem(`${classCodes[i]}`) != null ){
            var asd = JSON.parse(localStorage.getItem(`${classCodes[i]}`));
            a = asd[i].questions.length;
        }
    }

    for(var z = 0; z < a; z++){
        questions.push(new Question(asd[z].questions, asd[z].choices, asd[z].answers));
    }

    quiz = new Quiz(questions);

    populate();

    if (document.getElementById("takeQuiz").className === "hide"){
        document.getElementById("takeQuiz").className = "";
        document.getElementById("content").className = "hide";
    }
}

Question.prototype.correctAnswer = function (choice){
    return choice === this.answer;
}

Quiz.prototype.getQuestionIndex = function(){
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function(){
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function(answer){
    if(this.getQuestionIndex().correctAnswer(answer)){
        this.score++;
    }

    this.questionIndex++;
}

function populate(){
    if(quiz.isEnded()){
        showScore();
    }else{
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().question;

        var choices = quiz.getQuestionIndex().choices;
        for(var  i = 0; i < choices.length; i++){
            var element = document.getElementById(`choice${i}`);
            element.innerHTML = choices[i];

            guess(`btn${i}`, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess){
    var button = document.getElementById(id);
    button.onclick = function(){
        quiz.guess(guess);

        populate();
    }
};

function showProgress(){
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

function showScore(){
    var endHTML = "<h1>Result</h1>";
    endHTML += `<h2 id=score>Your score is ${quiz.score}</h2>
                <button onclick="window.location = 'review.html'" class="button">End Quiz</button>`;

    var element = document.getElementById("quiz");
    element.innerHTML = endHTML;
}   

function Question(question, choices, answer){
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}

function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}