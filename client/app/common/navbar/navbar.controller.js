class NavbarController {

  constructor($mdSidenav, MapService, MissionService) {
    "ngInject";

    this.map = MapService;
    this.$mdSidenav = $mdSidenav;
    this.missionSrv = MissionService;
  }


  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

}

export default NavbarController;
