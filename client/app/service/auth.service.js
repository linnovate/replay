export default class AuthService {

  constructor($auth, $rootScope, $state) {
    "ngInject";

    this.$auth = $auth;
    this.$state = $state;
    this.$rootScope = $rootScope;

    this._stateLogin = 'loginPage';
    this._stateAfterLogout = 'loginPage';
    this._stateAfterLogin = 'auth.map';
  }

  authenticate(name, userData) {
    var promise = this.$auth.authenticate(name, userData);

    promise.then((response) => {
      this.$rootScope.$emit('user:login', response);
      this.$state.go(this._stateAfterLogin);
    });

    return promise;
  }

  isAuthenticated() {
    return this.$auth.isAuthenticated();
  }

  logout() {
    this.$auth.logout().then(() => {
      var state = this.$state.current;
      if (state.data && state.data.requiredLogin) {
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

}
