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
		var monthString = ["January","February","March","April","May","June","July","August","September","October","November","December"][d.getMonth()];
		var yearNow = d.getFullYear();
		var dateNow = d.getDate();
		var fullDate = d.toString().split(' ').splice(1,3).join(' ');

		document.getElementById("day").innerHTML = dayString;
		document.getElementById("date").innerHTML = fullDate;

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

		var alert = document.getElementById("alert");
		var alertMessage = document.getElementById("message");
		var end = JSON.parse(localStorage.getItem("end"));
		if( monthString === end.month && dateNow == end.day && yearNow == end.year){
			alert.className = "confirm";
			document.getElementById("cancel").addEventListener("click", function(){
				alert.className = "hide";
			});
			alertMessage.innerText = "Tapos na semester lmao";
		}

		var titles = document.getElementsByClassName("title");
		for( i=0; i<titles.length; i++){
			titles[i].addEventListener("click", show);
		}

		var reminders = JSON.parse(localStorage.getItem("reminders"));
		for(var i=0; i<reminders.length; i++){
			var timeDue = reminders[i].timeDue;
			var date = timeDue.split(" ")[0];
			var time = timeDue.split(" ")[1];
			var year = date.split("-")[0];
			var month = date.split("-")[1];
			var day = date.split("-")[2];
			var monthNowNumber;
			if(monthToNumber(monthString) < 10){
				monthNowNumber = `0${monthToNumber(monthString)}`;
			}else{
				monthNowNumber = monthToNumber(monthString);
			}
			if(year == yearNow && month == monthNowNumber && day-dateNow <= 3){
				if(reminders[i].subject != undefined){
					if(document.getElementById(`${reminders[i].subject.split("-")[0]}`) === null){
						rem.innerHTML += `<span class="reminderTitle">${reminders[i].subject}</span>`
						if(reminders[i].additionalNotes != undefined){
							rem.innerHTML += `
								<div id=${reminders[i].subject.split("-")[0]}>
									<p>Title: ${reminders[i].title}<br><span id="${reminders[i].subject.split("-")[0]}-timeDue">Due: ${reminders[i].timeDue}</span><br>Additional Notes: ${reminders[i].additionalNotes}</p>
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
						if(reminders[i].additionalNotes != undefined){
							writeTo.innerHTML += `
								<p>Title: ${reminders[i].title}<br><span id="${reminders[i].subject.split("-")[0]}-timeDue">Due: ${reminders[i].timeDue}</span><br>Additional Notes: ${reminders[i].additionalNotes}</p>	
							`
						}else{
							writeTo.innerHTML += `
								<p>Title: ${reminders[i].title}<br><span id="${reminders[i].subject.split("-")[0]}-timeDue">Due: ${reminders[i].timeDue}</span></p>	
							`
						}
					}
				}else{
					if(document.getElementById("non-subject-reminders") === null){
						rem.innerHTML += "<span class=reminderTitle>Non Subject Reminders</span>"
						if(reminders[i].additionalNotes != undefined){
							rem.innerHTML +=`
								<div id="non-subject-reminders">
									<p>Title: ${reminders[i].title}<br>Due: ${reminders[i].timeDue}<br>Additional Notes: ${reminders[i].additionalNotes}</p>
								</div>
							`
						}else{
							rem.innerHTML +=`
								<div id="non-subject-reminders">
									<p>Title: ${reminders[i].title}<br>Due: ${reminders[i].timeDue}</p>
								</div>
							`
						}
					}else{
						var writeTo = document.getElementById("non-subject-reminders");
						if(reminders[i].additionalNotes != undefined){
							writeTo.innerHTML +=`
								<p>Title: ${reminders[i].title}<br>Due: ${reminders[i].timeDue}<br>Additional Notes: ${reminders[i].additionalNotes}</p>
							`
						}else{
							writeTo.innerHTML +=`
								<p>Title: ${reminders[i].title}<br>Due: ${reminders[i].timeDue}</p>
							`
						}
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
	}else if(y-x > 6){
		valid = "moreThan6"
	}else{
		valid = "true";
	}

	if(startMonth == "" || endMonth == ""){
		document.getElementById("warning").innerHTML = "Please pick a month."; 
		return;
  	}else if(startDay == "" || endDay == ""){
		document.getElementById("warning").innerHTML = "Please pick a day.";
		return;
  	}else if(startMonth == endMonth && startDay == endDay){
		document.getElementById("warning").innerHTML = "The semester cannot start and end at the same day.";
		return;
  	}else if(valid === "false"){
		document.getElementById("warning").innerHTML = "The semester hasn't started yet and it has already ended?";
		return;
  	}else if(valid === "same"){
  		if(endDay-startDay == 1){
  			document.getElementById("warning").innerHTML = "The semester only has " + (endDay - startDay) +" day?";
  			return;
  		}else{
			document.getElementById("warning").innerHTML = "The semester only has " + (endDay - startDay) +" days?";
			return;
  		}
  	}else if(valid === "moreThan6"){
  		document.getElementById("warning").innerHTML = "Semester means 6, you dumb mother fucker.";
  		return;
  	}else if(valid === ""){
  		return;
  	}else{
  		var start = {
  			'day':startDay,
  			'month':startMonth,
  			'year':startYear
  		};
  		var end = {
  			'day':endDay,
  			'month':endMonth,
  			'year':endYear
  		};
  		localStorage.setItem("start", JSON.stringify(start));
  		localStorage.setItem("end", JSON.stringify(end));
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
		return;
	}else if(validTime === true && (timeEnd.split(":")[0] - timeStart.split(":")[0]) > 10){
		document.getElementById("may-mali").innerHTML = "classes are limited to 10 hours max";
		return;
	}else if(validTime === true && (timeEnd.split(":")[0] - timeStart.split(":")[0]) > 3){
		var c = confirm("Are you sure your class lasts for" + (timeEnd.split(":")[0] - timeStart.split(":")[0]) + "hours?");
		if ( c === false){
			return;
		}
	}else if( timeStart < "07:30" || timeEnd <= "07:30"){
		document.getElementById("may-mali").innerHTML = "You cannot have classes from 12:00 am - 7:30 am";
		return;
	}else if( validTime === true && (timeEnd.split(":")[0]==timeStart.split(":")[0])  && (timeEnd.split(":")[1] - timeStart.split(":")[1]) != 0 ){
		if((timeEnd.split(":")[1] - timeStart.split(":")[1]) == 1){
			document.getElementById("may-mali").innerHTML = "Your class cant last for only " + (timeEnd.split(":")[1] - timeStart.split(":")[1]) + " min";	
		}else{
			document.getElementById("may-mali").innerHTML = "Your class cant last for only " + (timeEnd.split(":")[1] - timeStart.split(":")[1]) + " mins";	
		}
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
	    	if(timeStart.split(":")[0]%12 == 0){
	    		textNode = document.createTextNode(`${cCode}, ${cdesc}, 12:${timeStart.split(":")[1]} - ${timeEnd.split(":")[0]%12}:${timeEnd.split(":")[1]}`);  	
	    	}else if(timeEnd.split(":")[0]%12 == 0){
	    		textNode = document.createTextNode(`${cCode}, ${cdesc}, ${timeStart.split(":")[0]%12}:${timeStart.split(":")[1]} - 12:${timeEnd.split(":")[1]}`);  
	    	}else{
	    		textNode = document.createTextNode(`${cCode}, ${cdesc}, ${timeStart.split(":")[0]%12}:${timeStart.split(":")[1]} - ${timeEnd.split(":")[0]%12}:${timeEnd.split(":")[1]}`);  
	    	}
	    }else{
	    	if(timeStart.split(":")[0]%12 == 0){
				textNode = document.createTextNode(`${cCode}, ${cno}, ${cdesc}, 12:${timeStart.split(":")[1]} - ${timeEnd.split(":")[0]%12}:${timeEnd.split(":")[1]}`);  
	    	}else if(timeEnd.split(":")[0]%12 == 0){
	    		textNode = document.createTextNode(`${cCode}, ${cno}, ${cdesc}, ${timeStart.split(":")[0]%12}:${timeStart.split(":")[1]} - 12:${timeEnd.split(":")[1]}`);  
	    	}else{
	    		textNode = document.createTextNode(`${cCode}, ${cdesc}, ${timeStart.split(":")[0]%12}:${timeStart.split(":")[1]} - ${timeEnd.split(":")[0]%12}:${timeEnd.split(":")[1]}`);  
	    	}
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
		days[i].addEventListener("click",show);
	}
	generateSchedule();
}

function show() {
	var toggle = this.attributes["data-toggle"].value;
	var thing = document.getElementById(toggle);
	if(thing.className === "hide"){
		thing.className = ""
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
	if(noteTitle === ""){
		alert("walang title");
		return;
	}
	var noteContent=document.getElementById("textForm").value;

	if(subject != ""){
		var noteObject = {
			"subject" : subject,
			"noteTitle" : noteTitle,
			"noteContent" : noteContent 
		}
	}else{
		var noteObject = {
			"noteTitle" : noteTitle,
			"noteContent" : noteContent 
		}
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
			if (dayToday === subjects[i].days[ii]) {
				if(timeNow >= subjects[i].timeStart && timeNow <= subjects[i].timeEnd){
					sub.value = `${subjects[i].classCode}-${subjects[i].courseDescription}`;
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
	var subDrop = document.getElementById("subdrop");
  	if( localStorage.getItem('notes') != null ){
   	 	var asd = JSON.parse(localStorage.getItem('notes'));
		for( i=0; i<asd.length; i++){
			console.log(asd[i].subject)
			if(asd[i].subject === undefined){
				console.log("lanfglanfg");
				if(document.getElementById("non-subject-notes") === null){
					subDrop.innerHTML += "<span class=reminderTitle>Non Subject Reminders</span>"
					subDrop.innerHTML +=`
						<div id="non-subject-notes"> 
							<div class="notedrop">
								<a href="#" data-toggle="${asd[i].noteTitle}" class="title"> ${asd[i].noteTitle} 
								</a> 
								<div id="${asd[i].noteTitle}" class="hide"> 
									<p> 
										${asd[i].noteContent} 
									</p>
									<button onclick="editNotes(this, ${i}, 'notes')" style="display: inline; margin-left: 10px;">
										Edit
									</button>
									<button onclick="confirm('del(${i})')" style="display: inline; margin-left: 10px;">
										Delete
									</button>
								</div>
							</div>
						</div>
					`
				}else{
					var writeTo = document.getElementById("non-subject-notes");
					writeTo.innerHTML +=`
						<div class="notedrop">
							<a href="#" data-toggle="${asd[i].noteTitle}" class="title"> ${asd[i].noteTitle} 
							</a> 
							<div id="${asd[i].noteTitle}" class="hide"> 
								<p> 
									${asd[i].noteContent} 
								</p>
								<button onclick="editNotes(this, ${i}, 'notes')" style="display: inline; margin-left: 10px;">
									Edit
								</button>
								<button onclick="confirm('del(${i})')" style="display: inline; margin-left: 10px;">
									Delete
								</button>
							</div>
						</div>
					`
				}

			}else{
				console.log("Asd");
				if(document.getElementById(`${asd[i].subject.split("-")[0]}`) === null){
					subDrop.innerHTML += `<span class="subject">${asd[i].subject}</span>`;
					subDrop.innerHTML += `
						<div id="${asd[i].subject.split("-")[0]}"> 
							<div class="notedrop">
								<a href="#" data-toggle="${asd[i].noteTitle}" class="title"> ${asd[i].noteTitle} 
								</a> 
								
								<div id="${asd[i].noteTitle}" class="hide"> 
									<p> 
										${asd[i].noteContent} 
									</p>
									<button onclick="editNotes(this, ${i}, 'notes')" style="display: inline; margin-left: 10px;">
										Edit
									</button>
									<button onclick="confirm('del(${i})')" style="display: inline; margin-left: 10px;">
										Delete
									</button>
								</div>
							</div>
						</div>
					`
				}else{
					var writeTo = document.getElementById(`${asd[i].subject.split("-")[0]}`);
					writeTo.innerHTML += `
						<div class="notedrop">
							<a href="#" data-toggle="${asd[i].noteTitle}" class="title"> ${asd[i].noteTitle} 
							</a> 
							
							<div id="${asd[i].noteTitle}" class="hide">
								<p> ${asd[i].noteContent} </p>
								<button onclick="editNotes(this, ${i}, 'notes')" style="display: inline; margin-left: 10px;">
									Edit
								</button>
								<button onclick="confirm('del(${i})')" style="display: inline; margin-left: 10px;">
									X
								</button>
							</div>
						</div>`
				}
			}
		}
	}else{
		subDrop.innerHTML += "You have no notes yet!";
	}

	var titles = document.getElementsByClassName("title");
	var notes = document.getElementsByClassName("hide");
	for( i=0; i<titles.length; i++){
		titles[i].addEventListener("click", show);
	}

	var rem = document.getElementById("rems");
	if(localStorage.getItem("reminders") != null){
		var reminders = JSON.parse(localStorage.getItem('reminders'));
		
		for(var i=0;i<reminders.length; i++){
			if(reminders[i].subject != undefined){
				if(document.getElementById(`${reminders[i].subject.split("-")[0]}`) === null){
					rem.innerHTML += `<span class="reminderTitle">${reminders[i].subject}</span>`
					if(reminders[i].additionalNotes != undefined){
						rem.innerHTML += `
							<div id=${reminders[i].subject.split("-")[0]}>
								<p>Title: ${reminders[i].title}<br><span id="${reminders[i].subject.split("-")[0]}-timeDue">Due: ${reminders[i].timeDue}</span><br>Additional Notes: ${reminders[i].additionalNotes}</p>
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
					if(reminders[i].additionalNotes != undefined){
						writeTo.innerHTML += `
							<p>Title: ${reminders[i].title}<br><span id="${reminders[i].subject.split("-")[0]}-timeDue">Due: ${reminders[i].timeDue}</span><br>Additional Notes: ${reminders[i].additionalNotes}</p>	
						`
					}else{
						writeTo.innerHTML += `
							<p>Title: ${reminders[i].title}<br><span id="${reminders[i].subject.split("-")[0]}-timeDue">Due: ${reminders[i].timeDue}</span></p>	
						`
					}
				}
			}else{
				if(document.getElementById("non-subject-reminders") === null){
					rem.innerHTML += "<span class=reminderTitle>Non Subject Reminders</span>"
					if(reminders[i].additionalNotes != undefined){
						rem.innerHTML +=`
							<div id="non-subject-reminders">
								<p>Title: ${reminders[i].title}<br>Due: ${reminders[i].timeDue}<br>Additional Notes: ${reminders[i].additionalNotes}</p>
							</div>
						`
					}else{
						rem.innerHTML +=`
							<div id="non-subject-reminders">
								<p>Title: ${reminders[i].title}<br>Due: ${reminders[i].timeDue}</p>
							</div>
						`
					}
				}else{
					var writeTo = document.getElementById("non-subject-reminders");
					if(reminders[i].additionalNotes != undefined){
						writeTo.innerHTML +=`
							<p>Title: ${reminders[i].title}<br>Due: ${reminders[i].timeDue}<br>Additional Notes: ${reminders[i].additionalNotes}</p>
						`
					}else{
						writeTo.innerHTML +=`
							<p>Title: ${reminders[i].title}<br>Due: ${reminders[i].timeDue}</p>
						`
					}
				}
			}
		}
	}else{
		rem.innerHTML = "<p> No reminders! </p>"
	}
}

