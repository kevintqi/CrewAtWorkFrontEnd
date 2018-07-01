const ErrCode = {
    UNKNOWN: {
        statusCode: 500,
        statusMessage: {
            code: 1,
            name: 'UNKNOWN'
        }
    },
    ACTION_INVALID: {
        statusCode: 400,
        statusMessage: {
            code: 2,
            name: 'ACTION_INVALID'
        }
    },
    INVOCATION_FAILURE: {
        statusCode: 500,
        statusMessage: {
            code: 3,
            name: 'INVOCATION_FAILURE'
        }
    },
    TONEN_UNAVAILABLE: {
        statusCode: 200,
        statusMessage: {
            code: 10,
            name: 'TOKEN_UNAVAILABLE'
        }
    },
    TOKEN_OVERWRITING: {
        statusCode: 400,
        statusMessage: {
            code: 11,
            name: 'TOKEN_OVERWRITING'
        }
    }
};

module.exports = ErrCode;