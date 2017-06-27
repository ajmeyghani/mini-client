/**
 * [description]
 * @param  {[type]} app [description]
 */
export default function(app) {
  app.factory('dataService', function($http, $q) {
    return {
      getData() {
        return $q((r, j) => {
          $http.get('http://localhost:8051/api')
          .then((response) => r(response.data.title))
          .catch((e) => j(e));
        });
      },
    };
  });
}
