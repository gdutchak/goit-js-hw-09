const refs = {
    start: document.querySelector("[data-start]"),
    stop: document.querySelector("[data-stop]"),
    body: document.querySelector("body")
}
let colorId = null;
refs.stop.setAttribute("disabled", "disabled")
refs.start.addEventListener("click", onChangeColor)
refs.stop.addEventListener("click", onStopChangeColor)

function onChangeColor() {
    colorId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    refs.start.setAttribute("disabled", "disabled")
    refs.stop.removeAttribute("disabled")
}
function onStopChangeColor() {
    clearInterval(colorId)
    refs.start.removeAttribute("disabled")
    refs.stop.setAttribute("disabled", "disabled")
}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
