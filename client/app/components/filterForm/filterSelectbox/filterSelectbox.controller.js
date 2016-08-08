import _ from 'lodash';

class FilterSelectboxController {

  constructor($resource, ENV) {
    "ngInject";

    this.options = [];
    this.value = '';
    this.rSource = $resource(ENV.API_URL+'/source/:id', { id: '@id' });
    this.rTag = $resource(ENV.API_URL+'/tag/:id', { id: '@id' });
    this.multiple = false;

    switch (this.controlType) {
      case 'source':
        this.getSources().then((result) => {
          _.each(result, (item) => {
            this.options.push({
              name: item.sourceName,
              value: item.sourceID
            });
          });
        });
        break;

      case 'tag':
        this.multiple = true;

        this.getTags().then((result) => {
          _.each(result, (item) => {
            this.options.push({
              name: item.title,
              value: item._id
            });
          });
        });
        break;

      default:
        this.options = [
          { name: 'wildcamps.com', value: 'wildcamps.com' },
          { name: 'supercamps.com', value: 'supercamps.com' },
          { name: 'megacamps.com', value: 'megacamps.com' },
          { name: 'coolcamps.com', value: 'coolcamps.com' }
        ];
    }
  }

  changed() {
    this.onChange({
      controlType:  this.controlType,
      value:        this.value
    });
  }

  removeFilter(controlType) {
    this.onRemove({
      controlType:  controlType
    });
  }

  getSources() {
    return this.rSource.query({}).$promise;
  }

  getTags() {
    return this.rTag.query({}).$promise;
  }

}

export default FilterSelectboxController;
