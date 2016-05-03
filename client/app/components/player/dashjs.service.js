import dashjsLib from 'dashjs';
const  playerID = 'video-player';

export default class dashJS {

  constructor() {

    this.dashjs = dashjsLib;
    this.player = dashjsLib.MediaPlayer().create();
    this.visible = true;

    /*setInterval(() => {
      console.log('service this.visible', this.visible);
    }, 1000);*/
  }

  init(url, autoPlay = false) {
    this.player.initialize(document.getElementById(playerID), url, autoPlay);
  }

  toggleVisibility() {
    this.visible = !this.visible;
  }
}
