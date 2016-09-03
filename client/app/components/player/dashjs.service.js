import dashjsLib from 'dashjs/dash.all.debug';
import ControlBar from 'dashjs/akamai/controlbar/ControlBar.js';
import controlbarCss from 'dashjs/akamai/controlbar/controlbar.css';
const  playerID = 'video-player';

export default class dashJS {

  constructor(safeApply, $rootScope) {
    "ngInject";

    this.safeApply = safeApply;
    this.dashjs = dashjsLib;
    this.visible = false;
    this.ttmlDiv = null;
    this.controlbar = null;
    this.player = this.dashjs.MediaPlayer().create();
    this.inited = false;
    this.$rootScope = $rootScope;
  }

  init(url, autoPlay = false) {
    if (!this.inited) {
      this.view = document.getElementById(playerID);
      this.player.initialize(this.view, url, autoPlay);
      this.player.attachVideoContainer(document.getElementById("videoContainer"));
      // Add HTML-rendered TTML subtitles except for Firefox (issue #1164)
      if (typeof navigator !== 'undefined' && !navigator.userAgent.match(/Firefox/)) {
        this.ttmlDiv = document.querySelector("#video-caption");
        this.player.attachTTMLRenderingDiv(this.ttmlDiv);
      }
      this.controlbar = new ControlBar(this.player);
      this.controlbar.initialize();

      this.inited = true;
    } else {
      this.player.attachSource(url);
      this.player.play();
    }

    this.$rootScope.$emit('dashjs:init', 'dashjs:inited');
    this.setVisible(true);
  }

  setVisible(visible) {
      this.visible = visible;
      this.safeApply();
  }

  close() {
    this.player.pause();
    this.setVisible(false);
    this.$rootScope.$emit('dashjs:close', 'dashjs:closed');
  }



}
