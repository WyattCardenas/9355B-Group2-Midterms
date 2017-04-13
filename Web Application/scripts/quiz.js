a = 0;
w = 0;

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
                        <div data-toggle="${asd[ii].subject}" class="title"> <button class="button" id="${asd[ii].title}" onclick="loadQuiz(this.id)">${asd[ii].title}</button></div>
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
    localStorage.setItem("w", w);
}

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
    var choices = [];
    var question = "";
    var answers = "";
    var questions = [];
    quiz = [];

    var a = JSON.parse(localStorage.getItem("a"));
    var w = JSON.parse(localStorage.getItem("w"));

    for(var x = 0; x < a; x++){
        question = document.getElementById(`mcQ${x}`).value;
        answer = document.getElementById(`answer${x}`).value;

        for(var y = 0; y < w; y++){
            choices.push(document.getElementById(`mC${y}`).value);
        }

        questions.push(new Question(question, choices, answer));
    }
    
    if( localStorage.getItem(`${subject.split("-")[0]}`) === null ){
        quiz.push(new Quiz(subject, title, questions)); 
        var quizJSON = JSON.stringify(quiz);   
        localStorage.setItem(`${subject.split("-")[0]}`, quizJSON);
        alert("saved");
    }else{
        quizArray = JSON.parse(localStorage.getItem(`${subject.split("-")[0]}`));
        quiz.push(new Quiz(subject, title, questions)); 
        var quizJSON = JSON.stringify(quiz);   
        localStorage.setItem(`${subject.split("-")[0]}`, quizJSON);
        alert("saved"); 
    }

    window.location = "review.html";
}

function loadQuiz(clickedButton){
    var b = localStorage.length;
    var buttons = document.querySelectorAll('button');
    var index = 0;

    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var questions = [];
    var a = document.getElementsByClassName("button").length;
    var classCodes = [];
    var asd = "";

    for( i=0; i<subjects.length; i++){
        classCodes.push(subjects[i].classCode);
    }

    for(var x = 0; x < a; x++){
        asd = JSON.parse(localStorage.getItem(`${classCodes[x]}`));
        index = x;

        for(var y = 0; y<buttons.length; y++){
            if(asd[0].title === clickedButton){   
                for(var z = 0; z < asd[0].questions.length; z++){
                    questions.push(new Question(asd[0].questions[z].question, asd[0].questions[z].choices, asd[0].questions[z].answer));
                }
                break;
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
    var w = JSON.parse(localStorage.getItem("w"));

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