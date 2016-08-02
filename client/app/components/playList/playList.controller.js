import _ from 'lodash';

class PlayListController {

  constructor(PlayListService, VideoService) {
    "ngInject";

    this.playList = PlayListService;
    this.videoSrv = VideoService;
  }

  setActiveRow($event) {
    if ($event.target) {
      var tr = angular.element($event.target).parent();
      tr.parent().find('tr').removeClass('active');
      tr.addClass('active');
    }
  }

}

export default PlayListController;
