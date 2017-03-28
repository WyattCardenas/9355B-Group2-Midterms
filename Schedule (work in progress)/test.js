var numOne = document.getElementById("num-one");
var numTwo = document.getElementById("num-two");
var addSum = document.getElementById("add-sum");

numOne.addEventListener("input", add);
numTwo.addEventListener("input", add);

function add() {
  var one = parseFloat(numOne.value) || 0;
  var two = parseFloat(numTwo.value) || 0;
  
  addSum.innerHTML = "your sum is: " + (one+two);
}


var result = document.getElementById("result");
var results = document.getElementById("results");
var save = document.getElementById("save");
var localTest = document.getElementById("localTest");
save.addEventListener("click",saveA);

function saveA(){
	var name = document.getElementById("name").value;
	var age = document.getElementById("age").value;
	var choice = document.createElement("option");
	var choiceText = document.createTextNode(name+","+age);
	var person = {};
	person.name = name;
	person.age = age;
	localStorage.setItem("person",person);
	choice.appendChild(choiceText);
	result.innerHTML = "Your name is: " + name + " and you are " + age;
	results.appendChild(choice);
	for(var x = 0; x<person.length; x++){
		var string = person.name + "," + person.age;
		localTest.innerHTML = " " + string;
	}
}