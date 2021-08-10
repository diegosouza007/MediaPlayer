// Getting DOM references from the index page

const skipForward = document.getElementById('skip-forward');
const fastForward = document.getElementById('fast-forward');
const thumbnail = document.getElementById('thumbnail');
const skipBack = document.getElementById('skip-back');
const progress = document.getElementById('progress');
const released = document.getElementById('released');
const repeat = document.getElementById('repeat');
const rewind = document.getElementById('rewind');
const volume = document.getElementById('volume');
const singer = document.getElementById('singer');
const music = document.getElementById('music');
const play = document.getElementById('play');
const band = document.getElementById('band');

// Adding event listenners for the actions buttons

fastForward.addEventListener('click', fastForwardMusic);
repeat.addEventListener('click', activeLoopMusic);
skipBack.addEventListener('click', previousMusic);
skipForward.addEventListener('click', nextMusic);
volume.addEventListener('click', changeVolume);
rewind.addEventListener('click', rewindMusic);
play.addEventListener('click', playMusic);


// ========== Global control variables ========== //

// Music status (paused or playing)

let isMusicPlaying = music.ended;

// Repeat button status

let isRepeatEnable = false;

// Default volume value

let volumeRate = 1.0;

// Playlist track index to control musics play order

let track = 0;

// Play button image location

let playIconImage = './assets/img/buttons/play-circle.svg';

// Pause button image location

let pauseIconImage = './assets/img/buttons/pause-circle.svg';

// Get actual image source from play/pause button

let playButton = play.getAttribute('src');

// Array with the songs playlist

const playlist = [{
        singer: "Superhero",
        band: "Unknown Brain (feat. Chris Linton)",
        released: "2016",
        file: "./assets/songs/Unknown-Brain-Superhero-_feat.-Chris-Linton_-_NCS-Release_.ogg",
        cover: "./assets/img/thumbnails/unkown-brain-super-hero.webp"
    },
    {
        singer: "On & On (feat. Daniel Levi) [NCS Release]",
        band: "Cartoon",
        released: "2015",
        file: "./assets/songs/Cartoon-On-On-feat-Daniel-Levi-NCS-Release.ogg",
        cover: "./assets/img/thumbnails/cartoon-on-on.webp"
    },
    {
        singer: "We Are [NCS Release]",
        band: "Jo Cohen & Sex Whales",
        released: "2016",
        file: "./assets/songs/Jo-Cohen-Sex-Whales-We-Are-NCS-Release.ogg",
        cover: "./assets/img/thumbnails/We-Are-Jo-Cohen.webp"
    },
    {
        singer: "Cradles [NCS Release]",
        band: "Sub Urban",
        released: "2019",
        file: "./assets/songs/Sub-Urban-Cradles-NCS-Release.ogg",
        cover: "./assets/img/thumbnails/Sub-Urban-Cradles.webp"
    },
    {
        singer: "Heroes Tonight [NCS Release]",
        band: "Janji feat Johnning",
        released: "2015",
        file: "./assets/songs/Janji-Heroes-Tonight-feat-Johnning-NCS-Release.ogg",
        cover: "./assets/img/thumbnails/janji-heroes.webp"
    }
]

// ========== Player functions ========== //

// Update the current time progress

music.addEventListener("timeupdate", function() {

    let duration = "0" + (music.duration / 60).toFixed(2).replace('.', ':');
    let timer = musicProgressTimer();
    progress.innerHTML = `${timer} / ${duration}`;

    if (music.ended) {
        nextMusic();
    }
});

// Play/Pause the music

function playMusic() {

    if (playButton === pauseIconImage) {
        play.src = playIconImage;
    } else {
        play.src = pauseIconImage;
    }

    if (isMusicPlaying) {
        music.pause();
        play.src = playIconImage;
    } else {
        music.play();
        play.src = pauseIconImage;
    }

    isMusicPlaying = !isMusicPlaying;
}

// Accelerate music speed rate

function fastForwardMusic() {
    music.playbackRate += 0.25;
}

// NEED CORRECTION: CHANGE RATE SPEED FOR REWIND FUNCTION

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

function musicProgressTimer() {

    let minutes = 0;
    let seconds = Math.round(music.currentTime);
    let progress = 0;

    if (seconds < 60) {
        if (seconds < 10) {
            progress = "00:" + "0" + seconds;
        } else {
            progress = "00:" + seconds;
        }
    } else {
        minutes = parseInt(music.currentTime / 60) % 60;
        seconds = parseInt(music.currentTime % 60);

        minutes < 10 ? minutes = "0" + minutes : minutes;
        seconds < 10 ? seconds = "0" + seconds : seconds;

        progress = `${minutes}:${seconds}`;
    }

    return progress;
}

// Salt to the next music

function nextMusic() {

    track++;

    if (track >= playlist.length) {
        location.reload();
    }

    thumbnail.src = playlist[track].cover;
    singer.innerHTML = playlist[track].singer;
    band.innerHTML = playlist[track].band;
    released.innerHTML = playlist[track].released;
    music.setAttribute('src', playlist[track].file);

    play.src = pauseIconImage;

    music.play();
}

// Return to the previously music

function previousMusic() {

    track--;

    if (track < 0) {
        location.reload();
    }

    thumbnail.src = playlist[track].cover;
    singer.innerHTML = playlist[track].singer;
    band.innerHTML = playlist[track].band;
    released.innerHTML = playlist[track].released;
    music.setAttribute('src', playlist[track].file);

    play.rc = pauseIconImage;

    music.play();
}

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