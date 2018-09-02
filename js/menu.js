"use strict"

setTimeout(function () {
    var preloader = document.querySelector(".preloader");
    if (!preloader.classList.contains("done")) {
        preloader.classList.add("done");
    }
    right();
}, 2000)

var audioMenu = new Audio;
if (audioMenu.canPlayType("audio/mpeg") == "probably") {
    audioMenu.src = "./audio/menu.ogg";
} else {
    audioMenu.src = "./audio/menu.mp3";
}

function musicStart() {
    audioMenu.play();
}


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