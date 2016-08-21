import FilterNumIntervalModule from './filterNumInterval'
import FilterNumIntervalController from './filterNumInterval.controller';
import FilterNumIntervalComponent from './filterNumInterval.component';
import FilterNumIntervalTemplate from './filterNumInterval.html';

describe('FilterNumInterval', () => {
  let $rootScope, makeController;

  beforeEach(window.module(FilterNumIntervalModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new FilterNumIntervalController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(FilterNumIntervalTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = FilterNumIntervalComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(FilterNumIntervalTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(FilterNumIntervalController);
      });
  });
});
