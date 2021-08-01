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
fastForward.addEventListener('click', fastForwardMusic);
rewind.addEventListener('click', rewindMusic);
volume.addEventListener('click', changeVolume);

// Player status (paused or playing)

let isMusicPlaying = false;

// Repeat button status

let isRepeatEnable = false;

// Volume default value

let volumeRate = 1.0;

// ========== Player functions ========== //

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

// Accelerate music speed rate

function fastForwardMusic() {
    music.playbackRate += 0.25;
}

// Decrease music speed rate
function rewindMusic() {
    music.playbackRate -= 0.25;
}

// Change the volume of the music

function changeVolume() {
    switch (volumeRate) {
        case 1.0:
            volumeRate = 0.7;
            music.volume = volumeRate;
            volume.setAttribute('src', './assets/img/buttons/volume-1.svg');
            break;
        case 0.7:
            volumeRate = 0.4;
            music.volume = volumeRate;
            volume.setAttribute('src', './assets/img/buttons/volume.svg');
            break;
        case 0.4:
            volumeRate = 0;
            music.volume = volumeRate;
            volume.setAttribute('src', './assets/img/buttons/volume-x.svg');
            break;
        default:
            volumeRate = 1.0;
            music.volume = volumeRate;
            volume.setAttribute('src', './assets/img/buttons/volume-2.svg');
            break;
    }
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