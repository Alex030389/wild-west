"use strict"

setTimeout(function () {
    var preloader = document.querySelector(".preloader");
    if (!preloader.classList.contains("done")) {
        preloader.classList.add("done");
    }
}, 2000)

audioMenu.play();
var startButton = document.querySelector(".start-button");
startButton.addEventListener('click', function() {
    audioMenu.pause();
    switchToAboutPage();
}, false);