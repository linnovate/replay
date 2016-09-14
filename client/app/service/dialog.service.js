export default class DialogService {

  constructor($mdDialog) {
    "ngInject";

    this.$mdDialog = $mdDialog;
  }

  /**
   * Show alert dialog
   * @param msg
   * @param title
   * @param btnCaption
   */
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

  /**
   * Show prompt dialog
   * @param title
   * @param content
   * @param placeholder
   * @param defalutVal
   * @param btnOk
   * @param btnCancel
   * @returns {*|void}
   */
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

  /**
   * Show confirm dialog
   * @param title
   * @param content
   * @param ariaLabel
   * @param btnOk
   * @param btnCancel
   */
  showConfirm(title, content = '', ariaLabel = '', btnOk = 'OK', btnCancel = 'Cancel') {
    var confirm = this.$mdDialog.confirm()
      .title(title)
      .textContent(content)
      .ariaLabel(ariaLabel)
      .ok(btnOk)
      .cancel(btnCancel);

    return this.$mdDialog.show(confirm);
  }

}
