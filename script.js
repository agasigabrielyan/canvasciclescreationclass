let canvas = document.getElementById('map');
let context = canvas.getContext("2d");

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

canvas.width = windowWidth;
canvas.height = windowHeight;

canvas.style.background = "#fff";

let numberOfCicles = Math.random() * 100;
let allCicles = [];

let createCicle = function( cicle ) {
    cicle.draw( context );
}
let randomX = 0;
let randomY = 0;
let radius = 0;
for(let i=0; i<numberOfCicles; i++) {
    randomX =  Math.random() * windowWidth;
    randomY = Math.random() * windowHeight;
    radius = Math.random() * 10;
    let myCicle = new Cicle(randomX, randomY, 50, "yellow");
    allCicles.push(myCicle);
    createCicle(allCicles[i]);
}