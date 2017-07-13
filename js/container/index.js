import angular from 'angular';

/**
 * The buttons component
 * @param  {Object} app an angular module object instance.
 */
export default function(app) {
  app.directive('container', function() {
    return {
      restrict: 'E',
      scope: {},
      template: '',
      controller: function($state, $scope, $compile) {
        this.componentName = $state.params.element;
        this.$compile = $compile;
      },
      controllerAs: 'containerCtrl',
      link: function(scope, elm, attr, ctrl) {
        let newScope = scope.$new(true, scope);
        newScope = angular.merge(newScope, {
          name: ctrl.componentName,
        });
        const html = `<${ctrl.componentName}></${ctrl.componentName}>`;
        const node = ctrl.$compile(html)(newScope);
        elm.append(node);
      },
    };
  });
}
