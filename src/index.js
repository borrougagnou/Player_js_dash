const dashjs = require('dashjs');

const player = dashjs.MediaPlayer().create();
const video = document.querySelector('#videoplayer');
const url = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd";

player.initialize(video, url, true);
player.updateSettings({ streaming: { abr: { autoSwitchBitrate: false } } })
player.on('streamInitialized', () => {
    const qualities = player.getBitrateInfoListFor('video');
    const qualityIndex = qualities[0].qualityIndex; // lowest
    // const qualityIndex = qualities[qualities.length - 1].qualityIndex; // highest
    player.setQualityFor('video', qualityIndex);
});
