export default class commentService {

  constructor($resource, ENV) {
    "ngInject";

    this.$resource = $resource;
    this.Comment = $resource(ENV.API_URL+'/comment/:id', { id: '@id' }, {
      'update': { method:'PUT' }
    });
    this.list = [];
  }

  getAll() {
    this.list = this.Comment.query();
    return this.list.$promise;
  }

  add(item) {
    if (item && item.name && item.text) {
      new this.Comment(item).$save((saved) => {
        this.list.push(saved);
      });
    }
  }

  remove(item) {
    this.list = this.list.filter((comment) => {
      if (comment === item) {
        item.$delete(function () {
          return false;
        })
      } else return true;
    });
  }

  update(item) {
    console.log(item);
    item.$update(function () {
    })
  }

}
