const musicsData = [
  { title: "Solar", artist: "Betical", id: 1 },
  { title: "Electric-Feel", artist: "TEEMID", id: 2 },
  { title: "Aurora", artist: "SLUMB", id: 3 },
  { title: "Lost-Colours", artist: "Fakear", id: 4 },
];

const playBtn= document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const shuffleBtn = document.querySelector('#shuffle');
const audio = document.querySelector('#myAudio');

playBtn.addEventListener('click', playAudio);

function playAudio() {
  if(myAudio.paused) {
      audio.play();
      playBtn.querySelector('img').src = 'ressources/icons/pause-icon.svg'
      playBtn.querySelector('img').alt = 'pause-icon'
  } else {
    audio.pause();
    playBtn.querySelector('img').src = 'ressources/icons/play-icon.svg'
    playBtn.querySelector('img').alt = 'play-icon'
  }
}

audio.addEventListener('loadedmetadata' , handleChangeMetadata)
window.addEventListener('load' , handleChangeMetadata)
const totalDuration = document.querySelector('.total-duration');
const currentTime = document.querySelector('.current-time');

function handleChangeMetadata(e){
  showDuration(audio.duration , totalDuration);
  showDuration(audio.currentTime , currentTime);
}

function showDuration(durationMediaEl , el){
  let durationMinute = Math.floor(durationMediaEl / 60);
  let remainingSecond = Math.floor(durationMediaEl % 60)
  remainingSecond = remainingSecond < 10 ? "0" + remainingSecond : remainingSecond;

  el.textContent =  durationMinute + ":" + remainingSecond;
}

audio.addEventListener('timeupdate', onTimeUpdate)

function onTimeUpdate(){
  showDuration(audio.currentTime , currentTime);
  updateProgressBar(audio.currentTime , audio.duration , progressBar)

  if(audio.ended) {
    audio.currentTime = 0;
    playBtn.querySelector('img').src = 'ressources/icons/play-icon.svg'
    playBtn.querySelector('img').alt = 'play-icon'
  }
}

const track = document.querySelector('.track');
const progressBar = track.querySelector('.progressBar');

function updateProgressBar(currentTime , totalDuration , el){
    el.style.width = `${(currentTime / totalDuration ) * 100}%`
}

track.addEventListener('click', changeCurrentTime)

function changeCurrentTime(e){
  let trackRect = track.getBoundingClientRect();
  let progressBarRect = progressBar.getBoundingClientRect();
  let progressBarPosition = (e.clientX - progressBarRect.left) + 2
  let progressBarWidth = Math.floor((progressBarPosition / trackRect.width )*100)
  let currentTime = (progressBarWidth * audio.duration) / 100;
  audio.currentTime = currentTime;
  console.log(audio.currentTime)
  console.log(audio.duration)
  updateProgressBar(audio.currentTime , audio.duration , progressBar)

}