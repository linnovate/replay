import MaplayoutModule from './maplayout'
import MaplayoutController from './maplayout.controller';
import MaplayoutComponent from './maplayout.component';
import MaplayoutTemplate from './maplayout.html';

describe('Maplayout', () => {
  let $rootScope, makeController;

  beforeEach(window.module(MaplayoutModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new MaplayoutController();
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
      expect(MaplayoutTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = MaplayoutComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(MaplayoutTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(MaplayoutController);
      });
  });
});
