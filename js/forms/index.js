import template from './index.tpl.html';

/**
 * The buttons component
 * @param  {Object} app an angular module object instance.
 */
export default function(app) {
  app.component('forms', {
    template: template,
    controller() {
      this.$onInit = function() {
        console.log('forms init.');
      };
    },
  });
}
