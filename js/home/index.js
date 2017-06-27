import template from './index.tpl.html';

/**
 * The page component
 * @param  {Object} app an angular module object instance.
 */
export default function(app) {
  app.component('home', {
    template: template,
    bindings: {
      title: '<',
    },
    controller() {
      this.$onInit = function() {
        console.log('init.');
      };
    },
  });
}
