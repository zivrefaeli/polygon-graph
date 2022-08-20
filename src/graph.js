const SIZE = 800
export const R = 350
export const middle = [0, 0]

const WIDTH = SIZE, HEIGHT = SIZE
const MX = WIDTH / 2, MY = HEIGHT / 2
let context = null

export const round = number => Math.round(number * 100) / 100
const translateX = x => x + MX
const translateY = y => MY - y
const move = (x, y) => context.moveTo(translateX(x), translateY(y))
const line = (x, y) => context.lineTo(translateX(x), translateY(y))

function drawLine(x1, y1, x2, y2, color) {
    if (typeof color === 'undefined')
        color = 'black'
    context.beginPath()
    move(x1, y1)
    line(x2, y2)

    context.lineWidth = 1
    context.strokeStyle = color
    context.stroke()
}

export function shape(n, [x, y], { radius, angle, lines, color }) {
    const dots = []

    context.beginPath()
    for (let k = 0; k < n; k++) {
        let xk = round(x + radius * Math.cos((Math.PI / 180) * (360 / n * k + angle)))
        let yk = round(y + radius * Math.sin((Math.PI / 180) * (360 / n * k + angle)))
        if (lines) {
            move(x, y)
            line(xk, yk)
        }
        dots.push([xk, yk])
    }

    dots.push(dots[0])
    move(dots[0][0], dots[0][1])
    for (let i = 1; i < dots.length; i++)
        line(dots[i][0], dots[i][1])

    context.lineWidth = 1
    context.strokeStyle = color
    context.stroke()

    dots.pop()
    return dots
}

export function axes() {
    drawLine(0, MY, 0, -MY)
    drawLine(MX, 0, -MX, 0)
}

export function clear() {
    context.clearRect(0, 0, WIDTH, HEIGHT)
}

export function custom(data, style) {
    // console.log(data)
    data.push(data[0])

    context.beginPath()
    move(data[0][0], data[0][1])
    for (let i = 1; i < data.length; i++)
        line(data[i][0], data[i][1])

    context.lineWidth = 3
    context.strokeStyle = style.stroke
    context.stroke()
    context.fillStyle = style.fill
    context.fill()
}

export function text(content, x, y) {
    context.beginPath()
    context.font = '30px Times'
    context.fillStyle = 'black'

    if (x > middle[0])
        context.textAlign = 'left'
    else if (x < middle[0])
        context.textAlign = 'right'
    else
        context.textAlign = 'center'

    context.fillText(content, translateX(x), translateY(y))

}

export default function init(graph) {
    graph.width = WIDTH
    graph.height = HEIGHT
    context = graph.getContext('2d')
}