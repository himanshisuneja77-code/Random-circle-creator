
const canvas = document.getElementById("canvas");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");
const resetBtn = document.getElementById("reset");

// Arrays to store circles
let circles = [];
let redoStack = [];

// Function to generate a random color
function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
}

// Create a circle on canvas click
canvas.addEventListener("click", function (e) {

    const circle = document.createElement("div");

    circle.className = "circle";

    circle.style.backgroundColor = randomColor();

    // Position the circle at the click location
    circle.style.left = (e.offsetX - 25) + "px";
    circle.style.top = (e.offsetY - 25) + "px";

    canvas.appendChild(circle);

    circles.push(circle);

    redoStack = [];
});

undoBtn.addEventListener("click", function () {

    if (circles.length === 0) {
        return;
    }

    const lastCircle = circles.pop();

    redoStack.push(lastCircle);

    canvas.removeChild(lastCircle);

});

redoBtn.addEventListener("click", function () {

    if (redoStack.length === 0) {
        return;
    }

    const circle = redoStack.pop();

    canvas.appendChild(circle);

    circles.push(circle);

});

resetBtn.addEventListener("click", function () {

    circles.forEach(function (circle) {
        circle.remove();
    });

    circles = [];
    redoStack = [];

});