function editNotes(el, index, key){
	var asd = JSON.parse(localStorage.getItem(`${key}`));
	var currentNotes = el.previousElementSibling.innerText;
	el.previousElementSibling.outerHTML = `<textarea rows="5" cols="40">${currentNotes}</textarea>`
	el.setAttribute("onclick", `saveEditedNotes(this, ${index},'${key}')`)
	el.innerText = "Save";
	el.parentNode.innerHTML += `
			<button onclick="cancelEdit()">Cancel</button>
	`
}

function cancelEdit(){
	window.location = "notes.html";
}

function saveEditedNotes(el, index, key){
	var asd = JSON.parse(localStorage.getItem(`${key}`));
	var currentNotes = asd[index].noteContent;
	var newNotes = el.previousElementSibling.value;
	asd[index].noteContent = newNotes;
	localStorage.setItem(`${key}`, JSON.stringify(asd));
	window.location = "notes.html"
}

function confirm(f){
	document.getElementById("alert").className = "confirm";
	document.getElementById("ok").setAttribute("onclick", `${f}`);
	document.getElementById("message").innerText = "Are you sure you want to delete?"
	document.getElementById("cancel").addEventListener("click",function(){
		document.getElementById("alert").className = "hide";
		return;
	});
	
}

function del(index, key){
	var asd = JSON.parse(localStorage.getItem("notes"));
	asd.splice(parseFloat(index), 1);
	var asdString = JSON.stringify(asd);
	if ( asd.length === 0){
		localStorage.removeItem("notes");
	}else{
		localStorage.setItem("notes",asdString);
	}

	window.location = "notes.html";
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
	var alert = document.getElementById("alert");
	var alertMessage = document.getElementById("message");

	var subject = document.getElementById("subject").value;
	var title = document.getElementById("title").value;
	var timeDue = document.getElementById("timeDue").value;
	var additionalNotes = document.getElementById("additionalNotes").value;
	var remindTimeSelect = document.getElementsByClassName("everyTime");
	var remindTimes = [];

	if(title === ""){
		alert.className = "alert"
		alertMessage.innerText = "walang title";
		var alertOk = document.getElementById("ok").addEventListener("click", function(){
			alert.className = "hide";
		});
		return;
	}

	if(timeDue === ""){
		alert.className = "alert"
		alertMessage.innerText = "no time";
		var alertOk = document.getElementById("ok").addEventListener("click", function(){
			alert.className = "hide";
		});
		return;
	}

	for(var i=0; i<remindTimeSelect.length; i++){
		remindTimes.push(remindTimeSelect[i].value);
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
		alert.className = "alert"
		alertMessage.innerText = "Year < year right now";
		var alertOk = document.getElementById("ok").addEventListener("click", function(){
			alert.className = "hide";
		});
		return;
	}else if( year == yearNow && month < monthNow){
		alert.className = "alert"
		alertMessage.innerText = "month < monthNow";
		var alertOk = document.getElementById("ok").addEventListener("click", function(){
			alert.className = "hide";
		});
		return;
	}else if( year == yearNow && month === monthNow && day<dayNow){
		alert.className = "alert"
		alertMessage.innerText = "day < dayNow";
		var alertOk = document.getElementById("ok").addEventListener("click", function(){
			alert.className = "hide";
		});
		return;
	}else if( year == yearNow && month === monthNow && day === dayNow && time < timeNow){
		alert.className = "alert"
		alertMessage.innerText = "time < timeNow";
		var alertOk = document.getElementById("ok").addEventListener("click", function(){
			alert.className = "hide";
		});
		return;
	}else if( year == yearNow && month === monthNow && day === dayNow && time === timeNow){
		alert.className = "alert"
		alertMessage.innerText = "time == timeNow";
		var alertOk = document.getElementById("ok").addEventListener("click", function(){
			alert.className = "hide";
		});
		return;
	}else if( year == yearNow && month === monthNow && day === dayNow && hour == hourNow && min < minNow){
		alert.className = "alert"
		alertMessage.innerText = "time < timeNow";
		var alertOk = document.getElementById("ok").addEventListener("click", function(){
			alert.className = "hide";
		});
		return;
	}else if( year == yearNow && month === monthNow && day === dayNow && hour == hourNow && minNow < min && min < 60){
		alert.className = "alert"
		alertMessage.innerText = "due date is so near why would you need a reminder :v";
		var alertOk = document.getElementById("ok").addEventListener("click", function(){
			alert.className = "hide";
		});
		return;
	}
	

	var convertedTime = `${timeDue.split("T")[0]} ${timeDue.split("T")[1].split(":")[0]%12}:${timeDue.split("T")[1].split(":")[1]}`;

	var reminderArray = [];
	if( localStorage.getItem('reminders') != null ){
		reminderArray = JSON.parse(localStorage.getItem('reminders'));
		for(var i=0; i<reminderArray.length;i++){
			if(subject === ""){
				if(reminderArray[i].title === title && reminderArray[i].timeDue === convertedTime){
					console.log("Reminder already exists");
					return;
				}
			}else{
				if(reminderArray[i].title === title && reminderArray[i].subject === subject && reminderArray[i].timeDue === convertedTime){
					console.log("Reminder already exists");
					return;
				}
			}
		}
	}

	var reminderObject;
	if(remindTimes.length == 0 && remindTimes[0] === ""){
		if(subject != "" && additionalNotes != ""){
			reminderObject = {
				"subject" : subject,
				"title" : title,
				"additionalNotes" : additionalNotes,
				"timeDue" : convertedTime
			}
		}else if(subject != "" && additionalNotes === ""){
			reminderObject = {
				"subject" : subject,
				"title" : title,
				"timeDue" : convertedTime
			}
		}else if(subject === "" && additionalNotes != ""){
			reminderObject = {
				"title" : title,
				"additionalNotes" : additionalNotes,
				"timeDue" : convertedTime
			}
		}else{
			reminderObject = {
				"additionalNotes" : additionalNotes,
				"timeDue" : convertedTime
			}
		}
	}else{
		if(subject != "" && additionalNotes != ""){
			reminderObject = {
				"subject" : subject,
				"title" : title,
				"additionalNotes" : additionalNotes,
				"timeDue" : convertedTime,
				"alarms" : remindTimes
			}
		}else if(subject != "" && additionalNotes === ""){
			reminderObject = {
				"subject" : subject,
				"title" : title,
				"timeDue" : convertedTime,
				"alarms" : remindTimes
			}
		}else if(subject === "" && additionalNotes != ""){
			reminderObject = {
				"title" : title,
				"additionalNotes" : additionalNotes,
				"timeDue" : convertedTime,
				"alarms" : remindTimes
			}
		}else{
			reminderObject = {
				"title" : title,
				"timeDue" : convertedTime,
				"alarms" : remindTimes
			}
		}
	}
	

	reminderArray.push(reminderObject);
	var reminderString = JSON.stringify(reminderArray);
	localStorage.setItem('reminders', reminderString);
	alert.className = "alert"
	alertMessage.innerText = "Saved!";
	var alertOk = document.getElementById("ok").addEventListener("click", function(){
		alarmCounter = 0;
		alert.className = "hide";
		window.location = "index.html"
	});
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

function toggleNav(){
	if( document.getElementById(this.attributes["data-toggle"].value).className === "hide"){
		document.getElementById(this.attributes["data-toggle"].value).className = "plusnav-content";
	}else{
		document.getElementById(this.attributes["data-toggle"].value).className = "hide";
	}
}

var alarmCounter=0;
function addAlarm(el){
	alarmCounter++;
	var writeTo = document.getElementById("remind");
	var value = el.value;
	writeTo.innerHTML += `
		<div>
			<select name="time" class="everyTime">
				<option value="ontime">On time</option>
				<option value="10">10 mins before</option>
				<option value="30">30 mins before</option>
				<option value="1h">1 hour before</option>
				<option value="3h">3 hours before</option>
				<option value="6h">6 hours before</option>
				<option value="1d">1 day before</option>
			</select>
			<button id="del${parseFloat(el.id)+1}" onclick="delAlarm(this)">-</button>
		</div>
	`
	
	if(alarmCounter == 5){
		document.getElementById(el.id).outerHTML = "";
	}
}

function delAlarm(el){
	alarmCounter--;
	var asd = el.parentNode;
	asd.outerHTML = "";
	if(alarmCounter < 5){
		document.getElementById("a").innerHTML = `<button id="1" class="addAlarm" onclick="addAlarm(this)">+</button>`;
	}
}


if(document.getElementById("plusnavbutton") != null){
	document.getElementById("plusnavbutton").addEventListener("click", toggleNav);
	document.getElementsByClassName("main-container")[0].addEventListener("click", function(){
		if(document.getElementById('plusnav-content').className === "plusnav-content"){
			document.getElementById('plusnav-content').className = "hide"
		}
	});	
}