const playerContainer = document.querySelector('.player-container');
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressBarArea = document.getElementById('progress-bar-area');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');

// Song List
const songs = [
    {
        title: 'Dynamite',
        artist: 'BTS',
        audioSrc: 'music/song1.mp3', 
        imageSrc: 'images/art1.jpg' 
    },
    {
        title: 'Stay Gold',
        artist: 'BTS',
        audioSrc: 'music/song2.mp3',
        imageSrc: 'images/art2.jpg'
    },
    {
        title: 'Butter',
        artist: 'BTS',
        audioSrc: 'music/song3.mp3',
        imageSrc: 'images/art3.jpg'
    }
    // Add more songs as needed
];

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(song) {
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audio.src = song.audioSrc;
    albumArt.src = song.imageSrc;
}

// Play Song
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    audio.play();
}

// Pause Song
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    audio.pause();
}

// Play/Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0; // Loop back to the first song
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1; // Loop back to the last song
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress Bar
function updateProgress(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for time
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        if (durationSeconds) { // Avoid NaN
            durationSpan.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Set Volume
function setVolume() {
    audio.volume = volumeSlider.value;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong); // Play next song when current one ends
progressBarArea.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);

// Initial Load Song
loadSong(songs[songIndex]);