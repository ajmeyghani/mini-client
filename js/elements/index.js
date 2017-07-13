import angular from 'angular';
import homeTpl from 'home/index.tpl.html';
import tableTpls from 'tables/index.tpl.html';
import buttonsTpls from 'buttons/index.tpl.html';
import formsTpls from 'forms/index.tpl.html';
import gridTpl from 'grid/index.tpl.html';

const module = angular.module('elements', []);

module.component('home', {
  template: homeTpl,
  bindings: {
    title: '<',
  },
  controller() {
    this.$onInit = function() {
      console.log('init.');
    };
  },
});

module.component('tables', {
  template: tableTpls,
  controller() {
    this.$onInit = function() {
      console.log('tables init.');
    };
  },
});

module.component('buttons', {
  template: buttonsTpls,
  controller() {
    this.$onInit = function() {
      console.log('init.');
    };
  },
});

module.component('forms', {
  template: formsTpls,
  controller() {
    this.$onInit = function() {
      console.log('init.');
    };
  },
});

module.component('grid', {
  template: gridTpl,
  controller() {
    this.$onInit = function() {
      console.log('init.');
    };
  },
});

export default module;
