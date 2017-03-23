$(window).load(function(){
	$("[data-toggle]").click(function() {
		var toggle_el = $(this).data("toggle");
		$(toggle_el).toggleClass("open-sidebar");
	});
	$(".swipe-area").swipe({
		swipeStatus:function(event, phase, direction, distance, duration, fingers){
			if (phase=="move" && direction =="right") {
				$(".container").addClass("open-sidebar");
				return false;
			}
			if (phase=="move" && direction =="left") {
				$(".container").removeClass("open-sidebar");
				return false;
			}
		}
	}); 
});

function generateMCQuiz() {
    document.getElementById("multipleChoiceForm").innerHTML += "<input value='MultipleChoice: '></input>";
}

function generateIQuiz() {
    document.getElementById("identificationForm").innerHTML += "<input value='Identification: '></input>";
}

function generateMTQuiz() {
    document.getElementById("matchingTypeForm").innerHTML += "<input value='MatchingType: '></input>";
}

function generateFIBQuiz() {
    document.getElementById("fillInTheBlanksForm").innerHTML += "<input value='FillInTheBlanks: '></input>";
}

function saveQuiz() {
    document.getElementById("reviewer").submit();
}

function success(){
	document.getElementById("reminders").submit();
}