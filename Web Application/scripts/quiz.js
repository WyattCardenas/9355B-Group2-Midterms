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

    if(window.z != 0){
        window.z = z - 1;
    }else{
        window.z = 0;
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

    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var classCodes = [];
    for( i=0; i<subjects.length; i++){
        classCodes.push(subjects[i].classCode);
    }

    itExists = false;
    for(var x=0; x <classCodes.length; x++){
        var quizTitle = JSON.parse(localStorage.getItem(`${classCodes[x]}`));

        if(quizTitle != undefined){
            for(var z = 0; z<quizTitle.length; z++){
                if(quizTitle[z].title == title){
                    itExists = true;
                }
            }
        }
    }

    if(itExists === false && title != "" && document.getElementById(`question`).value != "" && document.getElementById(`answer`).value != "" && document.getElementById(`choice0`).value != "" && document.getElementById(`choice1`).value != "" && document.getElementById(`choice2`).value != "" && document.getElementById(`choice3`).value != ""){
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

        localStorage.removeItem("button");
        localStorage.removeItem("tempQuiz");
        window.location = "newrem.html";
    }else{
        if(title === "" && document.getElementById(`question`).value === "" && document.getElementById(`answer`).value === "" && document.getElementById(`choice0`).value === "" && document.getElementById(`choice1`).value === "" && document.getElementById(`choice2`).value === "" && document.getElementById(`choice3`).value === ""){
            var element = document.getElementById("titleError");
            element.innerHTML = `Don't leave any input fields blank!`;
        }else{
            var element = document.getElementById("titleError");
            element.innerHTML = `You already have a quiz named "${title}"`;
            element.innerHTML += "<p>Please rename the title of this quiz</p>";
            element.innerHTML += "<p>or edit the quiz that already has this title</p>";
        }
    }
}

function overwriteQuiz(){
    var subject = document.getElementById("subject").value;
    var title = document.getElementById("title").value;

    if(JSON.parse(localStorage.getItem(`${subject.split("-")[0]}`)) === null){
        quiz = [];
    }else{
        quiz = JSON.parse(localStorage.getItem(`${subject.split("-")[0]}`));
    }

    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var classCodes = [];
    for( i=0; i<subjects.length; i++){
        classCodes.push(subjects[i].classCode);
    }

    itExists = false;
    for(var x=0; x <classCodes.length; x++){
        var quizTitle = JSON.parse(localStorage.getItem(`${classCodes[x]}`));

        if(quizTitle != undefined){
            for(var z = 0; z<quizTitle.length; z++){
                if(quizTitle[z].title == title){
                    itExists = true;
                }
            }
        }
    }

    if(itExists === false){
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


        localStorage.removeItem("button");
        localStorage.removeItem("tempQuiz");
        window.location = "newrem.html";
    }else{
    	if(title === "" || document.getElementById(`question`).value === "" || document.getElementById(`answer`).value === "" || document.getElementById(`choice0`).value === "" || document.getElementById(`choice1`).value === "" || document.getElementById(`choice2`).value === "" || document.getElementById(`choice3`).value === ""){
            var element = document.getElementById("titleError");
            element.innerHTML = `Don't leave any input fields blank!`;
        }else{
            var answer = confirm("Are you sure you're done editing this quiz?");
	        if (answer == true) {
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
	                        if(asd[y].title === localStorage.getItem('button')){   
	                            var key = `${asd[y].subject.split("-")[0]}`;
	                            asd.splice(y, 1);
	                            var quizJSON = JSON.stringify(asd);

	                            localStorage.setItem(key, quizJSON);

	                            if(asd.length == 0){
	                                localStorage.removeItem(key);                    
	                            }

	                            createQuiz();
	                            window.location = "newrem.html";
	                            break;
	                        }   
	                    }
	                }
	            }
	        }
        }
    }
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

    for (var i = questions.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = questions[randomIndex]; 
         
        questions[randomIndex] = questions[i]; 
        questions[i] = itemAtIndex;
    }

    quiz = new Quiz("", "", questions);

    populate();

    if (document.getElementById("takeQuiz").className === "hide"){
        document.getElementById("takeQuiz").className = "";
        document.getElementById("content").className = "hide";
    }
}

