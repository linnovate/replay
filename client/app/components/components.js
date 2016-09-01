import angular from 'angular';
import Home from './home/home';
import MapLayout from './maplayout/maplayout';
import Map from './map/map';
import filterResult from './filterResult/filterResult';
import filterForm from './filterForm/filterForm';
import sidebar from './sidebar/sidebar';
import VideoPanel from './videoPanel/videoPanel';
import Player from './player/player';
import userLoginPage from './userLoginPage/userLoginPage';
import playList from './playList/playList';
import playListItems from './playListItems/playListItems';

let componentModule = angular.module('app.components', [
  Home.name,
  Player.name,
  MapLayout.name,
  Map.name,
  filterResult.name,
  filterForm.name,
  VideoPanel.name,
  userLoginPage.name,
  sidebar.name,
  playList.name,
  playListItems.name
]);

export default componentModule;
