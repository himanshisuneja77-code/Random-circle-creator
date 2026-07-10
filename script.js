// Select HTML elements
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

    // Create a new div
    const circle = document.createElement("div");

    // Add CSS class
    circle.className = "circle";

    // Give it a random color
    circle.style.backgroundColor = randomColor();

    // Position the circle at the click location
    circle.style.left = (e.offsetX - 25) + "px";
    circle.style.top = (e.offsetY - 25) + "px";

    // Add circle to the canvas
    canvas.appendChild(circle);

    // Store circle for Undo
    circles.push(circle);

    // Clear redo history whenever a new circle is created
    redoStack = [];
});

// Undo button
undoBtn.addEventListener("click", function () {

    if (circles.length === 0) {
        return;
    }

    const lastCircle = circles.pop();

    redoStack.push(lastCircle);

    canvas.removeChild(lastCircle);

});

// Redo button
redoBtn.addEventListener("click", function () {

    if (redoStack.length === 0) {
        return;
    }

    const circle = redoStack.pop();

    canvas.appendChild(circle);

    circles.push(circle);

});

// Reset button
resetBtn.addEventListener("click", function () {

    circles.forEach(function (circle) {
        circle.remove();
    });

    circles = [];
    redoStack = [];

});