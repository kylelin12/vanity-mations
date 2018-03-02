var svgContainer = document.getElementById('svg-frame');

var typeToggle = document.getElementById('type-toggle');
var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');

var statusDisplay = document.getElementById('status-display');

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
    console.log(statusString);
    statusDisplay.innerHTML = statusString;
    return status;
};

/*
    Current animation type
    0: Circle
    1: DVD
*/
var curAnimation = 0;

var svgns = "http://www.w3.org/2000/svg";

// Direction of circle
var circleDir = 0;

// Sets up a circle
var setupCircle = function() {
    var cx = parseInt(svgContainer.getAttribute('width')) / 2;
    var cy = parseInt(svgContainer.getAttribute('height')) / 2;
    var r = cy / 2;

    console.log("cx: " + cx + " cy: " + cy + " r: " + r);

    var drawnCircle = document.createElementNS(svgns, 'circle');
    drawnCircle.setAttributeNS(null, 'cx', cx);
    drawnCircle.setAttributeNS(null, 'cy', cy);
    drawnCircle.setAttributeNS(null, 'r', r);
    drawnCircle.classList.add('d-circle');
    svgContainer.appendChild(drawnCircle);
    return drawnCircle;
};

var reverseDirCheck = function(drawnElement) {
    var radius = parseInt(drawnElement.getAttribute('r'));
    switch(circleDir) {
        case 0:
            if (radius >= (parseInt(svgContainer.getAttribute('height') / 2))) {
                circleDir = 1;
            }
            break;
        case 1:
            if (radius <= 0) {
                circleDir = 0;
            }
            break;
    }
};

/*
    Animates the circle
    drawnElement: js object
    dir 0: expand
    dir 1: contract
*/
var aniCircle = function(drawnElement, dir) {
    var radius = parseInt(drawnElement.getAttribute('r'));
    //console.log("radius: " + radius);
    switch(dir) {
        case 0:
            drawnElement.setAttributeNS(null, 'r', radius + 1);
            break;
        case 1:
            drawnElement.setAttributeNS(null, 'r', radius - 1);
            break;
    }
    reverseDirCheck(drawnElement);
};

// Velocities of the dvd logo
var velX = 3;
var velY = 4;

var setupDVD = function() {
    var drawnDVD = document.createElementNS(svgns, 'image');
    drawnDVD.setAttributeNS(null, 'x', 0);
    drawnDVD.setAttributeNS(null, 'y', 0);
    drawnDVD.setAttributeNS(null, 'width', 200);
    drawnDVD.setAttributeNS(null, 'height', 97);
    drawnDVD.setAttributeNS(null, 'href', 'dvd.svg');
    svgContainer.appendChild(drawnDVD);
    return drawnDVD;
};

var aniDVD = function(drawnElement) {
    var cx = parseInt(drawnElement.getAttribute('x'));
    var cy = parseInt(drawnElement.getAttribute('y'));

    drawnElement.setAttributeNS(null, 'x', cx + velX);
    drawnElement.setAttributeNS(null, 'y', cy + velY);

    cx = parseInt(drawnElement.getAttribute('x'));
    cy = parseInt(drawnElement.getAttribute('y'));
    var mx = parseInt(svgContainer.getAttribute('width'));
    var my = parseInt(svgContainer.getAttribute('height'));
    var w = parseInt(drawnElement.getAttribute('width'));
    var h = parseInt(drawnElement.getAttribute('height'));

    //console.log("mx: " + mx + " my: " + my);
    console.log("cx: " + cx + " cy: " + cy);

    if ((cx + w) >= mx || cx <= 0) {
        velX *= -1;
    }
    if ((cy + h) >= my || cy <= 0) {
        velY *= -1;
    }
};

// Starts the animation
var animateStuff = function(drawnElement) {
    //console.log(drawnElement);
    switch(curAnimation) {
        case 0:
            aniCircle(drawnElement, circleDir);
            break;
        case 1:
            aniDVD(drawnElement);
            break;
    }
};

var intervalID;

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
    //console.log(drawnElement);
    intervalID = setInterval(animateStuff, 10, drawnElement);   
};

var stopAnimation = function() {
    clearTimeout(intervalID);
};

// Clears the SVG container
var clearSVG = function() {
    clearTimeout(intervalID);
    svgContainer.innerHTML = "";
    circleDir = 0;
    velX = 3;
    velY = 4;
    intervalID = "";
    setupSVG();
};

clearSVG();

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

typeToggle.addEventListener('click', toggleAnimation, true);
startButton.addEventListener('click', clearSVG, true);
stopButton.addEventListener('click', stopAnimation, true);
