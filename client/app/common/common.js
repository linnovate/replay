import angular from 'angular';
import Navbar from './navbar/navbar';
import User from './user/user';
import safeApply from '../service/safeApply.service';

let commonModule = angular.module('app.common', [
  Navbar.name,
  User.name
])
.factory({safeApply});

export default commonModule;
