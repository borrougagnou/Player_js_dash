const shaka = require('shaka-player/dist/shaka-player.ui.js');

// https://shaka-player-demo.appspot.com/docs/api/tutorial-ui.html

var manifestUri =
    'https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd';

async function init() {
    // When using the UI, the player is made automatically by the UI object.
    const video = document.getElementById('video');
    const ui = video['ui'];
    const controls = ui.getControls();
    const player = controls.getPlayer();

    // Listen for error events.
    player.addEventListener('error', onPlayerErrorEvent);
    controls.addEventListener('error', onUIErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
        await player.load(manifestUri);
        // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded!');
    } catch (error) {
        onPlayerError(error);
    }
}

function onPlayerErrorEvent(errorEvent) {
    // Extract the shaka.util.Error object from the event.
    onPlayerError(event.detail);
}

function onPlayerError(error) {
    // Handle player error
    console.error('Error code', error.code, 'object', error);
}

function onUIErrorEvent(errorEvent) {
    // Extract the shaka.util.Error object from the event.
    onPlayerError(event.detail);
}

function initFailed() {
    // Handle the failure to load
    console.error('Unable to load the UI library!');
}

// Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.
document.addEventListener('shaka-ui-loaded', init);
// Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
// to load (e.g. due to lack of browser support).
document.addEventListener('shaka-ui-load-failed', initFailed);
