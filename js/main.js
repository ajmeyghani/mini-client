import angular from 'angular';
import app from './app';

import page from './page';
page(app);

import piko from './piko';
piko(app);

import tinto from './tinto';
tinto(app);

angular.element(document).ready(() => {
  angular.bootstrap(document.getElementsByTagName('html')[0], [app.name]);
});
