import angular from 'angular';
import Home from './home/home';
import Feature1 from './feature1/feature1';
import MapLayout from './maplayout/maplayout';
import Map from './map/map';
import Search from './search/search';
import Player from './player/player';

let componentModule = angular.module('app.components', [
  Home.name,
  Feature1.name,
  Player.name,
  MapLayout.name,
  Map.name,
  Search.name,
]);

export default componentModule;
