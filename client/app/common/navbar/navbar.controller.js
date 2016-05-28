class NavbarController {

  constructor($mdSidenav, MapService) {
    "ngInject";

    this.map = MapService;
    this.$mdSidenav = $mdSidenav;
  }


  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

}

export default NavbarController;
