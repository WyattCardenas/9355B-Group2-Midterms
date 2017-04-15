/********************
	
	INDEX.HTML

 ********************/

function today(){
	if(localStorage.getItem("hasData") === null){
		window.location = "setup.html"
	}else{
		checkRem();
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
					if(reminders[i].reminder != ""){
						rem.innerHTML += `
							<div id=${reminders[i].subject.split("-")[0]}>
								<p>Title: ${reminders[i].title}<br><span id="${reminders[i].subject.split("-")[0]}-timeDue">Due: ${reminders[i].timeDue}</span><br>Additional Notes: ${reminders[i].reminder}</p>	
							</div>	
						`
					}else{
						rem.innerHTML += `
							<div id=${reminders[i].subject.split("-")[0]}>
								<p>Title: ${reminders[i].title}<br><span id="${reminders[i].subject.split("-")[0]}-timeDue">Due: ${reminders[i].timeDue}</span></p>	
							</div>	
						`
					}
				}else{
					var writeTo = document.getElementById(`${reminders[i].subject.split("-")[0]}`);
					if(reminders[i].reminder != ""){
						writeTo.innerHTML += `
							<p>Title: ${reminders[i].title}<br><span id="${reminders[i].subject.split("-")[0]}-timeDue">Due: ${reminders[i].timeDue}</span><br>Additional Notes: ${reminders[i].reminder}</p>	
						`
					}else{
						writeTo.innerHTML += `
							<p>Title: ${reminders[i].title}<br><span id="${reminders[i].subject.split("-")[0]}-timeDue">Due: ${reminders[i].timeDue}</span></p>	
						`
					}
				}
			}
		}
	}
}

function checkRem(){
	if(localStorage.getItem("reminders") != null){
		var reminders = JSON.parse(localStorage.getItem('reminders'));
		for(var i=0; i<reminders.length; i++){
			var timeDue = reminders[i].timeDue;
			var date = timeDue.split(" ")[0];
			var year = date.split("-")[0];
			var month = date.split("-")[1];
			var day = date.split("-")[2];
			var time = timeDue.split(" ")[1];

			var d = new Date();
			var yearNow = d.getFullYear();
			var monthNow = d.getMonth()+1;
			if( monthNow < 10 ){
				monthNow = `0${monthNow}`;
			}
			var dayNow = d.getDate();
			if( dayNow < 10 ){
				dayNow = `0${dayNow}`;
			}

			var timeNow = `${d.getHours()%12}:${d.getMinutes()}`

			if(year == yearNow && month === monthNow && day-dayNow < 0 && timeDue < timeNow){
				reminders.splice(i,1);
				var a = JSON.stringify(reminders);
				if ( reminders.length === 0){
					localStorage.removeItem("reminders");
				}else{
					localStorage.setItem("reminders",a);
				}
			}
		}
	}
}

/********************
	
	SETUP.HTML

 ********************/
function setup(){
	var semester = document.getElementById("start-end-form");
	var subject = document.getElementById("subject-form");

	var startYearSelect = semester.elements["syear"];
	startYearSelect.innerHTML += `
		<option value="${new Date().getFullYear()-1}">${new Date().getFullYear()-1}</option>
		<option value="${new Date().getFullYear()}">${new Date().getFullYear()}</option>
		<option value="${new Date().getFullYear()+1}">${new Date().getFullYear()+1}</option>
	`;

	var asd = document.getElementsByTagName("select");
	for(var i=0; i<asd.length; i++){
	    asd[i].addEventListener("input", updateEndYear);
	}

	for(var i=0; i<subject.elements.length; i++){
		if(subject.elements[i].type === "text" || subject.elements[i].type === "time"){
			subject.elements[i].addEventListener("input",update);
		}else if(subject.elements[i].type === "checkbox"){
			subject.elements[i].addEventListener("click",update);
		}
	}
	

	if(sessionStorage.length>0){
		for(var i=0; i<semester.elements.length; i++){
		    if(sessionStorage.getItem(`${semester.elements[i].name}`) != null){
		    	semester.elements[i].value = sessionStorage.getItem(`${semester.elements[i].name}`);
		    	updateEndYear();
		    }

		}
		for(var i=0; i<subject.elements.length; i++){
			if(sessionStorage.getItem(`${subject.elements[i].name}`) != null){
		    	if(subject.elements[i].type === "text" || subject.elements[i].type === "time"){
		    		subject.elements[i].value = sessionStorage.getItem(`${subject.elements[i].name}`)
		    	}else if(subject.elements[i].type === "checkbox"){
		    		subject.elements[i].checked = true;
		    	}
		    }
		}
	}
}

