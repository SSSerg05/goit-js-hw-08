import Player from '@vimeo/player';
import throttle from 'lodash.throttle'
import storage from './storage'

const KEY_STORAGE = "videoplayer-current-time";

const iframe = document.querySelector('#vimeo-player')
const player = new Player(iframe);

const onGetTime = function(data) {
    // data is an object containing properties specific to that event
  player.getCurrentTime().then(function (seconds) {
    // seconds = the current playback position
    // console.log(seconds);
    storage.save(KEY_STORAGE, seconds);

  }).catch(function(error) {
    // an error occurred
  });
};

const onSetTime = function(time) {
    // data is an object containing properties specific to that event
  player.setCurrentTime(time).then(function(seconds) {
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

const setTime = () => {
  let playingTime = storage.load(KEY_STORAGE);
  if (!playingTime) { 
    playingTime = 0;
  }
  onSetTime(playingTime);
}

player.on('timeupdate', throttle(onGetTime, 1000));
player.on('play', setTime);


