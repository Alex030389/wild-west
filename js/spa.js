"use strict";
window.onhashchange = switchToStateFromURLHash;

var SPAState = {};

function switchToStateFromURLHash() {
    // audioMenu.pause();//vedfsasdf
    var URLHash = window.location.hash;
    var stateStr = URLHash.substr(1);

    if (stateStr != "") {
        var parts = stateStr.split("_")
        SPAState = {
            pagename: parts[0]
        };
    } else {
        SPAState = {
            pagename: 'Main'
        };
    }

    var bodyStyle = document.getElementById('IPage')
    switch (SPAState.pagename) {
        case 'Main':
            bodyStyle.className='body-menu';
            $('#IPage').load('./pages/menu.html');
            break;
            case 'Fight':
            bodyStyle.className='body-fight';
            $('#IPage').load('./pages/fight.html');
            break;
    }
}

function switchToState(newState) {
    var stateStr = newState.pagename;
    location.hash = stateStr;
}

function switchToMainPage() {
    switchToState({
        pagename: 'Main'
    });
}

function switchToAboutPage() {
    switchToState({
        pagename: 'Fight'
    });
}

switchToStateFromURLHash();