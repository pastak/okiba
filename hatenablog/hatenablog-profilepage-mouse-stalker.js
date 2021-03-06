(function(){
  function init() {
    var author = document.documentElement.dataset.author
    var authorIconUrl = 'http://cdn1.www.st-hatena.com/users/' + author.substr(0,2) + '/' + author + '/profile.gif'
    var icon = document.createElement('img')
    icon.src = authorIconUrl
    document.body.appendChild(icon)
    icon.style.position = 'fixed'
    icon.style.width = '30px'
    icon.style.height = '30px'
    icon.style.zIndex = '10000'
    icon.style.pointerEvents = 'none'
    
    var subscribers = Array.prototype.slice.apply(document.querySelectorAll('.subscriber > img'))
    .map(function (subscriber) {
      var elm = document.createElement('img')
      document.body.appendChild(elm)
      elm.style.position = 'absolute'
      elm.style.zIndex = '1000'
      elm.style.width = '20px'
      elm.src = subscriber.src
      elm.style.pointerEvents = 'none'
      return elm
    })
    var positionsMem = []
    var count = 0
    var throttle = 0
    var scrollStartX = null
    var scrollStartY = null
    function updateIcons (event) {
      if (event.pageX) {
        icon.style.left = (event.pageX - window.scrollX - 15) + 'px'
        icon.style.top = (event.pageY - window.scrollY - 15) + 'px'
      }
      if (throttle++ % 3 > 0) return
      if (event.pageX) {
        scrollStartX = null
        scrollStartY = null
        positionsMem[count] = {x: event.pageX - 10, y: event.pageY - 10}
      } else {
        if (scrollStartY === null) {
          scrollStartX = window.scrollX
          scrollStartY = window.scrollY
        }
        console.log(window.scrollX, scrollStartX, window.scrollX - scrollStartX)
        var prePos = positionsMem[(count === 0 ? subscribers.length - 1 : count - 1)]
        positionsMem[count] = {
          x: prePos.x + (window.scrollX - scrollStartX),
          y: prePos.y + (window.scrollY - scrollStartY)
        }
        scrollStartX = window.scrollX
        scrollStartY = window.scrollY
      }
      count = ++count % subscribers.length
      subscribers.forEach(function (elm, index) {
        elm.style.left = ((positionsMem[index] && positionsMem[index].x) || 0)  + 'px'
        elm.style.top = ((positionsMem[index] && positionsMem[index].y) || 0) + 'px'
      })
    }
    window.addEventListener('mousemove', updateIcons)
    document.addEventListener('scroll', updateIcons)
  }
  if (document.readyState === 'complete') return init();
  document.addEventListener('readystatechange', function () {
    if (document.readyState === 'complete') init();
  })
})()
