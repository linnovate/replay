export default class DialogService {

  constructor($mdDialog) {
    "ngInject";

    this.$mdDialog = $mdDialog;
  }

    showAlert(msg, title = 'Interesting fact...', btnCaption = 'OK') {
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .parent(angular.element(document.getElementById('map-main')))
        .clickOutsideToClose(true)
        .title(title)
        .textContent(msg)
        .ariaLabel('Alert')
        .ok(btnCaption)
    );
  }

  showPrompt(title, content = '', placeholder = '', defalutVal = '', btnOk = 'OK', btnCancel = 'Cancel') {
    var confirm = this.$mdDialog.prompt()
      .title(title)
      .textContent(content)
      .placeholder(placeholder)
      .ariaLabel(placeholder)
      .initialValue(defalutVal)
      .ok(btnOk)
      .cancel(btnCancel);

    return this.$mdDialog.show(confirm);
  }

}
