"use strict"

setTimeout(function () {
    var preloader = document.querySelector(".preloader");
    if (!preloader.classList.contains("done")) {
        preloader.classList.add("done");
        audioMenu.play();
    }
}, 1000)

var leftButton = document.querySelector(".left-button");
var rightButton = document.querySelector(".right-button");
var slides = document.querySelectorAll(".slide");
var currentSlide = 0;

leftButton.addEventListener("click", function () {
    previousSlide();
});

rightButton.addEventListener("click", function () {
    nextSlide();
});

function previousSlide() {
    goToSlide(currentSlide - 1);
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function goToSlide(n) {
    slides[currentSlide].className = "slide";
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].className = "slide showing";
}

var startButton = document.querySelector(".start-button");
startButton.addEventListener("click", function () {
    audioMenu.pause();
    switchToAboutPage();
}, false);