function newNotes(){
	window.location = "newnotes.html"
	}

function saveNotes(){
	var noteTitle,noteContent; 
	noteTitle=document.getElementById("titleForm").value;
	document.getElementById("titleOutput").innerHTML= noteTitle;


	noteContent=document.getElementById("textForm").value;
	document.getElementById("textOutput").innerHTML= noteContent;

	
	var noteObject = {
		"noteTitle" : noteTitle,
		"noteContent" : noteContent 
	}

	var noteArray = [];

	noteArray.push(noteObject); 

	var noteJSON = JSON.stringify(noteArray);
	localStorage.setItem(`notes`, noteJSON);
	alert("saved"); 



}


function notes(){
	var notes = JSON.parse(localStorage.getItem("notes"));
	var noteTitle = notes[0].noteTitle;
	document.getElementById("titleOutput").innerHTML = `<button onclick="displayNote(${noteTitle})"> ${noteTitle} </button>`;

}

