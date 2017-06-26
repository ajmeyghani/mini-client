import template from './index.tpl.html';
/**
 * [description]
 * @param  {[type]} app [description]
 */
export default function(app) {
  app.component('piko', {
    template: template,
    bindings: {
      name: '=',
    },
  });
}
