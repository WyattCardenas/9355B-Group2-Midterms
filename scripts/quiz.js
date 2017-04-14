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
                        <div class="title"> <button class="button" id="${asd[ii].title}" onclick="openOption(this.id)">${asd[ii].title}</button></div>
                    </div>
                `
            }
        }
    }
}

function displaySubjects(){
    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var writeTo = document.getElementById("subject");
    for( i=0; i<subjects.length; i++ ) {
        writeTo.innerHTML += `<option>${subjects[i].classCode}-${subjects[i].courseDescription}</option>`;
    }
}

function saveQuestion(){
    var choices = [];
    var question = "";
    var answers = "";
    
    if(window.questions == undefined){
        questions = [];
    }else{
        questions = window.questions;
    }

    var n = window.questions.length + 2;
    document.getElementById(`q`).innerHTML = `Question ${n}`;    

    question = document.getElementById(`question`).value;
    answer = document.getElementById(`answer`).value;

    for(var y = 0; y < 4; y++){
        choices.push(document.getElementById(`choice${y}`).value);
    }

    questions.push(new Question(question, choices, answer));

    document.getElementById(`question`).value = "";
    document.getElementById(`answer`).value = "";

    for(var x = 0; x < 4; x++){
        document.getElementById(`choice${x}`).value = "";
    }
}

function previousQuestion(){
    if(window.questions.length > 0){
        var a = window.questions.length;

        var x = a;
        document.getElementById(`question`).value = questions[x-1].question;
        document.getElementById(`answer`).value = questions[x-1].answer;

        for(var y = 0; y < 4; y++){
            document.getElementById(`choice${y}`).value = questions[x-1].choices[y];
        }

        window.questions.length = a - 1;

        var n = window.questions.length + 1;
        document.getElementById(`q`).innerHTML = `Question ${n}`;  
    }
}

function createQuiz(){
    var subject = document.getElementById("subject").value;
    var title = document.getElementById("title").value;

    if(JSON.parse(localStorage.getItem(`${subject.split("-")[0]}`)) === null){
        quiz = [];
    }else{
        quiz = JSON.parse(localStorage.getItem(`${subject.split("-")[0]}`));
    }

    if(window.questions == undefined){
        questions = [];
        choices = [];
        question = document.getElementById(`question`).value;
        answer = document.getElementById(`answer`).value;

        for(var y = 0; y < 4; y++){
            choices.push(document.getElementById(`choice${y}`).value);
        }

        questions.push(new Question(question, choices, answer));
    
        if( localStorage.getItem(`${subject.split("-")[0]}`) === null ){
            quiz.push(new Quiz(subject, title, questions)); 
            var quizJSON = JSON.stringify(quiz);   
            localStorage.setItem(`${subject.split("-")[0]}`, quizJSON);
        }else{
            quizArray = JSON.parse(localStorage.getItem(`${subject.split("-")[0]}`));
            quiz.push(new Quiz(subject, title, questions)); 
            var quizJSON = JSON.stringify(quiz);   
            localStorage.setItem(`${subject.split("-")[0]}`, quizJSON);
        }
    }else{
        questions = window.questions;
        choices = [];
        question = document.getElementById(`question`).value;
        answer = document.getElementById(`answer`).value;

        for(var y = 0; y < 4; y++){
            choices.push(document.getElementById(`choice${y}`).value);
        }

        questions.push(new Question(question, choices, answer));
        if( localStorage.getItem(`${subject.split("-")[0]}`) === null ){
            quiz.push(new Quiz(subject, title, questions)); 
            var quizJSON = JSON.stringify(quiz);   
            localStorage.setItem(`${subject.split("-")[0]}`, quizJSON);
        }else{
            quizArray = JSON.parse(localStorage.getItem(`${subject.split("-")[0]}`));
            quiz.push(new Quiz(subject, title, questions)); 
            var quizJSON = JSON.stringify(quiz);   
            localStorage.setItem(`${subject.split("-")[0]}`, quizJSON);
        }
    }

    window.location = "review.html";
}

function loadQuiz(clickedButton){
    var b = localStorage.length;
    var index = 0;

    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var questions = [];
    var classCodes = [];
    var asd = "";

    for( i=0; i<subjects.length; i++){
        classCodes.push(subjects[i].classCode);
    }

    var a = classCodes.length;
    for(var x = 0; x < a; x++){
        asd = JSON.parse(localStorage.getItem(`${classCodes[x]}`));

        if(asd != null){
            for(var y = 0; y<asd.length; y++){
                if(asd[y].title === clickedButton){   
                    for(var z = 0; z < asd[y].questions.length; z++){
                        questions.push(new Question(asd[y].questions[z].question, asd[y].questions[z].choices, asd[y].questions[z].answer));
                    }
                    break;
                }   
            }
        }
    }

    quiz = new Quiz("", "", questions);

    populate();

    if (document.getElementById("takeQuiz").className === "hide"){
        document.getElementById("takeQuiz").className = "";
        document.getElementById("content").className = "hide";
    }
}

function deleteQuiz(button){
    var b = localStorage.length;
    var index = 0;

    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var questions = [];
    var classCodes = [];
    var asd = "";

    for( i=0; i<subjects.length; i++){
        classCodes.push(subjects[i].classCode);
    }

    var a = classCodes.length;
    for(var x = 0; x < a; x++){
        asd = JSON.parse(localStorage.getItem(`${classCodes[x]}`));

            for(var y = 0; y<asd.length; y++){
                if(asd[y].title === button){   
                    var key = `${asd[y].subject.split("-")[0]}`;
                    asd.splice(y, 1);
                    var quizJSON = JSON.stringify(asd);

                    localStorage.setItem(key, quizJSON);

                    window.location = "review.html";
                    break;
                }   
            }
    }
}

title = 0;
function openOption(button) {
    document.getElementById("mySidenav2").style.width = "250px";
    document.getElementById("+").className = "hide";

    title = button;
}

function closeOption() {
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("+").className = "plus";
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
        for(var  i = 0; i < 4; i++){
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

function Quiz(subject, title, questions){
    this.subject = subject;
    this.title = title;
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}