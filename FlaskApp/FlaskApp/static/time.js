var time = document.getElementById('time')
var weekday = document.getElementById('day')
var thedate = document.getElementById('date')
var weekDate = document.getElementById('weekDate')
var head = document.createElement('h1')
var head3 = document.createElement('h3')
var h3 = document.createElement('h3')

function checkTime(m) {
	if (m < 10)
		m = "0" + m	// add zero in front of minutes < 10
	return m
}

function twelvehour(h) {
	if (h>12){
		var f = h-12
		return f;
		//console.log("h>12")
	}
	if (h==0){
		return 12
		//console.log("h==12")
	}
	else
		return h
}
//return post or ante depending on time of day
function get_ampm(h){
	if (h<12)
		return "AM"
	if (h>=12)
	   return "PM"
}

function checkDay(dd) {
  if(dd<10) {
      dd = '0'+dd
  }
  return dd
}

function checkMonth(mm){
  if(mm<10) {
      mm = '0'+mm
  }
  return mm
}

function getWeekDay(day){
  if(day == 0){
    day = "Sunday"
  } else if (day==1) {
    day = "Monday"
  } else if (day==2) {
    day = "Tuesday"
  } else if (day==3) {
    day = "Wednesday"
  } else if (day==4) {
    day = "Thursday"
  } else if (day==5) {
    day = "Friday"
  } else if (day==6) {
    day = "Saturday"
  }
  return day
}

function start() {
	var today = new Date()
	var h = today.getHours()
	var m = today.getMinutes()
	var ampm = get_ampm(h)
  var day = today.getDay()

  //get date
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

	//clean sources
	m = checkTime(m)	//add leading 0 for minutes < 10
	h = twelvehour(h)	//changes to 12hr format
  dd = checkDay(dd) //add leading 0 for days < 10
  mm = checkMonth(mm) //add leading 0 for months < 10
  day = getWeekDay(day) //changes integer to day of week

  //create date
  var today = mm + '/' + dd + '/' + yyyy;

	//assign data to new elements
  head3.innerHTML = day
  head.innerHTML = h + ":" + m + " " + ampm
  h3.innerHTML = today

	//Since we aren't printing seconds, we can wait longer to call the function again
  var t = setTimeout(start, 2*1000) //every 2 seconds

  weekday.append(head3)
  time.append(head)
	thedate.append(h3)
}
