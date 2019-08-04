const dashjs = require('dashjs');
const videojs = require('video.js');

require('silvermine-videojs-quality-selector')(videojs);

const player = dashjs.MediaPlayer().create();
const video = document.querySelector('#videoplayer');
const url = 'https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd';

player.initialize(video, url, false);
player.updateSettings({ streaming: { abr: { autoSwitchBitrate: false } } });
player.on('streamInitialized', () => {
    const qualities = player.getBitrateInfoListFor('video');
    const qualityIndex = qualities[4].qualityIndex; // lowest
    // const qualityIndex = qualities[qualities.length - 1].qualityIndex; // highest
    player.setQualityFor('video', qualityIndex);
});

const videojsOptions = {
    controls: true,
    autoplay: false,
    controlBar: {
        children: [
            'playToggle',
            'progressControl',
            'volumePanel',
            'qualitySelector',
            'fullscreenToggle',
        ]
    }
};

const v = videojs(video, videojsOptions);