import angular from 'angular';
import filterFormComponent from './filterForm.component';
import filterSelectbox from './filterSelectbox/filterSelectbox';
import filterNumInterval from './filterNumInterval/filterNumInterval';
import filterGraphicButton from './filterGraphicButton/filterGraphicButton';
import filterTimeRange from './filterTimeRange/filterTimeRange';
import FilterFormService from './filterForm.service';
import QuerySaverService from './querySaver/querySaver.service';
import querySaver from './querySaver/querySaver.directive';

let filterFormModule = angular.module('filterForm', [
  filterSelectbox.name,
  filterNumInterval.name,
  filterTimeRange.name,
  filterGraphicButton.name
])
  .directive({querySaver})
  .service({FilterFormService})
  .service({QuerySaverService})
  .component('filterForm', filterFormComponent);

export default filterFormModule;
