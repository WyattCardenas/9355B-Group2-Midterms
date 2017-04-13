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
		for(var i=0; i<subjects.length; i++){
			for(var ii=0; ii<subjects[i].days.length; ii++){
				if( subjects[i].days[ii] === dayToday){
					if( subjects[i].courseNumber === "" ){
						classesToday.innerHTML += `${subjects[i].classCode}, ${subjects[i].courseDescription} <br> Time start: ${subjects[i].timeStart} <br> Time end: ${subjects[i].timeEnd} <br> Room: ${subjects[i].room} <br><br>`;
					}else{
						classesToday.innerHTML += `${subjects[i].classCode}, ${subjects[i].courseNumber} <br>${subjects[i].courseDescription} <br>${subjects[i].timeStart} - ${subjects[i].timeEnd} <br> ${subjects[i].room} <br><br>`;
					}
				}
			}
		}

		if(localStorage.getItem("reminders") != null){
			var reminders = JSON.parse(localStorage.getItem('reminders'));
			var rem = document.getElementById("rem");
			for(var i=0;i<reminders.length; i++){
				if( document.getElementById(`${reminders[i].subject.split("-")[0]}`) === null){
					rem.innerHTML += `<span class="reminderTitle">${reminders[i].subject}</span>`
					rem.innerHTML += `
						<div id=${reminders[i].subject.split("-")[0]}>
							<p>Title: ${reminders[i].title}<br><span id="${reminders[i].subject.split("-")[0]}-timeDue">Due: ${reminders[i].timeDue}</span><br>Additional Notes: ${reminders[i].reminder}</p>	
						</div>	
					`
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

	var startMonth = document.getElementById("smonth").value;
	var startDay = document.getElementById("sday").value;
	var endMonth = document.getElementById("emonth").value;
	var endDay = document.getElementById("eday").value;
	var valid;
	var x = monthToNumber(startMonth);
	var y = monthToNumber(endMonth);
	if(y-x < 0){
		valid = "false";
	}else if(y-x == 0){
		valid = "same"
	}else{
		valid = "true";
	}

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
  		sessionStorage.removeItem("startDay");
  		sessionStorage.removeItem("endDay");
  		sessionStorage.removeItem("startMonth");
  		sessionStorage.removeItem("endMonth");
		if(subjectAddition.className === "hide"){
			subjectAddition.className = "";
			startEnd.className = "hide";
		}
	}
}

function monthToNumber(month){
	var x = 0;
	switch (month) {
		case "Jan":
		case "January":
			x = 1;
			break;
		case "Feb":
		case "February":
			x = 2;
			break;
		case "Mar":
		case "March":
			x = 3;
			break;
		case "Apr":
		case "April":
			x = 4;
			break;
		case "May":
			x = 5;
			break;
		case "Jun":
		case "June":
			x = 6;
			break;
		case "Jul":
		case "July":
			x = 7;
			break;
		case "Aug":
		case "August":
			x = 8;
			break;
		case "Sep":
		case "September":
			x = 9;
			break;
		case "Oct":
		case "October":
			x = 10;
			break;
		case "Nov":
		case "November":
			x = 11;
			break;
		case "Dec":
		case "December":
			x = 12;
			break;
    	default:
			x = 0
			break;
  	}

  	return x;
}


var subjectArray = [];



function recordSubjects(){
	window.scrollTo(0,0);
	var cCode = document.getElementById("cCode").value;
	sessionStorage.setItem("cCode", cCode);
	var cno = document.getElementById("cno").value;
	sessionStorage.setItem("cno", cno);
	var cdesc = document.getElementById("cdesc").value;
	sessionStorage.setItem("cdesc", cdesc);
	var timeStart = document.getElementById("time-start").value;
	sessionStorage.setItem("timeStart", timeStart);
	var timeEnd = document.getElementById("time-end").value;
	sessionStorage.setItem("timeEnd", timeEnd);
	var room = document.getElementById("room").value;
	sessionStorage.setItem("room", room);


	if( cCode === "" || cdesc === "" || timeStart === "" || timeEnd === "" || room === ""){
		document.getElementById("may-mali").innerHTML = "Please fill up all fields";
		return;
	}

	var validTime = timeStart < timeEnd;
	if(validTime === false){
		document.getElementById("may-mali").innerHTML = "Time end is earlier than time start.";
		return undefined;
	}else if( validTime === true && (timeEnd.split(":")[0] - timeStart.split(":")[0]) > 3){
		var c = confirm("Are you sure your class lasts for" + (timeEnd.split(":")[0] - timeStart.split(":")[0]) + "hours?");
		if ( c === false){
			return;
		}
	}else if( timeStart >= "20:00" || timeStart <= "07:30" || timeEnd >= "20:00" || timeEnd <= "07:30"){
		document.getElementById("may-mali").innerHTML = "You cannot have classes from 8:00 pm - 7:30pm";
		return;
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
		"timeStart": timeStart.split(":")[0]%12 + ":" + timeStart.split(":")[1],
		"timeEnd": timeEnd.split(":")[0]%12 + ":" + timeEnd.split(":")[1],
		"days": classDays,
		"room": room
	}

	subjectArray.push(subjectObject);	
	var subJson = JSON.stringify(subjectArray);
	localStorage.setItem(`subjects`, subJson);
	sessionStorage.removeItem("cCode");
	sessionStorage.removeItem("cno");
	sessionStorage.removeItem("cdesc");
	sessionStorage.removeItem("timeStart");
	sessionStorage.removeItem("timeEnd");
	sessionStorage.removeItem("days");
	sessionStorage.removeItem("room");
	
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


/********************
	
	NOTES.HTML
	NEWNOTES.HTML

 ********************/
function saveNotes(){
	var subject = document.getElementById("subject").value;
	var noteTitle=document.getElementById("titleForm").value;
	var noteContent=document.getElementById("textForm").value;

	var noteObject = {
		"subject" : subject,
		"noteTitle" : noteTitle,
		"noteContent" : noteContent 
	}
	
	var noteArray = [];
	
	if( localStorage.getItem(`${subject.split("-")[0]}notes`) != null ){
		noteArray = JSON.parse(localStorage.getItem(`${subject.split("-")[0]}notes`));
	}

	noteArray.push(noteObject);
	var noteJSON = JSON.stringify(noteArray);
	localStorage.setItem(`${subject.split("-")[0]}notes`, noteJSON);
	alert("saved");

	window.location = "notes.html";
}


function notes(){
	var subjects = JSON.parse(localStorage.getItem("subjects"));
	var subDrop = document.getElementById("subdrop");
	var classCodes = [];

	for( i=0; i<subjects.length; i++){
	    classCodes.push(subjects[i].classCode);
	}

	for( i=0; i<classCodes.length; i++){
	    if( localStorage.getItem(`${classCodes[i]}notes`) != null ){
			var asd = JSON.parse(localStorage.getItem(`${classCodes[i]}notes`));
			subDrop.innerHTML += `<span class="subject">${asd[0].subject}</span>`
			for( ii=0; ii<asd.length; ii++){
				subDrop.innerHTML += `
					<div class="notedrop">
						<div> 
							<a href="#" style="float: left" data-toggle="${asd[ii].noteTitle}" class="title"> ${asd[ii].noteTitle} 
							</a> 
							<button onclick="del(${ii}, '${classCodes[i]}')" style="display: inline; margin-left: 10px;">
								X
							</button>
						</div>
						<div id="${asd[ii].noteTitle}" class="hide"> <p> ${asd[ii].noteContent} </p>
					</div>
				`
			}
	    }
	}

	var titles = document.getElementsByClassName("title");
	var notes = document.getElementsByClassName("hide");
	for( i=0; i<titles.length; i++){
		titles[i].addEventListener("click", showDay);
	}
}

function del(index, subject){
	var asd = JSON.parse(localStorage.getItem(`${subject}notes`));
	asd.splice(index, 1);
	var asdString = JSON.stringify(asd);
	if ( asd.length === 0){
		localStorage.removeItem(`${subject}notes`);
	}else{
		localStorage.setItem(`${subject}notes`,asdString);
	}

	window.location = "notes.html"
}

function displaySubjects(){
	var subjects = JSON.parse(localStorage.getItem("subjects"));
	var writeTo = document.getElementById("subject");
	for( i=0; i<subjects.length; i++ ) {
		writeTo.innerHTML += `<option>${subjects[i].classCode}-${subjects[i].courseDescription}</option>`;
	}
}


// NEW REMINDERS

function saveRem(){
	var subject = document.getElementById("subject").value;
	var title = document.getElementById("title").value;
	var reminder = document.getElementById("reminder").value;
	var timeDue = document.getElementById("timeDue").value;
	var convertedTime = `${timeDue.split("T")[0]} ${timeDue.split("T")[1].split(":")[0]%12}:${timeDue.split("T")[1].split(":")[1]}`;
	var reminderObject = {
		"subject" : subject,
		"title" : title,
		"reminder" : reminder,
		"timeDue" : convertedTime
	}
	
	var reminderArray = [];
	
	if( localStorage.getItem('reminders') != null ){
		reminderArray = JSON.parse(localStorage.getItem('reminders'));
	}

	reminderArray.push(reminderObject);
	var reminderString = JSON.stringify(reminderArray);
	localStorage.setItem('reminders', reminderString);
	alert("saved");
}



function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("+").className = "hide";

}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
     document.getElementById("+").className = "plus";
}

