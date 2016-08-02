import angular from 'angular';
import UserService from './user.service';
import userComponent from './user.component';

let userModule = angular.module('user', [])
.service('User', UserService)
.component('userLogin', userComponent);

export default userModule;