function deleteQuiz(button){
    var answer = confirm("Are you sure you want to delete this quiz?");
    if (answer == true) {
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
                    if(asd[y].title === button){   
                        var key = `${asd[y].subject.split("-")[0]}`;
                        asd.splice(y, 1);
                        var quizJSON = JSON.stringify(asd);

                        localStorage.setItem(key, quizJSON);

                        if(asd.length == 0){
                            localStorage.removeItem(key);                    
                        }

                        window.location = "review.html";
                        break;
                    }   
                }
            }
        }
    } else {
        window.location = "review.html";
    }
}

function editQuiz(){
    var button = localStorage.getItem('button');
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
                if(asd[y].title === button){ 
                    q = asd;
                    localStorage.setItem("tempQuiz", q);

                    for(z = 0; z < asd[y].questions.length; z = z){
                        document.getElementById("subject").value = `${q[y].subject}`; 
                        document.getElementById("title").value = `${q[y].title}`;
                        document.getElementById(`question`).value = `${q[y].questions[z].question}`;
                        document.getElementById(`answer`).value = `${q[y].questions[z].answer}`;

                        for(var index = 0; index < 4; index++){
                            document.getElementById(`choice${index}`).value = `${q[y].questions[z].choices[index]}`;                            
                        }

                        z++;
                        quizClassCode = document.getElementById("subject").value.split("-")[0];
                        break;
                    }

                    if(asd[y].questions.length == 1){
                    	document.getElementById('saveButton').outerHTML = '<button id="saveButton" onclick="saveQuestion()">Next</button>';
                    }
                }   
            }
        }
    }
}

function loadNextQuestion(questionIndex, quizClassCode, tempQuiz){
    var quiz = tempQuiz;
    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var button = localStorage.getItem("button");
    var choices = [];
    var question = "";
    var answers = "";
    questions = [];
    
    question = document.getElementById(`question`).value;
    answer = document.getElementById(`answer`).value;

    for(var y = 0; y < 4; y++){
        choices.push(document.getElementById(`choice${y}`).value);
    }

    questions.push(new Question(question, choices, answer));

    var n = window.z;
    document.getElementById(`q`).innerHTML = `Question ${n}`; 

    if(quiz != null){
        for(var y = 0; y<quiz.length; y++){
            if(quiz[y].title === button){                
                if(questionIndex != quiz[y].questions.length){
                    for(z = questionIndex; z < quiz[y].questions.length; z = z){
                        document.getElementById("subject").value = `${quiz[y].subject}`; 
                        document.getElementById("title").value = `${quiz[y].title}`;
                        document.getElementById(`question`).value = `${quiz[y].questions[z].question}`;
                        document.getElementById(`answer`).value = `${quiz[y].questions[z].answer}`;

                        for(var index = 0; index < 4; index++){
                            document.getElementById(`choice${index}`).value = `${quiz[y].questions[z].choices[index]}`;                            
                        }

                        z++;
                        quizClassCode = document.getElementById("subject").value.split("-")[0];
                        break;
                    }
                }

                if(questionIndex == quiz[y].questions.length - 1){
                    document.getElementById('saveButton').outerHTML = '<button id="saveButton" onclick="saveQuestion()">Next</button>';
                }
            }   
        }
    }
}

title = 0;
function openOption(button) {
    document.getElementById("mySidenav2").style.width = "250px";
    document.getElementById("+").className = "hide";

    title = button;
    localStorage.setItem("button", title);
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
                <button onclick="window.location = 'review.html'" class="button" id="endQuizButton">End Quiz</button>`;

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