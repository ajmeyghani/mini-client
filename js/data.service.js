/**
 * [description]
 * @param  {[type]} app [description]
 */
export default function(app) {
  app.service('dataService', function DataService($q, $http) {
    this.getData = function getData() {
      return $q((r, j) => {
        $http.get('http://localhost:8051/api')
        .then((response) => r(response.data.title))
        .catch((e) => j(e));
      });
    };
  });
}
