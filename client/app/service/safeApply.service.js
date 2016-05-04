export default function saveApplyService ($rootScope) {
  "ngInject";

  return function (fn) {
    var phase = $rootScope.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if (fn) {
        $rootScope.$eval(fn);
      }
    } else {
      if (fn) {
        $rootScope.$apply(fn);
      } else {
        $rootScope.$apply();
      }
    }
  }

}
