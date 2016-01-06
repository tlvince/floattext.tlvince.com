function getRandomIntInclusive (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var widths = []

function floating (el, index, start, startWidth) {
  var top = 100
  var letterSpacing = 10

  var me = parseInt(el.offsetWidth, 10)
  var width = widths[index - 1] || {width: startWidth, me: -letterSpacing}
  width = width.width + width.me + letterSpacing
  widths[index] = {width: width, me: me}

  el.style.top = start + 'px'
  el.style.left = width + 'px'

  var moves = 0

  function move () {
    function setMargin () {
      var offset = getRandomIntInclusive(1, 100)
      var binary = getRandomIntInclusive(0, 1)

      var i = 0
      if (binary || moves < 10) {
        i = -offset
      } else {
        i = offset
      }

      el.style.top = top + i + 'px'
      moves++
      move()
    }

    var delay = getRandomIntInclusive(1, 500)

    window.setTimeout(setMargin, delay)
  }

  move()
}

var content = document.getElementById('float')

function go() {
  var text = document.getElementById('text')
  var floaters = text.innerText.split(' ')

  var child = document.createElement('div')
  child.setAttribute('id', 'floaters')
  document.body.appendChild(child)

  function appendFloater (floater, i) {
    var el = document.createElement('span')
    el.setAttribute('class', 'floater')
    el.innerText = floater
    child.appendChild(el)
    floating(el, i, window.innerHeight, (window.innerWidth / 2) - (text.offsetWidth / 2))
    el.style.opacity = 1
  }

  floaters.forEach(appendFloater)
}

function toggleOpacity (focusContent) {
  content.style.opacity = focusContent ? 1 : 0
  var floaters = document.getElementById('floaters')
  floaters.style.opacity = focusContent ? 0 : 1
}

function resetFloaters () {
  var floaters = document.getElementById('floaters')
  document.body.removeChild(floaters)
  go()
}

content.addEventListener('input', resetFloaters)
content.addEventListener('mouseover', toggleOpacity.bind(null, true))
content.addEventListener('mouseout', toggleOpacity.bind(null, false))

go()
content.style.opacity = 0
