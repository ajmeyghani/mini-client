import bowser from 'bowser';
import template from './index.tpl.html';
/**
 * A simple component
 * @param  {Object} app Instance of an Angular module.
 */
export default function(app) {
  app.component('devinfo', {
    template: template,
    controller() {
      this.explorer = `Runnig ${bowser.name}, version ${bowser.version}`;
    },
  });
}
