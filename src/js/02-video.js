import Player from '@vimeo/player';

const throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

if (localStorage.getItem("videoplayer-current-time")) {
    const currentTime = JSON.parse(localStorage.getItem("videoplayer-current-time"));
    player.setCurrentTime(currentTime).then(function() {
    
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            break;

        default:
            break;
    }
});
}

const onPlay = function(data) {
    player.getCurrentTime().then(function(seconds) {
        localStorage.setItem("videoplayer-current-time", JSON.stringify(seconds))
}).catch(function() {
    // an error occurred
});
};

player.on('timeupdate', throttle(onPlay, 1000));
