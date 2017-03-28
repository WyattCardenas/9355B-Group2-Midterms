//INDEX.HTML

var d = new Date();
var dayString = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d.getDay()];
var date = d.toString().split(' ').splice(1,3).join(' ');
document.getElementById("day").innerHTML = dayString;
document.getElementById("date").innerHTML = date;