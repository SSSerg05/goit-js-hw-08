import Player from '@vimeo/player';

let playingTime = localStorage.getItem("videoplayer-current-time");
console.log('ls = ', playingTime);
if (!playingTime) { 
  playingTime = 0;
}
console.log('ls = ', playingTime);
  
const iframe = document.querySelector('#vimeo-player')
const player = new Player(iframe);

const onGetTime = function(data) {
    // data is an object containing properties specific to that event
  player.getCurrentTime().then(function (seconds) {
    // seconds = the current playback position
    console.log(seconds);
    localStorage.setItem('videoplayer-current-time', seconds);
  }).catch(function(error) {
    // an error occurred
  });
};

const onSetTime = function(data) {
    // data is an object containing properties specific to that event
  player.setCurrentTime(data).then(function(seconds) {
    // seconds = the actual time that the player seeked to
  }).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
  });
};


player.on('pause', onGetTime);
player.on('timeupdate', onGetTime);
player.on('play', onSetTime(playingTime));
