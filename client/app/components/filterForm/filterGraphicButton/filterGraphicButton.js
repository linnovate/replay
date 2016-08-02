import angular from 'angular';
import filterGraphicButtonComponent from './filterGraphicButton.component';

let filterGraphicButtonModule = angular.module('filterGraphicButton', [])
  .component('filterGraphicButton', filterGraphicButtonComponent)
  .config(function ($mdIconProvider) {
    "ngInject";

    $mdIconProvider.iconSet('geometry', require('./assets/geometry.svg'), 128);
  });

export default filterGraphicButtonModule;
