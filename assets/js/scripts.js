// Getting DOM references from the index page

const skipForward = document.getElementById('skip-forward');
const fastForward = document.getElementById('fast-forward');
const skipBack = document.getElementById('skip-back');
const progress = document.getElementById('progress');
const repeat = document.getElementById('repeat');
const rewind = document.getElementById('rewind');
const volume = document.getElementById('volume');
const music = document.getElementById('music');
const play = document.getElementById('play');

// Adding event listenners for the actions buttons

play.addEventListener('click', playMusic);
repeat.addEventListener('click', activeLoopMusic);

// Player status (paused or playing)

let isMusicPlaying = false;

// Repeat button status

let isRepeatEnable = false;

// ======= Player functions =======

// Play/Pause the music

function playMusic() {

    if (play.getAttribute('src') == './assets/img/buttons/play-circle.svg') {
        play.setAttribute('src', './assets/img/buttons/pause-circle.svg');
        play.setAttribute('title', 'Pausar');
    } else {
        play.setAttribute('src', './assets/img/buttons/play-circle.svg');
        play.setAttribute('title', 'Reproduzir');

    }

    if (!isMusicPlaying) {
        music.play();
    } else {
        music.pause();
    }

    isMusicPlaying = !isMusicPlaying;

}

// Update the current time progress

music.addEventListener("timeupdate", function() {

    let duration = (music.duration / 60).toFixed(2).replace('.', ':');
    let timer = music.currentTime;

    progress.innerHTML = `00:00 / ${duration}`;
});


// Enable/Disable loop music

function activeLoopMusic() {
    if (!isRepeatEnable) {
        music.loop = true;
        repeat.setAttribute('src', './assets/img/buttons/repeat-active.svg');
    } else {
        music.loop = false;
        repeat.setAttribute('src', './assets/img/buttons/repeat.svg');
    }
    isRepeatEnable = !isRepeatEnable;
}