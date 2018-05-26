const ErrCode = {
    UNKNOWN: {status:500, code: 1, name: 'UNKNOWN'},
    ACTION_INVALID: {status: 400, code: 2, name: 'ACTION_INVALID'},
    TONEN_UNAVAILABLE: {status: 200, code: 10, name: 'TOKEN_UNAVAILABLE'},
    TOKEN_OVERWRITING: {status: 400, code: 11, name: 'TOKEN_OVERWRITING'},
};

module.exports = ErrCode;