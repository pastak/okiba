'use strict'

const clearCanvas = (canvas) => {
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
}

const imageElm = document.getElementById('image')

const drawCircle = (canvas, rate = 1.0) => {
  clearCanvas(canvas)
  const context = canvas.getContext('2d')

  context.drawImage(imageElm, 0, 0, 1200, 1200, 0, 0, 300 * rate, 300 * rate)
  context.beginPath()
  context.arc(100 * rate, 75 * rate, 50 * rate, 0 * rate, 2*Math.PI)
  context.fillStyle = 'rgb(254, 98, 98)'
  context.fill()
  context.lineWidth = 7
  context.strokeStyle = 'rgb(0, 0, 0)'
  context.stroke()
}

document.getElementById('image').addEventListener('load', () => {
  [...document.querySelectorAll('canvas')].forEach((canvas) => {
    drawCircle(canvas)
  })
})

document.getElementById('btn0').addEventListener('click', () => {
  [...document.querySelectorAll('canvas')].forEach((canvas, rate) => {
    if (canvas.id === 'canvas1') {
      canvas.width = 600
      canvas.height = 600
    } else {
      canvas.style.width = '600px'
      canvas.style.height = '600px'
    }
  })
})

document.getElementById('btn1').addEventListener('click', () => {
  [...document.querySelectorAll('canvas')].forEach((canvas, rate) => {
    if (canvas.id === 'canvas1') {
      canvas.width = 600
      canvas.height = 600
    } else {
      canvas.style.width = '600px'
      canvas.style.height = '600px'
    }
    drawCircle(canvas)
  })
})

document.getElementById('btn2').addEventListener('click', () => {
  [...document.querySelectorAll('canvas')].forEach((canvas) => {
    if (canvas.id === 'canvas2') {
      canvas.width = 600
      canvas.height = 600
      drawCircle(canvas, 2.0)
    }
  })
})

document.getElementById('btnReset').addEventListener('click', () => location.reload())
