const dashjs = require('dashjs');
/**
 * @type { videojs.default }
 */
const videojs = require('video.js');

const dashPlayer = dashjs.MediaPlayer().create();
const video = document.querySelector('#videoplayer');
const url = 'https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd';

dashPlayer.initialize(video, url, false);
dashPlayer.updateSettings({ streaming: { abr: { autoSwitchBitrate: false } } });
dashPlayer.on('streamInitialized', () => {
    const qualities = dashPlayer.getBitrateInfoListFor('video');
    const qualityIndex = qualities[0].qualityIndex; // lowest
    // // const qualityIndex = qualities[qualities.length - 1].qualityIndex; // highest
    dashPlayer.setQualityFor('video', qualityIndex);

    const videojsOptions = {
        controls: true,
        autoplay: true,
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

    const vjsPlayer = videojs(video, videojsOptions);
    const MenuButton = videojs.getComponent('MenuButton');
    const menuButton = new MenuButton(vjsPlayer);

    const Menu = videojs.getComponent('Menu');
    const menu = new Menu(vjsPlayer, { menuButton });

    const MenuItem = videojs.getComponent('MenuItem');

    const QualityMenuItem = videojs.extend(MenuItem, {
        constructor: function (player, options) {
            this.qualityIndex = options.qualityIndex;
            MenuItem.call(this, player, options);
        },

        handleClick: function (event) {
            MenuItem.prototype.handleClick.call(this, event);
            console.log(this.qualityIndex);
            dashPlayer.setQualityFor('video', this.qualityIndex);
        }
    });

    for (const quality of qualities) {
        const menuItem1 = new QualityMenuItem(vjsPlayer, { label: quality.bitrate, qualityIndex: quality.qualityIndex });
        menu.addItem(menuItem1);
    }

    menuButton.addChild(menu);

    vjsPlayer.controlBar.addChild(menuButton);
});
