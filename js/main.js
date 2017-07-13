import angular from 'angular';
import app from 'app';

import dataService from 'data.service';
dataService(app);

import container from 'container';
container(app);

import devinfo from 'devinfo';
devinfo(app);

angular.element(document).ready(() => {
  angular.bootstrap(document.getElementsByTagName('html')[0], [app.name]);
});
