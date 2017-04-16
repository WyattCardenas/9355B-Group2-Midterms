a = 0;
w = 0;
// x = 0;
// y = 0;
// z = 0;
noOfQuizzes = 0;

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
//  x = x + 1;
//     document.getElementById("identificationForm").innerHTML += `<input id=iQ${x} class="Questions" value="Question ${x}"></input>
//     <h2>Answer: </h2> 
//     <input id=mCA${x} value="Answer"></input>` + "<br>";
// }

// function generateMTQuiz() {
//  y = y + 1;
//     document.getElementById("matchingTypeForm").innerHTML += `<input id=mT${y} value=MatchingType: ></input>`;
// }

// function generateFIBQuiz() {
//  z = z + 1
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
    alert("Are you sure you're done?");

    //localStorage.clear();

    var questions = [];

    var subject = document.getElementById(`subject`).value;
    var title = document.getElementById(`title`).value;

    for(var x = 0; x < a; x++){
        localStorage.setItem(`title${x}`, document.getElementById(`title`).value); 
        localStorage.setItem(`question${x}`, document.getElementById(`mcQ${x}`).value);
        localStorage.setItem(`answer${x}`, document.getElementById(`answer${x}`).value);
    }

    for(y = 0; y < w; y++){
        localStorage.setItem(`choice${y}`, document.getElementById(`mC${y}`).value);
    }

    var i = 0; 
    for(var z = 0; z < a; z ++){
        questions.push(new Question(localStorage.getItem(`question${z}`), [localStorage.getItem(`choice${i}`), localStorage.getItem(`choice${i+1}`), localStorage.getItem(`choice${i+2}`), localStorage.getItem(`choice${i+3}`)], localStorage.getItem(`answer${z}`)));
        i = i + 4;
    }

    quiz = new Quiz(title, subject, questions);

    quizObject = JSON.stringify(quiz);

    localStorage.setItem(`${subject.split("-")[0]}-${noOfQuizzes}`, quizObject);

    //populate();
    noOfQuizzes++;
    window.location = "review.html";

}

function loadQuiz(){
    var questions = [];

    var i = 0; 
    var a = localStorage.getItem("a");
    for(var z = 0; z < a; z ++){
        questions.push(new Question(localStorage.getItem(`question${z}`), [localStorage.getItem(`choice${i}`), localStorage.getItem(`choice${i+1}`), localStorage.getItem(`choice${i+2}`), localStorage.getItem(`choice${i+3}`)], localStorage.getItem(`answer${z}`)));
        i = i + 4;
    }

    quiz = new Quiz(title, subject, questions);

    populate();
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
        element.innerHTML = quiz.getQuestionIndex().text;

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
    endHTML += `<h2 id=score>Your score is ${quiz.score}</h2`;

    var element = document.getElementById("quiz");
    element.innerHTML = endHTML;
}   

function Question(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

function Quiz(title, subject, questions){
    this.title = title;
    this.subject = subject;
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

function displaySubjects(){
    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var writeTo = document.getElementById("subject");
    for( i=0; i<subjects.length; i++ ) {
        writeTo.innerHTML += `<option>${subjects[i].classCode}-${subjects[i].courseDescription}</option>`;
    }
}

function review(){
    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var subDrop = document.getElementById("subdrop");
    var classCodes = [];
    for( i=0; i<subjects.length; i++){
        classCodes.push(subjects[i].classCode);
    }

    for( i=0; i<classCodes.length; i++){
        if( localStorage.getItem(`${classCodes[i]}-${i}`) != null){
            var asd = JSON.parse(localStorage.getItem(`${classCodes[i]}-${i}`));
            subDrop.innerHTML += `<span class="subject">${asd.subject}</span>`;
            for( ii=0; ii<asd.questions.length; ii++){
                subDrop.innerHTML += `
                    <div class="notedrop">
                        <div> 
                            <button class="button" onclick="loadQuiz()">${asd.title}</button>
                            <button onclick="del(${ii}, '${classCodes[i]}')" style="display: inline; margin-left: 10px;">
                                X
                            </button>
                        </div>
                    </div>
                `
            }
        }
    }
}

// function del(index, subject){
//     var asd = JSON.parse(localStorage.getItem(`${subject}`));
//     asd.splice(index, 1);
//     var asdString = JSON.stringify(asd);
//     if ( asd.length === 0){
//         localStorage.removeItem(`${subject}notes`);
//     }else{
//         localStorage.setItem(`${subject}notes`,asdString);
//     }

//     window.location = "review.html"
// }
