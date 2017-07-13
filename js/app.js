import angular from 'angular';
import elements from 'elements';

const app = angular.module('app', ['ui.router', elements.name]);

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

  const demo = {
    name: 'demo',
    url: '/demo/:element',
    template: '<container></container>',
  };

  $stateProvider.state(homeState);
  $stateProvider.state(demo);
});

export default app;
