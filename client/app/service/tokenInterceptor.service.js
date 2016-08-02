export default function TokenInterceptor($q, $window) {
  "ngInject";

  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.id_token) {
        config.headers['Authorization'] = 'JWT ' + $window.sessionStorage.id_token;
      }

      return config || $q.when(config);
    },

    response: function (response) {
      return response || $q.when(response);
    }
  };
}
