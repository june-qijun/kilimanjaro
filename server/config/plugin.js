'use strict';

// had enabled by egg
// exports.static = true;

module.exports.passport = {
    enable: false,
    package: 'egg-passport',
};

module.exports.passportGithub = {
    enable: false,
    package: 'egg-passport-github',
};

exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};

exports.cors = {
    enable: true,
    package: 'egg-cors',
};
