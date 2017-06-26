import template from './index.tpl.html';
/**
 * A simple component
 * @param  {Object} app Instance of an Angular module.
 */
export default function(app) {
  app.component('piko', {
    template: template,
    bindings: {
      name: '=',
    },
  });
}
