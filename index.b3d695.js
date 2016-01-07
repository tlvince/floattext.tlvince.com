;(function() {
  'use strict'

  function getRandomIntInclusive (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function floating (el, index, wordPositions, xOffset, yOffset) {
    var top = 100
    var letterSpacing = 10

    var wordWidth = parseInt(el.offsetWidth, 10)

    var wordPosition = wordPositions[index - 1] || {
      xOffset: xOffset,
      wordWidth: -letterSpacing
    }

    wordPosition = wordPosition.xOffset + wordPosition.wordWidth + letterSpacing

    wordPositions[index] = {
      xOffset: wordPosition,
      wordWidth: wordWidth
    }

    el.style.top = yOffset + 'px'
    el.style.left = wordPosition + 'px'

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

  var content = document.getElementById('content')

  function go () {
    var text = document.getElementById('text')
    var floaters = text.innerText.split(' ')
    var wordPositions = []

    var xOffset = (window.innerWidth / 2) - (text.offsetWidth / 2)
    var yOffset = window.innerHeight

    var child = document.createElement('div')
    child.setAttribute('id', 'floaters')
    document.body.appendChild(child)

    function appendFloater (floater, i) {
      var el = document.createElement('span')
      el.setAttribute('class', 'floater')
      el.innerText = floater
      child.appendChild(el)
      floating(el, i, wordPositions, xOffset, yOffset)
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
}).call(this);
