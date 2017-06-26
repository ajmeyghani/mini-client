import angular from 'angular';
import app from './app';

import page from './page';
page(app);

angular.element(document).ready(() => {
  angular.bootstrap(document.getElementsByTagName('html')[0], [app.name]);
});
