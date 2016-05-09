import angular from 'angular';
import Home from './home/home';
import Feature1 from './feature1/feature1';
import MapLayout from './maplayout/maplayout';
import Map from './map/map';
import Search from './search/search';
import VideoPanel from './videoPanel/videoPanel';
import Player from './player/player';
import userLoginPage from './userLoginPage/userLoginPage';

let componentModule = angular.module('app.components', [
  Home.name,
  Feature1.name,
  Player.name,
  MapLayout.name,
  Map.name,
  Search.name,
  VideoPanel.name,
  userLoginPage.name,
]);

export default componentModule;
