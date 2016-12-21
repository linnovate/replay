import './querySaver.styl';
import _ from 'lodash';

export default function ($mdPanel, QuerySaverService) {
  "ngInject";

  var
    data;

  function showMenu(ev, el) {
    var position, config;

    position = $mdPanel.newPanelPosition()
      .relativeTo(el)
      .addPanelPosition($mdPanel.xPosition.ALIGN_START,
        $mdPanel.yPosition.BELOW);

    config = {
      attachTo: angular.element(document.body),
      controller: PanelMenuCtrl,
      controllerAs: 'ctrl',
      template: require('./querySaver.html'),
      panelClass: 'query-saver-panel md-whiteframe-1dp',
      position: position,
      locals: {
        'data': data,
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

        QuerySaverService.getItems()
          .then((result) => {
            data = result;
            showMenu(event, el, attr.querySaver);
          });
      });

      scope.$on('$destroy', function () {
        el.unbind('click');
      });
    }
  }
}

function PanelMenuCtrl(mdPanelRef, QuerySaverService, $timeout) {
  "ngInject";

  this._mdPanelRef = mdPanelRef;
  this.querySaverSrv = QuerySaverService;
  this._timeout = $timeout;

  this.saveDelay = 500;
  this.saveSemafor = false;
}

// PanelMenuCtrl.prototype.addToList = function (listId, mission) {
//   var idx = this.selected.indexOf(listId);
//   // is currently selected
//   if (idx > -1) {
//     this.selected.splice(idx, 1);
//
//     if (!this.saveSemafor) {
//       this.saveSemafor = true;
//
//       this._timeout(() => {
//         this._mdPanelRef.close();
//
//         this.querySaverSrv.deleteMission(listId, mission).then((result) => {
//           this.saveSemafor = false;
//         });
//       }, this.saveDelay);
//     }
//   } else {
//     // is newly selected
//     this.selected.push(listId);
//
//     if (!this.saveSemafor) {
//       this._timeout(() => {
//         this._mdPanelRef.close();
//
//         this.querySaverSrv.addMission(listId, mission).then((result) => {
//           this.saveSemafor = false;
//         });
//       }, this.saveDelay);
//     }
//
//   }
// };
//
// PanelMenuCtrl.prototype.createPlaylist = function () {
//   this.querySaverSrv.addPlaylistDlg((result) => {
//   })
// };
