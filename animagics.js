var svgContainer = document.getElementById('svg-frame');

var typeToggle = document.getElementById('type-toggle');
var stopButton = document.getElementById('stop-button');

var statusDisplay = document.getElementById('status-display');

/*
    Current animation type
    0: Circle
    1: DVD
*/
var curAnimation = 0;

// Changes the animation
var toggleAnimation = function() {
    switch(curAnimation) {
        case 0:
            curAnimation++;
            break;
        case 1:
            curAnimation = 0;
            break;
    }
    clearSVG();
    var status = updateStatus();
    console.log("Animation type changed to: " + status);
};

/* 
    Updates the status
    Returns the status
*/
var updateStatus = function() {
    var status;
    switch(curAnimation) {
        case 0:
            status = "circling"
            break;
        case 1:
            status = "dvding"
            break;
    }
    var statusString = "Currently " + status;
    statusDisplay.innerHTML = statusString;
    return status;
};

// Clears the SVG container
var clearSVG = function() {
    svgContainer.innerHTML = "";
};

// Sets up the empty SVG container
var setupSVG = function() {
    var drawnElement;
    switch(curAnimation) {
        case 0:
            drawnElement = setupCircle();
            break;
        case 1:
            drawnElement = setupDVD();
            break;
    }
    startAni(drawnElement);
};

// Direction of circle
var circleDir = 0;

// Starts the animation
var startAni = function(drawnElement) {
    switch(curAnimation) {
        case 0:
            aniCircle(drawnElement, 0);
            break;
        case 1:
            aniDVD(drawnElement);
            break;
    }
};

var svgns = "http://www.w3.org/2000/svg";

// Sets up a circle
var setupCircle = function() {
    var cx = svgContainer.offsetWidth / 2;
    var cy = svgContainer.offsetHeight / 2;

    var drawnCircle = document.createElementNS(svgns, 'circle');
    drawnCircle.setAttributeNS(null, 'cx', cx);
    drawnCircle.setAttributeNS(null, 'cy', cy);
    drawnCircle.setAttributeNS(null, 'r', cy / 2);
    drawnCircle.classList.add('d-circle');
    svgContainer.appendChild(drawnCircle);
    return drawnCircle;
};

/*
    Animates the circle
    drawnElement: js object
    dir 0: expand
    dir 1: contract
*/
var aniCircle = function(drawnElement, dir) {
    var radius = drawnElement.getAttribute('r');
    switch(dir) {
        case 0:
            drawnElement.setAttributeNS(null, 'r', radius + 1);
            break;
        case 1:
            drawnElement.setAttributeNS(null, 'r', radius - 1);
    }
    reverseDirCheck();
};

var reverseDirCheck = function() {
    var radius = drawnElement.getAttribute('r');
    if (radius >= (svgContainer.offsetHeight / 2)) {
        circleDir = 1;
    } else if (radius <= 0) {
        circleDir = 0;
    }
};

typeToggle.addEventListener('click', toggleAnimation, true);