/**

	AN IDEA FOR AUTOSAVING

**/
function autoSave(){

	setTimeout(autosave(), 10000);
}

function update(){
	if(this.type === "text" || this.type === "time"){
		sessionStorage.setItem(`${this.name}`, this.value);
	}else if(this.type === "checkbox"){
		if(this.checked){
			sessionStorage.setItem(`${this.name}`, this.value);
		}
	}else{
		sessionStorage.setItem(`${this.id}`, this.value);
	}
}

function updateEndYear(){
	var d = new Date();
	var semester = document.getElementById("start-end-form");
	if( semester.elements["syear"].value != "" && semester.elements["smonth"].value != ""){
		var x = monthToNumber(semester.elements["smonth"].value);
		var eYearContent = document.getElementById("eyear-content");
		if(x>=1 && x<=6){
			eYearContent.setAttribute("value", semester.elements["syear"].value);
			eYearContent.innerText = `${semester.elements["syear"].value}`
		}else{
			eYearContent.setAttribute("value", parseFloat(semester.elements["syear"].value)+1);
			eYearContent.innerText = `${parseFloat(semester.elements["syear"].value)+1}`
		}
	}

	if(this.name === ""){
		return;
	}else{
		sessionStorage.setItem(`${this.name}`,this.value);	
	}
}

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
	var d = new Date();
	var startEnd = document.getElementById("start-end");
	var subjectAddition = document.getElementById("subject-addition");

	var semester = document.getElementById("start-end-form");
	var startMonth = semester.elements["smonth"].value;
	var startDay = semester.elements["sday"].value;
	var startYear = semester.elements["syear"].value;
	var endMonth = semester.elements["emonth"].value;
	var endDay = semester.elements["eday"].value;
	var endYear = semester.elements["eyear"].value;
	var x = monthToNumber(startMonth);
	var y = monthToNumber(endMonth);
	var valid = "";
	if(y-x < 0){
		if(endYear > startYear){
			valid = true;
		}else{
			valid = "false";	
		}
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
  	}else if(valid === ""){
  		return;
  	}else{
  		var start = [startDay,startMonth,startYear];
  		var end = [endDay, endMonth, endYear];
  		localStorage.setItem("start",start);
  		localStorage.setItem("end",end);
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
	sessionStorage.clear();
	
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
	var saveButton = document.getElementById("save-subjects");
	if(c === true){
   	localStorage.setItem("hasData","true");
    sessionStorage.clear();
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
	if(subject === ""){
		alert("walang subject");
	}
	var noteTitle=document.getElementById("titleForm").value;
	if(noteTitle === ""){
		alert("walang title");
	}
	var noteContent=document.getElementById("textForm").value;

	var noteObject = {
		"subject" : subject,
		"noteTitle" : noteTitle,
		"noteContent" : noteContent 
	}
	
	var noteArray = [];
	
	if( localStorage.getItem(`notes`) != null ){
		noteArray = JSON.parse(localStorage.getItem(`notes`));
	}
	noteArray.push(noteObject);
	var noteJSON = JSON.stringify(noteArray);
	localStorage.setItem(`notes`, noteJSON);
	sessionStorage.clear();
	alert("saved");

	window.location = "notes.html";
}

function newNotes(){
	displaySubjects();
	var title = document.getElementById("titleForm");
	title.addEventListener("input",up);
	var text = document.getElementById("textForm");
	text.addEventListener("input",up);
	var sub = document.getElementById("subject");
	sub.addEventListener("change",up)
	var d = new Date();
	var dayToday = ["sun","mon","tue","wed","thu","fri","sat"][d.getDay()];
	var hourNow = d.getHours();
	var minNow = d.getMinutes();
	var timeNow = `${hourNow}:${minNow}`
 	var subjects = JSON.parse(localStorage.getItem('subjects'));
	for (i=0; i<subjects.length; i++ ){
		for(ii=0; ii<subjects[i].days.length; ii++){
			if (dayToday === subject[i].days[ii]) {
				if(timeNow >= subject[i].timeStart && timeNow <= subject[i].timeEnd){
					sub.value = `${subject[i].classCode}-${subjects[i].courseDescription}`;

				}

			}
		}
	}
	
	if(sessionStorage.getItem(`${title.id}`) != null){
		title.value = sessionStorage.getItem(`${title.id}`);
	}
	if(sessionStorage.getItem(`${title.id}`) != null){
		text.value = sessionStorage.getItem(`${text.id}`);
	}
	if(sessionStorage.getItem(`${title.id}`) != null){
		sub.value = sessionStorage.getItem(`${sub.id}`);
	}
}

function up(){
	sessionStorage.setItem(`${this.id}`, this.value);
}


function notes(){
  	
  	if( localStorage.getItem('notes') != null ){
  		var subDrop = document.getElementById("subdrop");
   	 	var asd = JSON.parse(localStorage.getItem('notes'));

		for( i=0; i<asd.length; i++){
			if(document.getElementById(`${asd[i].subject.split("-")[0]}`) === null){
				subDrop.innerHTML += `<span class="subject">${asd[i].subject}</span>`;
				subDrop.innerHTML += `
					<div id="${asd[i].subject.split("-")[0]}"> 
						<div class="notedrop">
							<a href="#" style="float: left" data-toggle="${asd[i].noteTitle}" class="title"> ${asd[i].noteTitle} 
							</a> 
							
							<div id="${asd[i].noteTitle}" class="hide"> 
								<p> 
									${asd[i].noteContent} 
								</p> 
								<button onclick="del(${i}, 'notes')" style="display: inline; margin-left: 10px;">
									X
								</button>
							</div>
						</div>
					</div>
				`
			}else{
				var writeTo = document.getElementById(`${asd[i].subject.split("-")[0]}`);
				writeTo.innerHTML += `
					<div class="notedrop">
						<a href="#" style="float: left" data-toggle="${asd[i].noteTitle}" class="title"> ${asd[i].noteTitle} 
						</a> 
						<button onclick="del(${i}, 'notes')" style="display: inline; margin-left: 10px;">
							X
						</button>
						<div id="${asd[i].noteTitle}" class="hide"> <p> ${asd[i].noteContent} </p> </div>
					</div>`
			}
		}
	}else{
		var nonotes = document.getElementById("nonotes");
		nonotes.innerHTML += "You have no notes yet!";
	}

	var titles = document.getElementsByClassName("title");
	var notes = document.getElementsByClassName("hide");
	for( i=0; i<titles.length; i++){
		titles[i].addEventListener("click", showDay);
	}
}

function del(index, key){
	console.log(key)
	var asd = JSON.parse(localStorage.getItem(`${key}`));
	asd.splice(index, 1);
	var asdString = JSON.stringify(asd);
	if ( asd.length === 0){
		localStorage.removeItem(`${key}`);
	}else{
		localStorage.setItem(`${key}`,asdString);
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
	if(subject === ""){
		console.log("Walang subject");
		return;
	}
	var title = document.getElementById("title").value;
	if(title === ""){
		console.log("walang title");
		return;
	}
	var reminder = document.getElementById("reminder").value;
	var timeDue = document.getElementById("timeDue").value;
	if(timeDue === ""){
		console.log("no time");
		return;
	}
	var date = timeDue.split("T")[0];
	var year = date.split("-")[0];
	var month = date.split("-")[1];
	var day = date.split("-")[2];
	var time = timeDue.split("T")[1];
	var hour = time.split(":")[0];
	var min = time.split(":")[1];

	var d = new Date();
	var yearNow = d.getFullYear();
	var monthNow = d.getMonth()+1;
	if( monthNow < 10 ){
		monthNow = `0${monthNow}`;
	}
	var dayNow = d.getDate();
	if( dayNow < 10 ){
		dayNow = `0${dayNow}`;
	}

	var hourNow = d.getHours();
	var minNow = d.getMinutes();
	var timeNow = `${hourNow}:${minNow}`

	if( year < yearNow){
		console.log("INTENSE REMINDER THING");
		return;
	}else if( year == yearNow && month < monthNow){
		console.log("NOT THAT INTENSE");
		return;
	}else if( year == yearNow && month === monthNow && day-dayNow < 0){
		console.log("Asdasd");
		return;
	}else if( year == yearNow && month === monthNow && day-dayNow === 0 && time < timeNow){
		console.log("asdafgaag");
		return;
	}else if( year == yearNow && month === monthNow && day-dayNow === 0 && time === timeNow){
		console.log("aljlfasdf");
		return;
	}else if( year == yearNow && month === monthNow && day-dayNow === 0 && hour == hourNow && min < minNow){
		console.log("algbljabsjflabjlfabljf");
		return;
	}else if( year == yearNow && month === monthNow && day-dayNow === 0 && hour == hourNow && min < 60){
		console.log("algbljabsjflabjlfabljf");
		return;
	}
	

	var convertedTime = `${timeDue.split("T")[0]} ${timeDue.split("T")[1].split(":")[0]%12}:${timeDue.split("T")[1].split(":")[1]}`;

	var reminderArray = [];
	if( localStorage.getItem('reminders') != null ){
		console.log("may reminders")
		reminderArray = JSON.parse(localStorage.getItem('reminders'));
		for(var i=0; i<reminderArray.length;i++){
			if(reminderArray[i].title === title && reminderArray[i].subject === subject && reminderArray[i].timeDue === convertedTime){
				console.log("Reminder already exists");
				return;
			}
		}
	}

	var reminderObject = {
		"subject" : subject,
		"title" : title,
		"reminder" : reminder,
		"timeDue" : convertedTime
	}

	reminderArray.push(reminderObject);
	var reminderString = JSON.stringify(reminderArray);
	localStorage.setItem('reminders', reminderString);
	alert("saved");
	window.location = "index.html"
}


function openNav(){
	document.getElementById("plusnav-content").style.display = "block";
	document.getElementById("plusbutton").attributes.onclick = "closeNav()";
}

function closeNav(){
	document.getElementById("plusnav-content").style.display = "none";
	document.getElementById("plusbutton").attributes.onclick = "openNav()";
}

/* newSubjects */

function newSubject(){
	var subject = document.getElementById("subject-form");
	for(var i=0; i<subject.elements.length; i++){
		if(subject.elements[i].type === "text" || subject.elements[i].type === "time"){
			subject.elements[i].addEventListener("input",update);
		}else if(subject.elements[i].type === "checkbox"){
			subject.elements[i].addEventListener("click",update);
		}
	}

	for(var i=0; i<subject.elements.length; i++){
		if(sessionStorage.getItem(`${subject.elements[i].name}`) != null){
	    	if(subject.elements[i].type === "text" || subject.elements[i].type === "time"){
	    		subject.elements[i].value = sessionStorage.getItem(`${subject.elements[i].name}`)
	    	}else if(subject.elements[i].type === "checkbox"){
	    		subject.elements[i].checked = true;
	    	}
	    }
	}
	
}