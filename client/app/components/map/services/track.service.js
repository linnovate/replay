export default class TrackService {

  constructor(map, dashjs) {
    this.map = map;
    this.dashJSrv = dashjs;
    this.init();
    this._group = new L.FeatureGroup();
    this._group.addTo(this.map);
  }

  init() {
    this.dashJSrv.player.on(this.dashJSrv.dashjs.MediaPlayer.events['PLAYBACK_METADATA_LOADED'], (e) => {
      if (_.isEmpty(this.dashJSrv.view.textTracks)) return;

      console.debug('PLAYBACK_METADATA_LOADED', e);

      var textTrack = this.dashJSrv.view.textTracks[0],
        data,
        poly,
        cPoint,
        startPosition,
        path = [];

      textTrack.mode = 'hidden';
      _.each(textTrack.cues, (cue) => {
        data = JSON.parse(cue.text);
        poly = data.sensorTrace.coordinates[0];
        cPoint = this.getLatLngCenter(poly);
        if (!startPosition) {
          startPosition = [poly[0][1], poly[0][0]];
        }
        path.push(cPoint);
        console.debug('cPoint', JSON.stringify(cPoint, null, 4));
      });
      this.map.panTo(startPosition);
      console.debug('path', JSON.stringify(path, null, 4));

      L.polyline(path, {color: 'red'}).addTo(this._group);

      textTrack.oncuechange = function() {
        var cue = this.activeCues[0];
        // console.debug('activeCues', cue);
      };

    });
  }

  rad2degr(rad) { return rad * 180 / Math.PI; }
  degr2rad(degr) { return degr * Math.PI / 180; }

  getLatLngCenter(latLngInDegr) {
    var LATIDX = 1;
    var LNGIDX = 0;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i=0; i<latLngInDegr.length; i++) {
      var lat = this.degr2rad(latLngInDegr[i][LATIDX]);
      var lng = this.degr2rad(latLngInDegr[i][LNGIDX]);
      // sum of cartesian coordinates
      sumX += Math.cos(lat) * Math.cos(lng);
      sumY += Math.cos(lat) * Math.sin(lng);
      sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);

    return ([this.rad2degr(lat), this.rad2degr(lng)]);
  }
}
