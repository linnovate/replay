import misc from '../../config/misc';
import gapi from 'gapi';

export default class UserService {

  constructor() {
    gapi.load('auth2', this.initSigninV2.bind(this));
  }

  initSigninV2() {
    gapi.auth2.init().then((auth) => {
      this.authInstance = auth;
      this.googleUser = auth.currentUser.get();
    });
  }

  getUser() {
    if (this.authInstance)
      return this.googleUser.getBasicProfile();
  }

  isLogged() {
    return this.googleUser && this.googleUser.isSignedIn.get();
  }

  getEmail() {
    if (this.authInstance)
      return this.googleUser.getBasicProfile().getEmail();
  }

  getName() {
    if (this.authInstance)
      return this.googleUser.getBasicProfile().getName();
  }

  getIdToken() {
    if (this.authInstance)
      return this.googleUser.getAuthResponse().id_token;
  }

}
