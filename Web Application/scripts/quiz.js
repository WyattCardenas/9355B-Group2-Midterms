a = 0;
w = 0;
// x = 0;
// y = 0;
// z = 0;

if(JSON.parse(localStorage.getItem("nOQuizes")) != 0){
    var num = JSON.parse(localStorage.getItem("nOQuizes"));
    var element = document.getElementById("quiz-container");
    
    for(var  i = 1; i < num + 1; i++){    
        element.innerHTML += `<button onclick="loadQuiz()" id="quiz${i}" class="button"><a href="#takeQuiz">Quiz ${i}</a></button><br>`;
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

function saveQuiz(){
    alert("Quiz Saved");
    var num = JSON.parse(localStorage.getItem("nOQuizes")) + 1;
    localStorage.setItem("nOQuizes", num);
    var a = localStorage.getItem("a");
    //localStorage.clear();

    var questions = [];
    var choices = [];

    for(var x = 0; x < a; x++){
        question = document.getElementById(`mcQ${x}`).value;
        answerToQuestion = document.getElementById(`answer${x}`).value;
    }

    for(y = 0; y < 4; y++){
        choices.push(document.getElementById(`mC${y}`).value);
    }

    for(var z = 0; z < a; z ++){
        questions.push(new Question(a, question, choices, answerToQuestion));
    }

    quiz = new Quiz(questions);

    quizObject = JSON.stringify(quiz);

    localStorage.setItem(`quiz${num}`, quizObject);

    //populate();

    window.location = "review.html";
}

function loadQuiz(){
    var questions = []
    var num = JSON.parse(localStorage.getItem("nOQuizes"));
    var quizzz = JSON.parse(localStorage.getItem(`quiz${num}`));
    var a = localStorage.getItem("a");
    
    var a = localStorage.getItem("a");
    for(var z = 0; z < a; z ++){
        questions.push(new Question(a, quizzz.questions[0].question, quizzz.questions[0].choices, quizzz.questions[0].answer));
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

function Question(nOQuestions, question, choices, answer){
    this. nOQuestions = nOQuestions;
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}

function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}