import app from './app';
import template from './happy.tpl.html';
app.directive('happy', function() {
  return {
    restrict: 'E',
    template: template,
  };
});
