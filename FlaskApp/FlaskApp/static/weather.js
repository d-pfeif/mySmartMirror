var dailyWeather = document.getElementById('dailyWeather')
var forecast = document.getElementById('forecast')
var dailyTemp = document.getElementById('dailyTemp')
var h1 = document.createElement('h1')
var h3 = document.createElement('h3')

var today = new Date()
var weekdays = today.getDay()

function getForecastDay(day){
  if (day > 6) {
    day = day - 7
  }
  if(day == 0){
    day = "Sun"
  } else if (day==1) {
    day = "Mon"
  } else if (day==2) {
    day = "Tue"
  } else if (day==3) {
    day = "Wed"
  } else if (day==4) {
    day = "Thu"
  } else if (day==5) {
    day = "Fri"
  } else if (day==6) {
    day = "Sat"
  }
  return day
}

function determineIcon(n) {
  if (n == 'clear-day') {
    n = Skycons.CLEAR_DAY
  } else if (n == 'clear-night') {
    n = Skycons.CLEAR_NIGHT
  } else if (n == 'partly-cloudy-day') {
    n = Skycons.PARTLY_CLOUDY_DAY
  } else if (n == 'partly-cloudy-night') {
    n = Skycons.PARTLY_CLOUDY_NIGHT
  } else if (n == 'cloudy') {
    n = Skycons.CLOUDY
  } else if (n == 'rain') {
    n = Skycons.RAIN
  } else if (n == 'sleet') {
    n = Skycons.SLEET
  } else if (n == 'snow') {
    n = Skycons.SNOW
  } else if (n == 'wind') {
    n = Skycons.WIND
  } else if (n == 'fog') {
    n = Skycons.FOG
  }
  return n
}

function getWeather(){
  
  forecast.innerHTML = ""
  fetch('https://galvanize-cors.herokuapp.com/https://api.darksky.net/forecast/bde5a9d0bfab5a7865bebf064f6d7366/39.7392,-104.9903').then(function(response) {
    return response.json().then(function(wData) {
      //console.log(wData);
      h1.innerHTML = Math.round(wData.currently.temperature * 10) / 10 + " °F"
      h1.style.width="200px"
      var icon = wData.currently.icon
      // console.log(currentIcon);
      var skycons = new Skycons({"color": "white"});
      // you can add a canvas by it's ID...

      skycons.add("icon1", determineIcon(icon));
      skycons.play();
      var wForecast = wData.daily.data

      var highLow = document.getElementById('highLow')
      highh5Tag = document.createElement('h5')
      lowh5Tag = document.createElement('h5')

      highh5Tag.innerHTML = "H " + Math.round(wForecast[0].apparentTemperatureHigh * 10)/10 + "°F"
      lowh5Tag.innerHTML = "L "+  Math.round(wForecast[0].apparentTemperatureLow * 10)/10 + "°F"
      highh5Tag.style.marginBottom = '0px';
      lowh5Tag.style.marginTop = '5px';

      highh5Tag.style.marginLeft = '2px';
      lowh5Tag.style.marginLeft = '2px';

      highLow.innerHTML = ""
      highLow.append(highh5Tag)
      highLow.append(lowh5Tag)

      for(var i = 1; i < 6; i++) {
        //create the div for weekly forecast
        var div = document.createElement('div')
        //style the div
        div.style.display = "flex"
        div.style.justifyContent = "space-between"
        div.style.marginBottom = "-10%"
        div.style.alignItems = "center"
        div.style.width = '250px'
        div.style.marginLeft = "50px"
        var canvas = document.createElement('canvas')
        canvas.style.width = "20%"
        canvas.style.height = "20%"
        var head3 = document.createElement('h4')
        var head4 = document.createElement('h4')
        var head5 = document.createElement('h4')

        head5.innerHTML = getForecastDay(weekdays + i)

        skycons.add(canvas, determineIcon(wForecast[i].icon));
        head3.innerHTML = Math.round(wForecast[i].apparentTemperatureHigh * 10)/10 + " °F"
        head4.innerHTML = Math.round(wForecast[i].apparentTemperatureLow * 10)/10+ " °F"
        div.append(head5)
        div.append(canvas)
        div.append(head3)
        div.append(head4)
	//console.log('forecast erased')
        forecast.append(div)
	dailyTemp.append(h1)

      }
    });
  });
  var t = setTimeout(getWeather, 900*1000) //every  15 min
}

getWeather()

