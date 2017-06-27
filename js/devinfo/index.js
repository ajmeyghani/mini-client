import bowser from 'bowser';
import template from './index.tpl.html';
/**
 * A simple component
 * @param  {Object} app Instance of an Angular module.
 */
export default function(app) {
  app.component('devinfo', {
    template: template,
    bindings: {
      name: '=',
    },
    controller: function() {
      this.explorer = `Running ${bowser.name}, version ${bowser.version}`;
    },
  });
}
