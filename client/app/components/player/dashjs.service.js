import dashjsLib from 'dashjs';
const  playerID = 'video-player';

export default class dashJS {

  constructor(safeApply) {
    "ngInject";

    this.safeApply = safeApply;
    this.dashjs = dashjsLib;
    this.visible = false;
  }

  init(url, autoPlay = false) {
    this.player = this.dashjs.MediaPlayer().create();
    this.player.initialize(document.getElementById(playerID), url, autoPlay);
  }

  setVisible(visible) {
      this.visible = visible;
      this.safeApply();
  }

  close() {
    this.player.reset();
    this.setVisible(false);
  }



}
