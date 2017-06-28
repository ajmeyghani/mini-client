import angular from 'angular';

const app = angular.module('app', ['ui.router']);

app.config(($stateProvider, $locationProvider) => {
  $locationProvider.html5Mode(true);

  const homeState = {
    name: 'home',
    url: '/',
    component: 'home',
    resolve: {
      title: function(dataService, $transition$) {
        return dataService.getData();
      },
    },
  };

  const buttons = {
    name: 'buttons',
    url: '/buttons',
    component: 'buttons',
  };

  const tables = {
    name: 'tables',
    url: '/tables',
    component: 'tables',
  };

  const grid = {
    name: 'grid',
    url: '/grid',
    component: 'grid',
  };


  $stateProvider.state(homeState);
  $stateProvider.state(buttons);
  $stateProvider.state(tables);
  $stateProvider.state(grid);
});

export default app;
