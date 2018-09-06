'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get(`/test`, controller.home.test);
  router.get('/logout', controller.login.logout)
  router.post('/login/github', controller.login.githubLogin);
  router.resources('state', '/state', controller.state);
};
