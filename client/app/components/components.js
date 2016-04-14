import angular from 'angular';
import Home from './home/home';
import Feature1 from './feature1/feature1';
import About from './about/about';

let componentModule = angular.module('app.components', [
  Home.name,
  Feature1.name,
  About.name
]);

export default componentModule;
