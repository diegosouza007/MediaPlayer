// Getting DOM references from the index page

const openPlaylistBtn = document.getElementById('open__modal');
const playlistModal = document.querySelector('.playlist__modal');
const closeModalBtn = document.querySelector('.close__modal');
const skipForward = document.getElementById('skip-forward');
const fastForward = document.getElementById('fast-forward');
const playlistLi = document.querySelector('.playlist');
const thumbnail = document.getElementById('thumbnail');
const skipBack = document.getElementById('skip-back');
const progress = document.getElementById('progress');
const released = document.getElementById('released');
const repeat = document.getElementById('repeat');
const rewind = document.getElementById('rewind');
const volume = document.getElementById('volume');
const musicName = document.getElementById('musicName');
const singer = document.getElementById('singer');
const music = document.getElementById('music');
const play = document.getElementById('play');

// Adding event listenners for the actions buttons

fastForward.addEventListener('click', fastForwardMusic);
openPlaylistBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
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
        name: "Superhero",
        singer: "Unknown Brain (feat. Chris Linton)",
        released: "2016",
        duration: "03:02",
        file: "./assets/songs/Unknown-Brain-Superhero-_feat.-Chris-Linton_-_NCS-Release_.ogg",
        cover: "./assets/img/thumbnails/unkown-brain-super-hero.webp"
    },
    {
        name: "On & On (feat. Daniel Levi) [NCS Release]",
        singer: "Cartoon",
        released: "2015",
        duration: "03:28",
        file: "./assets/songs/Cartoon-On-On-feat-Daniel-Levi-NCS-Release.ogg",
        cover: "./assets/img/thumbnails/cartoon-on-on.webp"
    },
    {
        name: "We Are [NCS Release]",
        singer: "Jo Cohen & Sex Whales",
        released: "2016",
        duration: "03:57",
        file: "./assets/songs/Jo-Cohen-Sex-Whales-We-Are-NCS-Release.ogg",
        cover: "./assets/img/thumbnails/We-Are-Jo-Cohen.webp"
    },
    {
        name: "Cradles [NCS Release]",
        singer: "Sub Urban",
        released: "2019",
        duration: "03:29",
        file: "./assets/songs/Sub-Urban-Cradles-NCS-Release.ogg",
        cover: "./assets/img/thumbnails/Sub-Urban-Cradles.webp"
    },
    {
        name: "Heroes Tonight [NCS Release]",
        singer: "Janji feat Johnning",
        released: "2015",
        duration: "03:28",
        file: "./assets/songs/Janji-Heroes-Tonight-feat-Johnning-NCS-Release.ogg",
        cover: "./assets/img/thumbnails/janji-heroes.webp"
    }
]



// ========== Player functions ========== //

// Update the current time progress

music.addEventListener("timeupdate", function() {
    let totalDuration = convertTimerMusic(music.duration);
    let progressTimer = convertTimerMusic(music.currentTime);

    progress.innerHTML = `${progressTimer} / ${totalDuration}`;
});

// Change to the next music after ends actual music in progress

music.addEventListener("ended", () => nextMusic());

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

// Salt to the next music

function nextMusic() {

    track++;

    if (track >= playlist.length) {
        location.reload();
    }

    thumbnail.src = playlist[track].cover;
    musicName.innerHTML = playlist[track].name;
    singer.innerHTML = playlist[track].singer;
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
    musicName.innerHTML = playlist[track].name;
    singer.innerHTML = playlist[track].singer;
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
        repeat.setAttribute('title', 'Repetição ativada');
    } else {
        music.loop = false;
        repeat.setAttribute('src', './assets/img/buttons/repeat.svg');
        repeat.setAttribute('title', 'Ativar repetição');
    }

    isRepeatEnable = !isRepeatEnable;
}

function convertTimerMusic(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}

function toggleModal() {
    playlistModal.classList.toggle('active');
}

playlist.forEach(element => {
    playlistLi.innerHTML += `<li class="song">${element.name} - ${element.singer}<span>${element.duration}</span>`;
});