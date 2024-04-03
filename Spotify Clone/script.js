console.log("Welcome to Spotify")

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let masterSongName = document.getElementById(`masterSongName`);
let songItems = Array.from(document.getElementsByClassName(`songItem`));

let songs = [
    { songName: "Alan Walker (Faded)", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Alan Walker (The Spectre)", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DJ Assassin (Frag Out)", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Ahrix (Nova)", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Deaf Kev (Invincible)", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Elektronomia (Sky High)", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Cartoon (On & On)", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Alan Walker (Force)", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Lost Sky (Dreams)", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Elektronomia (Energy)", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
]

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        songInfo.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        songInfo.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName(`songitemPlay`)).forEach((element) => {
        element.classList.add(`fa-circle-play`);
        element.classList.remove(`fa-circle-pause`);
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause')
    })
}

Array.from(document.getElementsByClassName(`songitemPlay`)).forEach((element) => {
    element.addEventListener(`click`, (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove(`fa-circle-play`);
        e.target.classList.add(`fa-circle-pause`);
        audioElement.src = `Songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        element.classList.add(`fa-circle-pause`);
        element.classList.remove(`fa-circle-play`);
    
    })
})

document.getElementById(`next`).addEventListener(`click`, () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    element.classList.add(`fa-circle-pause`);
    element.classList.remove(`fa-circle-play`);

})

document.getElementById(`previous`).addEventListener(`click`, () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    element.classList.add(`fa-circle-pause`);
    element.classList.remove(`fa-circle-play`);
})

