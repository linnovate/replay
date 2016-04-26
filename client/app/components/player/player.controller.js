import dashjs from 'dashjs/dist/dash.all.debug.js';

class PlayerController {
  constructor() {
    this.name = 'player';
    this.player = dashjs.MediaPlayer().create();
    this.url = "http://178.79.165.97:1935/vod/mp4:sample.mp4/manifest.mpd";
    this.display = false;

    this.init()
  }

  init() {
    this.display = true;
    this.player.initialize(document.querySelector("#videoPlayer"), this.url, true);
  }
}

export default PlayerController;
