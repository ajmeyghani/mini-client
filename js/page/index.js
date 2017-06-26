import template from './index.tpl.html';
/**
 * [description]
 * @param  {[type]} app [description]
 */
export default function(app) {
  app.directive('happy', function() {
    return {
      restrict: 'E',
      template: template,
    };
  });
}
