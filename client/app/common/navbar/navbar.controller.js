class NavbarController {

  constructor($mdSidenav, MapService, VideoService) {
    "ngInject";

    this.map = MapService;
    this.$mdSidenav = $mdSidenav;
    this.videoSrv = VideoService;
  }


  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

}

export default NavbarController;
