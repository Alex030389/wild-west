'use strict'

var audioMenu = new Audio;
var audioFight = new Audio;
var audioMyShot1 = new Audio;
var audioMyShot2 = new Audio;
var audioRecharge = new Audio;
var audioGangShot = new Audio;
var audioGlass = new Audio;
var audioTheEnd = new Audio;

initAudio(audioMenu, "./audio/menu.ogg", "./audio/menu.mp3");
initAudio(audioFight, "./audio/fight.ogg", "./audio/fight.mp3");
initAudio(audioMyShot1, "./audio/my-shot.ogg", "./audio/my-shot.mp3");
initAudio(audioMyShot2, "./audio/my-shot.ogg", "./audio/my-shot.mp3");
initAudio(audioRecharge, "./audio/recharge.ogg", "./audio/recharge.mp3");
initAudio(audioGangShot, "./audio/gang-shot.ogg", "./audio/gang-shot.mp3");
initAudio(audioGlass, "./audio/broken-glass.ogg", "./audio/broken-glass.mp3");
initAudio(audioTheEnd, "./audio/the-end.ogg", "./audio/the-end.mp3");
initAudio(audioMenu, "./audio/menu.ogg", "./audio/menu.mp3");

function initAudio(name, ogg, mp3) {
    if (name.canPlayType("audio/mpeg") == "probably") {
        name.src = ogg;
    } else {
        name.src = mp3;
    }
}

audioFight.loop = true;