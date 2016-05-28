class NavbarController {

  constructor($mdSidenav) {
    "ngInject";

    this.$mdSidenav = $mdSidenav;
  }


  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

}

export default NavbarController;
