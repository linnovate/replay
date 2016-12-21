import './addToPlaylist.styl';
import _ from 'lodash';

export default function ($mdPanel, PlayListService) {
  "ngInject";

  var
    playlistData,
    selected = [];

  function showMenu(ev, el, mission) {
    var position, config;

    selected = [];
    _.each(playlistData, (item) => {
      _.each(item.missions, (mission) => {
        if (mission._id == mission._id) selected.push(item._id);
      })
    });

    position = $mdPanel.newPanelPosition()
      .relativeTo(el)
      .addPanelPosition($mdPanel.xPosition.ALIGN_START,
        $mdPanel.yPosition.BELOW);

    config = {
      attachTo: angular.element(document.body),
      controller: PanelMenuCtrl,
      controllerAs: 'ctrl',
      template: require('./addToPlaylist.html'),
      panelClass: 'add-to-playlist-panel md-whiteframe-1dp',
      position: position,
      locals: {
        'selected': selected,
        'playlistData': playlistData,
        'mission': mission,
      },
      openFrom: ev,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: false,
      zIndex: 2
    };

    $mdPanel.open(config).then((result) => {
      angular.element(result.panelEl[0].querySelector('input[type="search"]')).focus();
    });
  }

  return {
    link: function (scope, el, attr) {
      el.bind('click', function (event) {

        PlayListService.getPlaylist()
          .then((result) => {
            playlistData = result;
            showMenu(event, el, attr.addToPlaylist);
          });
      });

      scope.$on('$destroy', function () {
        el.unbind('click');
      });
    }
  }
}

function PanelMenuCtrl(mdPanelRef, PlayListService, $timeout) {
  "ngInject";

  this._mdPanelRef = mdPanelRef;
  this.playlistSrv = PlayListService;
  this._timeout = $timeout;

  this.saveDelay = 500;
  this.saveSemafor = false;
}

PanelMenuCtrl.prototype.addToList = function (listId, mission) {
  var idx = this.selected.indexOf(listId);
  // is currently selected
  if (idx > -1) {
    this.selected.splice(idx, 1);

    if (!this.saveSemafor) {
      this.saveSemafor = true;

      this._timeout(() => {
        this._mdPanelRef.close();

        this.playlistSrv.deleteMission(listId, mission).then((result) => {
          this.saveSemafor = false;
        });
      }, this.saveDelay);
    }
  } else {
    // is newly selected
    this.selected.push(listId);

    if (!this.saveSemafor) {
      this._timeout(() => {
        this._mdPanelRef.close();

        this.playlistSrv.addMission(listId, mission).then((result) => {
          this.saveSemafor = false;
        });
      }, this.saveDelay);
    }

  }
};

PanelMenuCtrl.prototype.createPlaylist = function () {
  this.playlistSrv.addPlaylistDlg((result) => {
  })
};
