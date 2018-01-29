function getNews(){
fetch('https://galvanize-cors.herokuapp.com/http://api.nytimes.com/svc/topstories/v2/technology.json?api-key=606e61abf0b846909e1db653220e47be')
.then((res)=>{
  console.log(res);
  return res.json()
  .then ((newsData)=>{
    console.log(newsData)
    var serial = document.getElementById('news')
    console.log(serial)
    for(var i = 0; i < 5; i++){
      var h3 = document.createElement('h3')
      var div = document.createElement('div')
      var pTag = document.createElement('p')

      div.className = 'articles'
      h3.innerHTML = newsData.results[i].title
      pTag.innerHTML = newsData.results[i].abstract
      div.append(h3)
      div.append(pTag)
      serial.append(div)

    }
  })
})
  var t = setTimeout(getNews, 3000*1000) //every 1/2 an hour
}
getNews()
