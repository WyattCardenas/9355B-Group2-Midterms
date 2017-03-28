var getStarted = document.getElementById("get-started");
var startEnd = document.getElementById("start-end");
var subjectAddition = document.getElementById("subject-addition");
var header = document.getElementById("header");
getStarted.addEventListener("click",start);

function start(){
  if(startEnd.className === "hide"){
    startEnd.className = "questions";
    getStarted.className = "hide";
    header.className = "";
  }
}

var startItems = document.getElementById("start");
var endItems = document.getElementById("end");
var submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click",recordSemester);

//RECORD UNG START AND END NUNG SEM
//WALA PA LOCAL STORAGE
function recordSemester(){
  var startMonth = startItems.querySelector("#month").value;
  var startDay = startItems.querySelector("#day").value;
  var endMonth = endItems.querySelector("#month").value;
  var endDay = endItems.querySelector("#day").value;
  var valid = checkMonths(startMonth,endMonth);
  if(startMonth == "" || endMonth == ""){
    document.getElementById("warning").innerHTML = "wala ka piniling month gago"; 
  }else if(startDay == "" || endDay == ""){
    document.getElementById("warning").innerHTML = "wala ka piniling day gago";
  }else if(startMonth == endMonth && startDay == endDay){
    document.getElementById("warning").innerHTML = "same day nagstart at nag end nice";
  }else if(valid === "false"){
    document.getElementById("warning").innerHTML = "di pa nga ang sstart ung sem ang end na agad";
  }else if(valid === "same"){
    document.getElementById("warning").innerHTML = "nice " + (endDay - startDay) +" days lang ung sem";
  }else{
    document.getElementById("warning").innerHTML = "The semester starts/ed " +startMonth+" "+startDay+"<br> The semster ends "+endMonth+" "+endDay;
    if(subjectAddition.className === "hide"){
      subjectAddition.className = "";
      startEnd.className = "hide";
    }
  }
}

function checkMonths(sMonth,eMonth){
  var x = 0;
  var y = 0;
  switch (sMonth) {
    case "January":
      x = 1;
      break;
    case "February":
      x = 2;
      break;
    case "March":
      x = 3;
      break;
    case "April":
      x = 4;
      break;
    case "May":
      x = 5;
      break;
    case "June":
      x = 6;
      break;
    case "July":
      x = 7;
      break;
    case "August":
      x = 8;
      break;
    case "September":
      x = 9;
      break;
    case "October":
      x = 10;
      break;
    case "November":
      x = 11;
      break;
    case "December":
      x = 12;
      break;
    default:
      x = 0
      break;
  }
  switch (eMonth) {
    case "January":
      y = 1;
      break;
    case "February":
      y = 2;
      break;
    case "March":
      y = 3;
      break;
    case "April":
      y = 4;
      break;
    case "May":
      y = 5;
      break;
    case "June":
      y = 6;
      break;
    case "July":
      y = 7;
      break;
    case "August":
      y = 8;
      break;
    case "September":
      y = 9;
      break;
    case "October":
      y = 10;
      break;
    case "November":
      y = 11;
      break;
    case "December":
      y = 12;
      break;
    default:
      y = 0
      break;
  }
  if(y-x < 0){
    return "false";
  }else if(y-x == 0){
    return "same"
  }else{
    return "true";
  }
}

var addSubject = document.getElementById("add-subject");
var saveSubjects = document.getElementById("save-subjects");
var subjectForm = document.getElementById("subject-form");
var listSubjects = document.getElementById("list-subjects");
addSubject.addEventListener("click",addSub);
addSubject.addEventListener("click",recordSub);
saveSubjects.addEventListener("click",saveSubs);

//TEMPORARY, PANG TEST KO LANG HUEHEUUHE
function addSub(){
  var cno = subjectForm.querySelector("#cno").value;
  var cdesc = subjectForm.querySelector("#cdesc").value;
  var optionNode = document.createElement("option");
  var optionText = document.createTextNode(cno+","+cdesc);
  optionNode.appendChild(optionText);
  listSubjects.appendChild(optionNode);
}

//ADDS SUBJECT TO DAYS THING
function recordSub(){
  var recordedSubjs = document.getElementById("recorded-subjs");
  var cno = subjectForm.querySelector("#cno").value;
  var cdesc = subjectForm.querySelector("#cdesc").value;
  var day = subjectForm.querySelector("#days").value;
  var writeTo = recordedSubjs.querySelector(`#${day}`);
  var pNode = document.createElement("p");
  var pText = document.createTextNode(cno+","+cdesc);
  pNode.appendChild(pText);
  if( writeTo.className === "hide"){
    writeTo.className = "";
    writeTo.appendChild(pNode);
  }
}

//SAVE THINGY, DI KO ALAM LOCAL STORAGE
function saveSubs(){
  document.getElementById("subjs").innerHTML = "saved";
}