/**

	SESSION STORAGE CRAP FOR SETUP

**/

if(window.location === "setup.html"){
	if(document.getElementById("start-end").className === "questions"){
		console.log('asds');
		var startMonth = document.getElementById("month").value;
		sessionStorage.setItem("startMonth",startMonth);
		var startDay = document.getElementById("day").value;
		sessionStorage.setItem("startDay",startDay);
		var endMonth = document.getElementById("month").value;
		sessionStorage.setItem("endMonth",endMonth);
		var endDay = document.getElementById("day").value;
		sessionStorage.setItem("endDay",endDay);
	}

	if(document.getElementById("subject-addition").className === ""){
		var cCode = document.getElementById("cCode").value;
		sessionStorage.setItem("cCode", cCode);
		var cno = document.getElementById("cno").value;
		sessionStorage.setItem("cno", cno);
		var cdesc = document.getElementById("cdesc").value;
		sessionStorage.setItem("cdesc", cdesc);
		var timeStart = document.getElementById("time-start").value;
		sessionStorage.setItem("timeStart", timeStart);
		var timeEnd = document.getElementById("time-end").value;
		sessionStorage.setItem("timeEnd", timeEnd);
		var room = document.getElementById("room").value;
		sessionStorage.setItem("room", room);


		var counter = 0;
		days = document.getElementsByClassName("day");
		var classDays = [];
		for( i=0; i<days.length; i++){
			if(days[i].checked){
				classDays[counter] = days[i].value;
				counter++;
				sessionStorage.setItem("days", classDays);
			}
		}
	}
}