export default class MapCircle {

  constructor(map, $mdDialog) {
    this.map = map;
    this.$mdDialog = $mdDialog;
    this.enabled = false;
  }

  toggle() {
    this.enabled = !this.enabled;

    if (this.enabled) {
      this.showAlertSample('Click on map to put circle');
      this.on();
    } else {
      this.off();
    }
  }

  on() {
    this.map.on({
      click: this.addCircle
    }, this);
  }

  off() {
    this.map.off({
      click: this.addCircle
    }, this);
  }

  addCircle(e) {
    L.circle(e.latlng, this.randomInteger(50, 1000), {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(this.map)
      //.bindPopup("Dron covered area, video will start now")
      .on('click', (mEvent) => {
        this.showAlertSample('This is message from circle: ' + JSON.stringify(e.latlng));
      });
  }

  showAlertSample(msg) {
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .parent(angular.element(document.getElementById('map-main')))
        .clickOutsideToClose(true)
        .title('Interesting fact...')
        .textContent(msg)
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        //.targetEvent(ev)
    );
  }

  randomInteger(min, max) {
    var rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
  }
}
