const corsProxy = require('cors')({
    'origin': '*',
    'methods': 'POST',
    'credentials': true,
    'preflightContinue': false,
    'optionsSuccessStatus': 204
});

module.exports = corsProxy;