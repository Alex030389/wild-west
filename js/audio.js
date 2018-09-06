'use strict'

var audioMenu = new Audio;
if (audioMenu.canPlayType("audio/mpeg") == "probably") {
        audioMenu.src = "./audio/menu.ogg";
    } else {
        audioMenu.src = "./audio/menu.mp3";
        
    }
audioMenu.loop = true;

var audioFight = new Audio;
if (audioFight.canPlayType("audio/mpeg") == "probably") {
    audioFight.src = "./audio/fight.ogg";
} else {
    audioFight.src = "./audio/fight.mp3";
}
audioFight.loop = true;

var audioMyShot = new Audio;
if (audioMyShot.canPlayType("audio/mpeg") == "probably") {
    audioMyShot.src = "./audio/my-shot.ogg";
} else {
    audioMyShot.src = "./audio/my-shot.mp3";
}

var audioRecharge = new Audio;
if (audioRecharge.canPlayType("audio/mpeg") == "probably") {
    audioRecharge.src = "./audio/recharge.ogg";
} else {
    audioRecharge.src = "./audio/recharge.mp3";
}

var audioGangShot = new Audio;
if (audioGangShot.canPlayType("audio/mpeg") == "probably") {
    audioGangShot.src = "./audio/gang-shot.ogg";
} else {
    audioGangShot.src = "./audio/gang-shot.mp3";
}

var audioGlass = new Audio;
if (audioGlass.canPlayType("audio/mpeg") == "probably") {
    audioGlass.src = "./audio/broken-glass.ogg";
} else {
    audioGlass.src = "./audio/broken-glass.mp3";
}

var audioTheEnd = new Audio;
if (audioTheEnd.canPlayType("audio/mpeg") == "probably") {
    audioTheEnd.src = "./audio/the-end.ogg";
} else {
    audioTheEnd.src = "./audio/the-end.mp3";
}