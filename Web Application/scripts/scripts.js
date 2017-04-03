/********************
	
	INDEX.HTML

 ********************/

function today(){
	if(localStorage.getItem("hasData") === null){
		window.location = "setup.html"
	}else{
		var d = new Date();
		var dayToday = ["sun","mon","tue","wed","thu","fri","sat"][d.getDay()];
		var dayString = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d.getDay()];
		var date = d.toString().split(' ').splice(1,3).join(' ');
		document.getElementById("day").innerHTML = dayString;
		document.getElementById("date").innerHTML = date;

		var subjects = JSON.parse(localStorage.getItem("subjects"));
		var d = new Date();
		
		var classesToday = document.getElementById("classes");
		for( i=0; i<subjects.length; i++){
			for( ii=0; ii<subjects[i].days.length; ii++){
				if( subjects[i].days[ii] === dayToday){
					if( subjects[i].courseNumber === "" ){
						classesToday.innerHTML += `Class Code: ${subjects[i].classCode} <br> Course Description: ${subjects[i].courseDescription} <br> Time start: ${subjects[i].timeStart} <br> Time end: ${subjects[i].timeEnd} <br><br>`;
					}else{
						classesToday.innerHTML += `Class Code: ${subjects[i].classCode} <br> Course Number: ${subjects[i].courseNumber} <br> Course Description: ${subjects[i].courseDescription} <br> Time start: ${subjects[i].timeStart} <br> Time end: ${subjects[i].timeEnd} <br><br>`;
					}
				}
			}
		}
	}
}

/********************
	
	SETUP.HTML

 ********************/
function firstTime () {
	var startEnd = document.getElementById("start-end");
	var header = document.getElementById("header");
	var getStarted = document.getElementById("get-started");
	if(startEnd.className === "hide"){
		startEnd.className = "questions";
		getStarted.className = "hide";
		header.className = "";
	}
}

