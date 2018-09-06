'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1535863423479_1738';

  // add your config here
  config.middleware = ['login'];
  config.login = {
    enable: true,
    ignore: /\/$|\/login|\/logout/
  }

  config.static = {
    prefix: '/myworld/',
    dir: path.join(appInfo.baseDir, 'web')
  }

  config.passportGithub = {
    key: '3ef56cc0eabe1f73c4b0',
    secret: '68e86b8debc8e835ff15f339b807604a8d6f2c57'
  };

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://127.0.0.1:9001'],
  };

  config.cors = {
    credentials: true
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/myworld',
      options: {},
    },
  };

  return config;
};
