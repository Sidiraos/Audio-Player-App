const musicsData = [
  { title: "Solar", artist: "Betical", id: 1},
  { title: "Electric-Feel", artist: "TEEMID", id: 2 },
  { title: "Aurora", artist: "SLUMB", id: 3 },
  { title: "Lost-Colours", artist: "Fakear", id: 4 },
];

const playBtn= document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const shuffleBtn = document.querySelector('#shuffle');
const audio = document.querySelector('#myAudio');
// get metadata form the audio element
audio.addEventListener('loadedmetadata' , handleChangeMetadata)
audio.addEventListener('loadeddata' , handleChangeMetadata)
window.addEventListener('load' , handleChangeMetadata)
const totalDuration = document.querySelector('.total-duration');
const currentTime = document.querySelector('.current-time');
// handle play pause events
playBtn.addEventListener('click', playPauseToggle);
playBtn.addEventListener('play', playPauseToggle);
function playPauseToggle() {
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
// show total duration
function handleChangeMetadata(e){
  showDuration(audio.duration , totalDuration);
  showDuration(audio.currentTime , currentTime);
  audio.removeEventListener('loadedmetadata', handleChangeMetadata)
  window.removeEventListener('loadmetadata', handleChangeMetadata)
}

function showDuration(durationMediaEl , el){
  let durationMinute = Math.floor(durationMediaEl / 60);
  let remainingSecond = Math.floor(durationMediaEl % 60)
  remainingSecond = remainingSecond < 10 ? "0" + remainingSecond : remainingSecond;

  el.textContent =  durationMinute + ":" + remainingSecond;
}
// update currenttime
audio.addEventListener('timeupdate', onTimeUpdate)
function onTimeUpdate(){
  showDuration(audio.currentTime , currentTime);
  updateProgressBar(audio.currentTime , audio.duration , progressBar)

  if(audio.ended) {
    audio.currentTime = 0;
    playBtn.querySelector('img').src = 'ressources/icons/play-icon.svg'
    playBtn.querySelector('img').alt = 'play-icon';
    // add infinite loop for playist music when is finished is play and replay the next music
    if(i < musicsData.length) {
      handleNextBtnClick();
    }
  }
}
// update progress bar && handle trackBar
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
}
// handle title , artist and current id of the track
const title = document.querySelector('.title-name');
const artist = document.querySelector('.artist-name');
const currentId = document.querySelector('.order-list');
const thumbImg = document.querySelector('#thumb img');
const audioSrc = audio.querySelector('source');

let i = 0;
showInformations ();

function showInformations () {
  title.textContent = musicsData[i].title;
  artist.textContent = musicsData[i].artist;
  currentId.textContent = musicsData[i].id + '/' + musicsData.length;
  thumbImg.src = `ressources/thumbs/${musicsData[i].title}.png`;
  thumbImg.alt = `${musicsData[i].title} thumbnail`;
  audio.src = `ressources/music/${musicsData[i].title}.mp3`;
  audio.addEventListener('loadedmetadata' , handleChangeMetadata)
  audioSrc.src =`ressources/music/${musicsData[i].title}.mp3`;
  console.log(title, artist, thumbImg, audioSrc)

}
// event nextBtn
nextBtn.addEventListener('click', handleNextBtnClick);
function handleNextBtnClick() {
  i++;
  if(i === musicsData.length){
    i = 0
  }
  showInformations()
  playPauseToggle()
}
// event previousBtn
prevBtn.addEventListener('click', handlePreviousBtnClick);
function handlePreviousBtnClick() {
  i--
  if(i < 0) {
    i = musicsData.length-1
  }
  showInformations()
  playPauseToggle()

  return
}
