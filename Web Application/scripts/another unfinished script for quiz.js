
questionNumber = 1;

function generateMCQuiz(){
    document.getElementById("multipleChoiceForm").innerHTML += `
        <form id="mcquestion${questionNumber}">
            <h2>Question ${questionNumber}: </h2>
            <input class="question" name="question" value="test"/><br>
            <h3>Choices</h3>
            <input class="choice" name="choice" value="Choice 1" onclick="this.value=""">
            <input class="choice" name="choice" value="Choice 2" onclick="this.value=""">
            <input class="choice" name="choice" value="Choice 3" onclick="this.value=""">
            <input class="choice" name="choice" value="Choice 4" onclick="this.value="""> 
            <h2>Answer: </h2>
            <input class="answer" name="answer" value="Choice 1"><br>;
        </form>
    `
    questionNumber++;
}

function generateIQuiz(){
    document.getElementById("identificationForm").innerHTML += `   
        <form id="iQuestion${questionNumber}"
            <h2>Question ${questionNumber}: <h2>
            <input class="question" name="question" value="tanong"/><br>
            <h3>Answer: </h3>
            <input class="answer" name="answer" value="sagot"><br>
        </form>
    `
    questionNumber++;
}

function displaySubjects(){
    var subjects = JSON.parse(localStorage.getItem("subjects"));
    var writeTo = document.getElementById("subject");
    for( i=0; i<subjects.length; i++ ) {
        writeTo.innerHTML += `<option>${subjects[i].classCode}-${subjects[i].courseDescription}</option>`;
    }
}

function saveQuiz(){
    var quiz = {};
    var quizArray = [];

    var mcArray = [];
    var mcobject = {};
    
    var iArray = [];
    var iObject = {};
    for( var i=1; i<=questionNumber; i++){
        var mcquestion = document.getElementById(`mcquestion${i}`);
        var identification = document.getElementById(`iQuestion${i}`);
        
        if ( mcquestion != null ){
            var question = mcquestion.querySelector(".question").value;
            var choices = mcquestion.querySelectorAll(".choice");
            var answer = mcquestion.querySelector(".answer").value;
            
            var choicesValue = [];
            for( var ii = 0; ii< choices.length; ii++){
                choicesValue.push(choices[ii].value);
            }
            
            mcobject = {
                "question" : question,
                "choices" : choicesValue,
                "answer" : answer
            }
            
            mcArray.push(mcobject);

            console.log("mc asd")
        }

        if ( identification != null){
            var question = identification.querySelector(".question").value;
            var answer = identification.querySelector(".answer").value;
            
            iObject = {
                "question" : question,
                "answer" : answer
            }
            
            iArray.push(iObject);

            console.log("ideifivation stored")
        }
    }

    quiz.title = document.getElementById("title").value;
    quiz.subject = document.getElementById("subject").value;
    if(mcArray.length != 0){
        quiz.multipleChoice = mcArray;    
    }
    if(iArray.length !=0){
        quiz.identification = iArray;    
    }
    

    if( localStorage.getItem('quiz') != null){
        quizArray = JSON.parse(localStorage.getItem('quiz'));
        quizArray.push(quiz);
        var quizString = JSON.stringify(quizArray);
        localStorage.setItem('quiz',quizString);    
    }else{
        quizArray.push(quiz);
        var quizString = JSON.stringify(quizArray);
        localStorage.setItem('quiz',quizString);    
    }
    

    questionNumber = 0;
    window.location = 'review.html';
}

function review(){
    var subDrop = document.getElementById("subdrop");

    if( localStorage.getItem("quiz") != null){
        var quizzes = JSON.parse(localStorage.getItem("quiz"));
        for( var i=0; i<quizzes.length; i++ ){
            if( document.getElementById(`${quizzes[i].subject.split("-")[0]}`) === null ){
                subDrop.innerHTML += `<span class="subject">${quizzes[i].subject}</span>`
                subDrop.innerHTML += `
                    <div id=${quizzes[i].subject.split("-")[0]}>
                        <button onclick="loadQuiz(${i})"> ${quizzes[i].title} </button>
                    </div>
                `
            }else{
                var writeTo = document.getElementById(`${quizzes[i].subject.split("-")[0]}`);
                writeTo.innerHTML += `<button onclick="loadQuiz(${i})"> ${quizzes[i].title} </button>`
            }
        }
    }
}

var i = 0;
var score = 0;
function loadQuiz(index){
    console.log("huwaw");
    var allQuiz = JSON.parse(localStorage.getItem('quiz'));
    var quiz = allQuiz[index];


    if( document.getElementById("takeQuiz").className === "hide" ){
        document.getElementById("takeQuiz").className = "";
        document.getElementById("nav").className = "hide";
        document.getElementById("main-container").className = "hide";
    }

    if( quiz.identification != undefined){
        console.log("asd");
        
        document.getElementById("next").addEventListener("click", function(){
            if ( document.getElementById("userAnswer").value === answer){
                score++;
            }
            i++;

            loadQuiz(index);
        });

        var answer = quiz.identification[i].answer;
        document.getElementById("title").innerHTML = quiz.title;
        document.getElementById("question").innerHTML = quiz.identification[i].question;
        document.getElementById("answer-sheet").innerHTML = 'Answer = <input id="userAnswer" type="text"/>';
    }

    if(i === quiz.identification[i].question.length){
        document.getElementById("finish").className = ""
        document.getElementById("next").className = "hide"
    }
}