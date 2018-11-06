"use strict";

var wrapper = document.querySelector(".wrapper");

// Позиционирование дверных проемов в здании

var doorSvg = document.querySelectorAll(".door-svg");

var door1 = new DoorCon(".door-1");
var door2 = new DoorCon(".door-2");
var door3 = new DoorCon(".door-3");
var door4 = new DoorCon(".door-4");
var door5 = new DoorCon(".door-5");
var door6 = new DoorCon(".door-6");
var door7 = new DoorCon(".door-7");
var kalitka = new DoorCon(".kalitka");

function DoorCon(a) {
    var self = this;
    self.a = a;
    self.width = 0;
    self.height = 0;
    self.top = 0;
    self.left = 0;

    self.update = function () {
        var elem = document.querySelector(self.a);
        elem.style.width = this.width + "px";
        elem.style.height = this.height + "px";
        elem.style.top = this.top + "px";
        elem.style.left = this.left + "px";
    }
}

var doorDiv = [door1, door2, door3, door4, door5, door6, door7];

// Вызываем функцию и вешаем событие size, для подстановки div в дверные проемы в зависимости от ширины браузера

sizeAll();
window.addEventListener("resize", sizeAll, false);

function sizeAll() {
    for (var i = 0; i < 7; i++) {
        size(doorDiv[i], doorSvg[i].getBoundingClientRect());
    }
}

function size(div, svg) {
    div.width = svg.width;
    div.height = svg.height;
    div.top = svg.top - wrapper.offsetTop;
    div.left = svg.left - wrapper.offsetLeft;
    div.update();

    //kalitka
    kalitka.width = doorSvg[5].getBoundingClientRect().width;
    kalitka.top = doorSvg[5].getBoundingClientRect().top - wrapper.offsetTop + doorSvg[5].getBoundingClientRect().height /
        3;
    kalitka.left = doorSvg[5].getBoundingClientRect().left - wrapper.offsetLeft;
    kalitka.update();
}

// Полет куста
var kustWrap = document.querySelector(".kust-wrap");
var kust = {
    posX: 0,
    posY: 0,

    width: 50,
    height: 50,

    speedX: 6,
    speedY: 0,

    accelX: 0,
    accelY: 0.1,

    rotate: function () {
        var kustImg = document.querySelector(".kust__img");
        kustImg.style.cssText = "transform: rotate(360deg)";
    },
    update: function () {
        var kustPos = document.querySelector(".kust");
        kustPos.style.width = this.width + "px";
        kustPos.style.height = this.height + "px";
        kustPos.style.left = Math.round(this.posX) + "px";
        kustPos.style.top = Math.round(this.posY) + "px";
    }
};

var RAF =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

RAF(tick);

function tick() {
    kust.posX += kust.speedX;

    if (kust.width + kust.posX > kustWrap.offsetWidth) {
        kust.width = 0;
        kust.update();
        startGame();
        return;
    }

    kust.speedY += kust.accelY;
    kust.posY += kust.speedY;

    if (kust.posY + kust.width > kustWrap.offsetHeight) {
        kust.speedY = -kust.speedY;
        kust.rotate();
        kust.posY = kustWrap.offsetHeight - kust.height;
    }

    if (kust.posY < 0) {
        kust.speedY = -kust.speedY;
    }

    kust.update();
    RAF(tick);
}

// startGame();

