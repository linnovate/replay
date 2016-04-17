export default class Feature1Controller {

  constructor(commentService) {
    "ngInject";

    this.name = 'feature1';
    this.comment = {};
    this.comments = commentService;
    this.comments.getAll();
  }

  submit() {
    if (!this.isEditing) this.comments.add(this.comment);
    else {
      this.comments.update(this.comment);
      this.editFinish();
    }
  }

  removeComment(item) {
    if (!item) return;

    this.comments.remove(item);
    this.editFinish();
  }

  editComment(item) {
    if (!item) return;

    this.comment = item;
    this.isEditing = true;
  }

  editFinish() {
    this.comment = {};
    this.isEditing = false;
  }
}
