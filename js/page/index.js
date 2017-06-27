import template from './index.tpl.html';

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
