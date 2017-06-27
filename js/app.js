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
    template: '<h1>This is a button</h1><button>Hello</button>',
  };

  $stateProvider.state(homeState);
  $stateProvider.state(buttons);
});

export default app;
