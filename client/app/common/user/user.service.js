import misc from '../../config/misc';

export default class UserService {

  constructor(gapiLoaded, safeApply) {
    "ngInject";

    console.log('UserSerivce');
    this.safeApply = safeApply;
    gapiLoaded().then(() => {
      gapi.load('auth2', this.initSigninV2.bind(this));
      console.log('promise resolved');
    });
    this.isSignedIn = false;
  }

  initSigninV2() {
    console.log('initSigninV2');
    //this.authInstance = gapi.auth2.getAuthInstance();
    //this.googleUser = this.authInstance.currentUser.get();
    gapi.auth2.init({
      client_id: misc.google.client_id,
      scope: misc.google.scope,
      fetch_basic_profile: true
    }).then((auth) => {
      console.log('auth inited', auth);
      this.authInstance = auth;
      this.googleUser = auth.currentUser.get();
      if (this.isLogged()) {
        // TODO: move to function
        document.getElementById('name').innerText = this.getName();
        this.isSignedIn = true;
        this.safeApply();
      }
      this.attachSignin(document.getElementById('customGglBtn'));
    });
  }

  attachSignin(element) {
    this.authInstance.attachClickHandler(element, {},(googleUser) => {
        this.googleUser = googleUser;
        // TODO: move to function
        document.getElementById('name').innerText = this.getName();
        this.isSignedIn = true;
        this.safeApply();
        console.log('googleUser!', googleUser);
      }, function (error) {
        console.error(error);
      });
  }

  getUser() {
    if (this.authInstance)
      return this.googleUser.getBasicProfile();
  }

  isLogged() {
    return this.googleUser && this.googleUser.isSignedIn();
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

  logout() {
      this.authInstance.signOut().then(() => {
        this.isSignedIn = false;
        this.safeApply();
      })
  }

}
