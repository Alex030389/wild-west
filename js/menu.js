"use strict"

setTimeout(function () {
    var preloader = document.querySelector(".preloader");
    if (!preloader.classList.contains("done")) {
        preloader.classList.add("done");
    }
    right();
}, 1000)

var soundMenu = document.querySelector('.sound-menu');
    // soundMenu.play();

var start = document.querySelector(".button");
start.addEventListener("click", function() {
    soundMenu.pause();
    // startGame();
}, false)

var rightButton = document.querySelector('.right');
rightButton.addEventListener('click', right, false);
var count = 1;
function right() {
    count++;
    if (count > 5) {
        count = 1;
    }
    var gangsterImg = document.querySelector('.gangster-img');
    var attr = './img/gang' + count + '.png'
    gangsterImg.setAttribute('src', attr);
    return count;
}

var leftButton = document.querySelector('.left');
leftButton.addEventListener('click', left, false);
function left() {
    count--;
    if (count < 1) {
        count = 5;
    }
    var gangsterImg = document.querySelector('.gangster-img');
    var attr = './img/gang' + count + '.png'
    gangsterImg.setAttribute('src', attr);
    return count;
}