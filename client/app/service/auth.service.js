export default class AuthService {

  constructor($auth, $rootScope, $state) {
    "ngInject";

    this.$auth = $auth;
    this.$state = $state;
    this.$rootScope = $rootScope;

    this._stateLogin = 'loginPage';
    this._stateAfterLogout = 'home';
    this._stateChangeBypass = false;
    this.$rootScope.$on('$stateChangeStart', this.stateChange.bind(this));
  }

  authenticate(name, userData) {
    var promise = this.$auth.authenticate(name, userData);

    promise.then((response) => {
      this.$rootScope.$emit('user:login', response);
    });

    return promise;
  }

  isAuthenticated() {
    return this.$auth.isAuthenticated();
  }

  logout() {
    this.$auth.logout().then(() => {
      var state = this.$state.current;
      if (state.data && state.data.access && state.data.access.requiredLogin) {
        this.$state.go(this._stateAfterLogout);
      }

      this.$rootScope.$emit('user:logout');
    });
  }

  onLogin(callback) {
    return this.$rootScope.$on('user:login', callback);
  }

  onLogout(callback) {
    return this.$rootScope.$on('user:logout', callback);
  }

  stateChange(event, toState, toParams, fromState, fromParams, options) {
    if (this._stateChangeBypass ||
      (!toState.data || !toState.data.access || !toState.data.access.requiredLogin)) {
      this._stateChangeBypass = false;
      return;
    }

    event.preventDefault();

    if (this.isAuthenticated()) {
      this._stateChangeBypass = true;
      this.$state.go(toState, toParams);
    } else {
      this.$state.go(this._stateLogin);
    }
  }
}
