// Getting DOM references from the index page

const play = document.getElementById('play');
const music = document.getElementById('music')

// Adding event listenners for the buttons

play.addEventListener('click', playMusic);

// Player state (paused or playing)

let status = false;

// Player functions

function playMusic() {

    if (play.getAttribute('src') == './assets/img/buttons/play-circle.svg') {
        play.setAttribute('src', './assets/img/buttons/pause-circle.svg');
    } else {
        play.setAttribute('src', './assets/img/buttons/play-circle.svg');
    }

    if (!status) {
        music.play();
    } else {
        music.pause();
    }

    status = !status;

}