function saveNotes(){
	var subject = document.getElementById("subject").value;
	var noteTitle=document.getElementById("titleForm").value;
	document.getElementById("titleOutput").innerHTML= noteTitle;
	var noteContent=document.getElementById("textForm").value;
	document.getElementById("textOutput").innerHTML= noteContent;

	var noteObject = {
		"subject" : subject,
		"noteTitle" : noteTitle,
		"noteContent" : noteContent 
	}
	
	var noteArray = [];
	
	if( localStorage.getItem(`${subject.split("-")[0]}`) === null ){
		noteArray.push(noteObject); 
		var noteJSON = JSON.stringify(noteArray);	
		localStorage.setItem(`${subject.split("-")[0]}`, noteJSON);
		alert("saved");
	}else{
		noteArray = JSON.parse(localStorage.getItem(`${subject.split("-")[0]}`));
		noteArray.push(noteObject);
		var noteJSON = JSON.stringify(noteArray);
		localStorage.setItem(`${subject.split("-")[0]}`, noteJSON);
		alert("saved"); 
	}
	window.location = "notes.html";
}


function notes(){
	var subjects = JSON.parse(localStorage.getItem("subjects"));
	var subDrop = document.getElementById("subdrop");
	var classCodes = []

	for( i=0; i<subjects.length; i++){
	    classCodes.push(subjects[i].classCode);
	}

	for( i=0; i<classCodes.length; i++){
	    if( localStorage.getItem(`${classCodes[i]}`) != null ){
			asd = JSON.parse(localStorage.getItem(`${classCodes[i]}`));
			subDrop.innerHTML += `<span class="subject">${asd[0].subject}</span>`
			for( ii=0; ii<asd.length; ii++){
				subDrop.innerHTML += `
					<div class="notedrop">
						<div data-toggle="${asd[ii].noteTitle}" class="title"> <a href="#"> ${asd[ii].noteTitle} </a></div>
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

function displaySubjects(){
	var subjects = JSON.parse(localStorage.getItem("subjects"));
	var writeTo = document.getElementById("subject");
	for( i=0; i<subjects.length; i++ ) {
		writeTo.innerHTML += `<option>${subjects[i].classCode}-${subjects[i].courseDescription}</option>`;
	}
}