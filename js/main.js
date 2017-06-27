import angular from 'angular';
import app from './app';

import page from './page';
page(app);

import devinfo from './devinfo';
devinfo(app);

angular.element(document).ready(() => {
  angular.bootstrap(document.getElementsByTagName('html')[0], [app.name]);
});