function startGame() {
    audioFight.play();

    // вывод счета на экран
    var taimer = setInterval(function () {
        score.makeCounter();
        rand(3); //скорость появления гангстеров
    }, 600);

    var score = {
        count: 0,
        elem: document.querySelector(".skore-num"),
        makeCounter: function () {
            this.count++;
            this.elem.innerHTML = this.count;
        }
    }

    //гангстеры
    var timeout = undefined;

    function Gangster(img) {
        this.img = "./img/" + img;
        this.create = function () {
            var elem = document.createElement("img");
            elem.setAttribute("src", this.img);
            elem.className = "gangsters";
            timeout = setTimeout(function () {
                var shotImg = document.createElement("img");
                shotImg.setAttribute("src", "./img/shot.png");
                shotImg.className = "fireImg";
                elem.appendChild(shotImg);
                elem.parentNode.appendChild(shotImg);
                var timeout2 = setTimeout(function () {
                    elem.parentNode.remove(shotImg);
                }, 400)

                sheriff.hit();
            }, 2000);
            return elem;
        }
    }

    var gang1 = new Gangster("gang1.png");
    var gang2 = new Gangster("gang2.png");
    var gang3 = new Gangster("gang3.png");
    var gang4 = new Gangster("gang4.png");
    var gang5 = new Gangster("gang5.png");

    var allGang = [gang1, gang2, gang3, gang4, gang5];

    var currentG = 0;

    function gangRandom() {
        if (currentG > allGang.length - 1) {
            currentG = 0;
        }
        return allGang[currentG++];
    }

    // рандомное появления в дверных проемах и открытие закрытие калитки
    var doors = document.querySelectorAll(".door");

    var cont = 0;

    function rand(n) {
        moveKalitka();
        if (++cont % n == 0) {
            do {
                var i = randomDiap(0, doors.length - 1);
            } while (doors[i].firstChild);

            doors[i].appendChild(gangRandom().create());
            moveKalitka();
        }
    }

    function moveKalitka() {
        if (doors[5].firstChild == null) {
            kalitka.close();
        } else {
            kalitka.open();
        }
    }

    // уменьшение жизней, запись результата и выход из игры
    var sheriff = {
        health: 2,
        hit: function () {
            audioGangShot.play();
            var star = document.querySelectorAll(".star");
            star[--this.health].setAttribute("fill-opacity", 0);
            if (this.health === 0) {
                audioFight.pause();
                window.navigator.vibrate(1000);
                audioGlass.play();
                clearTimeout(timeout);
                clearInterval(taimer);
                var result = score.count;
                final(result);
            }
        }
    }

    // стрельба и перезарядка. включение и отключение кликов 
    window.addEventListener("click", shot, false);
    var bullet = document.querySelectorAll(".ammun");
    var aa = 6;
    var propusk1 = 2;
    var propusk2 = 2;
    var shotNumber = 0;

    function shot(e) { //выстрел
        var e = e || window.event;
        if (++shotNumber % 2 == 0) {
            audioMyShot1.play();
        } else {
            audioMyShot2.play();
        }
        window.navigator.vibrate(100);

        if (e.target == door5Move.elem.firstChild) {
            door5Move.move();
        }
        if (e.target == door7Move.elem.firstChild) {
            door7Move.move();
        }

        if (e.target == door5Move.elem.firstChild && propusk1 == 2) {
            propusk1--;
        } else if (e.target == door7Move.elem.firstChild && propusk2 == 2) {
            propusk2--;
        } else {
            propusk1 = 2;
            propusk2 = 2;
            for (var i = 0; i < doors.length; i++) {
                if (e.target == doors[i].firstChild) {
                    clearTimeout(timeout);
                    doors[i].removeChild(doors[i].firstChild);
                }
            }
        }

        aa--;
        bullet[aa].setAttribute("fill-opacity", 0);
        if (aa === 0) {
            window.removeEventListener("click", shot, false);
            return;
        }
    }

    window.addEventListener("keydown", recharge, false);

    // свайп
    var bbody = document.body;
    Hammer(bbody).on("swipe", function () {
        audioRecharge.play();
        aa = 6;
        window.addEventListener("click", shot, false);
        for (var i = 0; i < 6; i++) {
            bullet[i].removeAttribute("fill-opacity");
        };
    })

    function recharge(e) { //перезарядка
        var e = e || window.event;
        audioRecharge.play();
        if (e.keyCode === 32) {
            aa = 6;
            window.addEventListener("click", shot, false);
            for (var i = 0; i < 6; i++) {
                bullet[i].removeAttribute("fill-opacity");
            }
        }
    }

    // смещение рандомное гангстеров в проемах
    var door5Move = new DoorMove("door-bottom-5__inner", "door-bottom-5__inner door-bottom-5__inner_move-right",
        "door-bottom-5__inner door-bottom-5__inner_move-left");
    var door7Move = new DoorMove("door-bottom-7__inner", "door-bottom-7__inner door-bottom-7__inner_move-right",
        "door-bottom-7__inner door-bottom-7__inner_move-left");

    function DoorMove(center, right, left) {
        this.elem = document.querySelector("." + center),
            this.shot = 1,
            this.move = function () {
                if (this.shot++ == 1) {
                    if (randomDiap(1, 2) == 1) {
                        this.elem.className = right;
                    } else {
                        this.elem.className = left;
                    }
                } else {
                    this.elem.className = center;
                    this.shot = 1;
                }
            }
    }

    // открытие калитки при появлении гангстера
    var kalitka = {
        elemLeft: document.querySelector(".kalitka__left"),
        elemRight: document.querySelector(".kalitka__right"),
        open: function () {
            this.elemLeft.classList.add("kalitka__left_open");
            this.elemRight.classList.add("kalitka__right_open");
        },
        close: function () {
            this.elemLeft.classList.remove("kalitka__left_open");
            this.elemRight.classList.remove("kalitka__right_open");
        }
    }

    // random
    function randomDiap(n, m) {
        return Math.floor(Math.random() * (m - n + 1)) + n;
    }
}

// вывод финальной заставки
function final(yourResult) {

    var theEnd = document.createElement("div");
    theEnd.classList.add("the-end");
    document.body.appendChild(theEnd);

    // ajax
    var info;
    var ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
    var updatePassword;
    var stringName = "KAMEISHA_WILDWEST_RESULT";
    storeInfo();

    function storeInfo() {
        updatePassword = Math.random();
        $.ajax({
            url: ajaxHandlerScript,
            type: "POST",
            cache: false,
            dataType: "json",
            data: {
                f: "LOCKGET",
                n: stringName,
                p: updatePassword
            },
            success: lockGetReady,
            error: errorHandler
        });
    }

    function lockGetReady(callresult) {
        info = JSON.parse(callresult.result);
        if (callresult.error != undefined) {
            alert(callresult.error);
        } else if (yourResult > info.lider) {
            console.log("Это лучший результат");
            info.lider = yourResult;
            $.ajax({
                url: ajaxHandlerScript,
                type: "POST",
                cache: false,
                dataType: "json",
                data: {
                    f: "UPDATE",
                    n: stringName,
                    v: JSON.stringify(info),
                    p: updatePassword
                },
                success: updateReady,
                error: errorHandler
            });
        } else {
            console.log("Попробуй еще")
            updateReady()
        }
    }

    function errorHandler(jqXHR, statusStr, errorStr) {
        alert(statusStr + " " + errorStr);
    }

    // создать модальное окно c результатом и финальная музыка
    function updateReady() {
        var bestResult = document.createElement("div");
        bestResult.classList.add("best-result");
        bestResult.addEventListener("click", function () {
            location.reload();
        }, false)

        bestResult.innerHTML = "Best result: " + info.lider + "<br>" + "Your result: " + yourResult + "<br>" + "Click here for restart";
        document.body.appendChild(bestResult);
        setTimeout(function () {
            audioTheEnd.play();
            bestResult.classList.add("best-result_opacity");
        }, 2000)
    }
}