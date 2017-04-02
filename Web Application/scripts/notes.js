function newNotes(){
	window.location = "newnotes.html"
	}

function saveNotes(){
	var titleForm, noteTitle, textForm, noteArea; 
	titleForm=document.getElementById("titleForm");
	noteTitle=titleForm.elements["noteTitle"].value;
	document.getElementById("titleOutput").innerHTML= noteTitle;

	textForm=document.getElementById("textForm");
	noteArea=textForm.elements["noteArea"].value;
	document.getElementById("textOutput").innerHTML= noteArea;


}