var recaptcha = require('express-recaptcha');
recaptcha.init(require('../config.js').public_key, require('../config.js').secret_key);

module.exports.recaptcha = recaptcha;