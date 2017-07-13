import angular from 'angular';
import app from 'app';

import dataService from 'data.service';
dataService(app);

import home from 'home';
home(app);

import container from 'container';
container(app);

import buttons from 'buttons';
buttons(app);

import tables from 'tables';
tables(app);

import grid from 'grid';
grid(app);

import forms from 'forms';
forms(app);

import devinfo from 'devinfo';
devinfo(app);

angular.element(document).ready(() => {
  angular.bootstrap(document.getElementsByTagName('html')[0], [app.name]);
});
