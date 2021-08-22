// Getting DOM references from the index page

const playlistModal = document.querySelector('.playlist__modal');
const reduceSpeedButton = document.getElementById('reduce-spd');
const openPlaylistBtn = document.getElementById('playlist-btn');
const closeModalBtn = document.querySelector('.close__modal');
const skipForward = document.getElementById('skip-forward');
const fastForward = document.getElementById('fast-forward');
const playlistLi = document.querySelector('.playlist');
const thumbnail = document.getElementById('thumbnail');
const musicName = document.getElementById('musicName');
const skipBack = document.getElementById('skip-back');
const progress = document.getElementById('progress');
const released = document.getElementById('released');
const seekBar = document.getElementById('seekbar');
const repeat = document.getElementById('repeat');
const volume = document.getElementById('volume');
const singer = document.getElementById('singer');
const music = document.getElementById('music');
const play = document.getElementById('play');

// Adding event listenners for the actions buttons

reduceSpeedButton.addEventListener('click', reduceMusicSpeed);
fastForward.addEventListener('click', fastForwardMusic);
openPlaylistBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
repeat.addEventListener('click', activeLoopMusic);
skipBack.addEventListener('click', previousMusic);
skipForward.addEventListener('click', nextMusic);
volume.addEventListener('click', changeVolume);
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
        name: "On & On [NCS Release]",
        singer: "Cartoon (feat. Daniel Levi)",
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

    seekBar.max = music.duration;
    seekBar.value = music.currentTime;
});

// Change to the next music after ends actual music in progress

music.addEventListener("ended", () => nextMusic());

// Play/Pause the music

function playMusic() {

    if (isMusicPlaying) {
        music.pause();
        play.src = playIconImage;
        play.title = "Reproduzir";
    } else {
        music.play();
        play.src = pauseIconImage;
        play.title = "Pausar";
    }

    isMusicPlaying = !isMusicPlaying;

}

// Accelerate music speed rate

function fastForwardMusic() {
    music.playbackRate += 0.25;
}

// Reduce music speed rate

function reduceMusicSpeed() {
    music.playbackRate -= 0.25;
}

// Change the volume of the music

function changeVolume() {
    switch (volumeRate) {
        case 1.0:
            volumeRate = 0.7;
            music.volume = volumeRate;
            volume.setAttribute('src', './assets/img/buttons/volume-1.svg');
            volume.setAttribute('title', 'Volume: 70%');
            break;
        case 0.7:
            volumeRate = 0.4;
            music.volume = volumeRate;
            volume.setAttribute('src', './assets/img/buttons/volume.svg');
            volume.setAttribute('title', 'Volume: 40%');
            break;
        case 0.4:
            volumeRate = 0;
            music.volume = volumeRate;
            volume.setAttribute('src', './assets/img/buttons/volume-x.svg');
            volume.setAttribute('title', 'Volume mutado');
            break;
        default:
            volumeRate = 1.0;
            music.volume = volumeRate;
            volume.setAttribute('src', './assets/img/buttons/volume-2.svg');
            volume.setAttribute('title', 'Volume: 100%');
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
    play.title = "Pausar";

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

    play.src = pauseIconImage;
    play.title = "Pausar";

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

// Convert the music seconds to minutes format(e.g. 00:00)

function convertTimerMusic(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}

// Show or close the playlist modal

function toggleModal() {
    playlistModal.classList.toggle('active');
}

// Allows the user change seekbar progress value

seekBar.addEventListener('input', function() {
    music.currentTime = seekBar.value;
})

// Insert all musics on the playlist modal page

playlist.forEach(element => {
    playlistLi.innerHTML += `<li class="tracks" id="${playlist.indexOf(element)}">${element.name} - ${element.singer}<span>${element.duration}</span>`;
});


// Allows the user click in a desired music on the playlist and it will be played

const tracks = Array.from(document.querySelectorAll('.tracks'));

tracks.forEach((element) => {
    element.addEventListener("click", function() {

        let musicSelected = element.getAttribute('id');
        track = musicSelected;

        thumbnail.src = playlist[track].cover;
        musicName.innerHTML = playlist[track].name;
        singer.innerHTML = playlist[track].singer;
        released.innerHTML = playlist[track].released;
        music.setAttribute('src', playlist[track].file);

        document.querySelectorAll('.tracks').forEach((e) => {
            e.classList.remove('highlight-music');
        });

        this.classList.add('highlight-music');

        play.src = pauseIconImage;
        play.title = "Pausar";

        music.play();
    });
});

// Change highlight automaticaly when the music change

music.addEventListener("ended", () => {

    document.querySelectorAll('.tracks').forEach((e) => {
        e.classList.remove('highlight-music');
    });

    tracks.forEach((e) => {
        if (e.getAttribute('id') == track) {
            e.classList.add('highlight-music');
        }
    });
});