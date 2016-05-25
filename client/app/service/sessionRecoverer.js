export default function SessionRecoverer($q, $window, $injector) {
  "ngInject";

  return {
    responseError: function (response) {
      console.log('response', response);
      // Session has expired
      if (response.status == 401 && gapi && gapi.auth2.getAuthInstance().currentUser.get().isSignedIn()){
        console.log('inside responseError!');
        var $http = $injector.get('$http');

        $window.sessionStorage.id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;

        return $http(response.config);
      }

      return $q.reject(response);
    }
  }
}
