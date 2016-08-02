import moment from 'moment';

class FilterResultController {

  constructor(VideoService) {
    "ngInject";

    this.videoSrv = VideoService;
    this.moment = moment;
  }

  setActiveRow($event) {
    if ($event.target) {
      var tr = angular.element($event.target).parent();
      tr.parent().find('tr').removeClass('active');
      tr.addClass('active');
    }

  }

}

export default FilterResultController;
