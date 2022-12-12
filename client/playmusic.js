const music = new Audio("/audio/1.mp3");

const songs = [
    {
        id: 1,
        songName: `Song 1 <br> 
        <div class="subtitle">Artists 1</div>`,
        poster: "img/1.png"
    },
    {
        id: 2,
        songName: `Song 2 <br> 
        <div class="subtitle">Artists 1</div>`,
        poster: "img/2.png"
    }
]

Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    // e.getElementsByTagName('img')[0].src = songs[i].poster;
    // e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;

});

let masterPlay = document.getElementById('masterPlay');


masterPlay.addEventListener('click', ()=>{
    if (music.paused || music.currentTime <= 0) {
        music.play();
        // TODO: the button cannot change , should fix this
        masterPlay.classList.remove("play_btn");
        masterPlay.classList.add("/img/pause.png");
    } else {
        music.pause();
        //TODO: the button also should change back here
    }
})