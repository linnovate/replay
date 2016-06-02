class UserController {

  constructor(User) {
    "ngInject";

    this.user = User;
    this.attachedSignin = false;

    this.user.authInitialize().then(() => {
      var atObjs = document.querySelectorAll('.customGPlusSignIn');
      this.user.attachSignin(atObjs);
    });
  }
}

export default UserController;
