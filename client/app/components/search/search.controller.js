class SearchController {

  constructor(VideoService) {
    "ngInject";

    this.name = 'search';
    this.videoSrv = VideoService;
  }

  setActiveRow($event) {
    if ($event.target) {
      var tr = angular.element($event.target).parent();
      tr.parent().find('tr').removeClass('active');
      tr.addClass('active');
    }

  }

  $onInit() {
      this.videoSrv.query();
  }

}

export default SearchController;