function recordSemester(){
	var startEnd = document.getElementById("start-end");
	var subjectAddition = document.getElementById("subject-addition");
	var startItems = document.getElementById("start");
	var endItems = document.getElementById("end");
	var startMonth = startItems.querySelector("#month").value;
	var startDay = startItems.querySelector("#day").value;
	var endMonth = endItems.querySelector("#month").value;
	var endDay = endItems.querySelector("#day").value;
	var valid = checkMonths(startMonth,endMonth);
	if(startMonth == "" || endMonth == ""){
		document.getElementById("warning").innerHTML = "Please pick a month."; 
  	}else if(startDay == "" || endDay == ""){
		document.getElementById("warning").innerHTML = "Please pick a day.";
  	}else if(startMonth == endMonth && startDay == endDay){
		document.getElementById("warning").innerHTML = "The semester cannot start and end at the same day.";
  	}else if(valid === "false"){
		document.getElementById("warning").innerHTML = "The semester hasn't started yet and it has already ended?";
  	}else if(valid === "same"){
		document.getElementById("warning").innerHTML = "The semester only has " + (endDay - startDay) +" days?";
  	}else{
  		var start = [startDay,startMonth];
  		var end = [endDay, endMonth];
  		localStorage.setItem("start",start);
  		localStorage.setItem("end",end);
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


var subjectArray = [];
function recordSubjects(){
	var cCode = document.getElementById("cCode").value;
	var cno = document.getElementById("cno").value;
	var cdesc = document.getElementById("cdesc").value;
	var timeStart = document.getElementById("time-start").value;
	var timeEnd = document.getElementById("time-end").value;
	var room = document.getElementById("room").value;


	if( cCode === "" || cdesc === "" || timeStart === "" || timeEnd === "" || room === ""){
		document.getElementById("may-mali").innerHTML = "Please fill up all fields";
		return;
	}

	var validTime = timeStart < timeEnd;
	if(validTime === false){
		document.getElementById("may-mali").innerHTML = "Time end is earlier than time start.";
		return undefined;
	}else if( validTime === true && (timeEnd.split(":")[0] - timeStart.split(":")[0]) > 8){
		var c = confirm("Are you sure your class lasts for" + (timeEnd.split(":")[0] - timeStart.split(":")[0]) + "hours?");
		if ( c === false){
			return;
		}
	}else{
		document.getElementById("may-mali").innerHTML = "";
	}

	var counter = 0;
	days = document.getElementsByClassName("day");
	var classDays = [];
	for( i=0; i<days.length; i++){
		if(days[i].checked){
			classDays[counter] = days[i].value;
			counter++;
		}
	}
	
	if( counter === 0 ){
		document.getElementById("may-mali").innerHTML = "No days picked!";
		return;
	}

	for( ii = 0; ii<classDays.length; ii++){
		var dummy = classDays[ii];
		var pNode = document.createElement("p");
	    var textNode;
	    if ( cno === ""){
			textNode = document.createTextNode(`${cCode}, ${cdesc}, ${timeStart} - ${timeEnd}`);  
	    }else{
			textNode = document.createTextNode(`${cCode}, ${cno}, ${cdesc}, ${timeStart} - ${timeEnd}`);  
	    }
		pNode.appendChild(textNode);
		document.getElementById(dummy).appendChild(pNode);
		if(document.getElementById(dummy).className = "hide"){
			document.getElementById(dummy).className = "";
			document.getElementById(dummy).appendChild(pNode);
		}
	}

	var subjectObject = {
		"classCode": cCode,
		"courseNumber": cno,
		"courseDescription": cdesc,
		"timeStart": timeStart,
		"timeEnd": timeEnd,
		"days": classDays,
		"room": room
	}

	subjectArray.push(subjectObject);
	
	document.getElementById("may-mali").innerHTML = "Subject Added!"
	resetForm();
}

function resetForm(){
	document.getElementById("cCode").value = "";
	document.getElementById("cno").value = "";
	document.getElementById("cdesc").value = "";
	document.getElementById("time-start").value = "";
	document.getElementById("time-end").value = "";
	document.getElementById("room").value = "";
  
	for( i=0; i<days.length; i++){
		if(days[i].checked){
			days[i].checked = false;
		}
	}
}

function saveSubjects(){
	var saveButton = document.getElementById("save-subjects");
	var subJson = JSON.stringify(subjectArray);
	localStorage.setItem(`subjects`, subJson);
	if(saveButton.value = "Save"){
		alert("saved");  
	}
	var c = confirm("Do you want to finish setup?");
	if(c === true){
    	localStorage.setItem("hasData","true");
		window.location = "index.html";
	}else{
   		saveButton.value = "Finish";
	}
}

/********************
	
	SCHEDULE.HTML

 ********************/
function schedule(){
	var days = document.getElementsByClassName("day");
	for( i=0;i<days.length;i++ ){
		days[i].addEventListener("click",showDay);
	}
	generateSchedule();
}

function showDay() {
	var toggle = this.attributes["data-toggle"].value;
	var thing = document.getElementById(toggle);
	if(thing.className === "hide"){
		thing.className = "";
	}else{
		thing.className = "hide";
	}
}

function generateSchedule(){
	var d = new Date();
	var dayToday = ["sun","mon","tue","wed","thu","fri","sat"][d.getDay()];
	var sched = JSON.parse(localStorage.getItem("subjects"));
	var thing = document.getElementById(`${dayToday}-div`);
	if(thing.id === `${dayToday}-div`){
		thing.className = "";
	}
	for( i=0; i<sched.length; i++){
		for( ii=0; ii<sched[i].days.length; ii++){
			var writeTo = document.getElementById(sched[i].days[ii]);
			writeTo.innerHTML += `<tr><td rowspan="2"><span class="classCode">${sched[i].classCode}</span><br><span class="courseDesc">${sched[i].courseDescription}</span></td> <td>${sched[i].timeStart} - ${sched[i].timeEnd} </td>  </tr> <tr><td>${sched[i].room}</td></tr>`
		}
	}
}