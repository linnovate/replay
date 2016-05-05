export default function gapiLoad($q, $window) {
  "ngInject";

  return function () {
    var deferred = $q.defer();

    $window.gapiLoadedService = function () {
      deferred.resolve();
    };
    return deferred.promise;
  }

}
