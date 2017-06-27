import template from './index.tpl.html';
import app from 'app';

import piko from './piko';
piko(app);

/**
 * The page component
 * @param  {Object} app an angular module object instance.
 */
export default function(app) {
  app.component('page', {
    template: template,
    bindings: {
      title: '=',
    },
  });
}
