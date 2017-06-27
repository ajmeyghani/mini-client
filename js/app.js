import angular from 'angular';

const app = angular.module('app', ['ui.router']);

app.config(($stateProvider) => {
  const helloState = {
    name: 'hello',
    url: '/hello',
    template: `<page title="'Mini Client'"></page>`,
  };

  const aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>',
  };

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});


export default app;
