import Player from '@vimeo/player';
let throttle = require('lodash.throttle');

/// for work with localStorage
// Save
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

/// for work with localStorage
// Load
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

export default {
  save,
  load,
};



let playingTime = load("videoplayer-current-time");
if (!playingTime) { 
  playingTime = 0;
}
  
const iframe = document.querySelector('#vimeo-player')
const player = new Player(iframe);

const onGetTime = function(data) {
    // data is an object containing properties specific to that event
  player.getCurrentTime().then(function (seconds) {
    // seconds = the current playback position
    console.log(seconds);

   save('videoplayer-current-time', seconds);

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


player.on('timeupdate', onGetTime, 1000);
player.on('play', onSetTime(playingTime));


