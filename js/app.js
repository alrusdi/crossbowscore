var dragItem = document.querySelector(".cross");
var container = document.querySelector(".target");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function cords_to_angle(ex, ey) {
    var dy = ey;
    var dx = ex;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0) theta = 360 + theta;
    return theta;
}

function coords_to_dist(x, y) {
    var length = Math.sqrt(x*x+y*y);
    return length;
}

function coords_from_angle_and_dist(angle, dist) {
    deg2rad = Math.PI / 180;
    return [
        dist * Math.cos(angle * deg2rad)
        ,
        dist * Math.sin(angle * deg2rad)
    ]
}

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem || e.target === container) {
        active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    angle = cords_to_angle(currentX, currentY);
    dist = coords_to_dist(currentX, currentY);
    rec = coords_from_angle_and_dist(angle, dist);

    console.log({
        currentX,
        currentY,
        angle,
        dist,
        rec
    })
    active = false;
}

function drag(e) {
    if ( ! active) return;

    e.preventDefault();

    if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
    } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, dragItem);
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}