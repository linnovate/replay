import dashjsLib from 'dashjs/dash.all.debug';
import ControlBar from 'dashjs/akamai/controlbar/ControlBar.js';
import controlbarCss from 'dashjs/akamai/controlbar/controlbar.css';
const  playerID = 'video-player';

export default class dashJS {

  constructor(safeApply) {
    "ngInject";

    this.safeApply = safeApply;
    this.dashjs = dashjsLib;
    this.visible = false;
    this.ttmlDiv = null;
    this.controlbar = null;
  }

  init(url, autoPlay = false) {
    this.player = this.dashjs.MediaPlayer().create();
    this.player.initialize(document.getElementById(playerID), url, autoPlay);

    this.player.attachVideoContainer(document.getElementById("videoContainer"));
    // Add HTML-rendered TTML subtitles except for Firefox (issue #1164)
    if (typeof navigator !== 'undefined' && !navigator.userAgent.match(/Firefox/)) {
      this.ttmlDiv = document.querySelector("#video-caption");
      this.player.attachTTMLRenderingDiv(this.ttmlDiv);
    }
    this.controlbar = new ControlBar(this.player);
    this.controlbar.initialize();
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
