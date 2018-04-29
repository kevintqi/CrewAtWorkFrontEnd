const RequestValidator  = {
    validate(req) {
        return new Promise((resolve, reject) => {
            if (req.method !== 'POST') {
                reject(this._methodError(req.method));
            }
            const contentType = req.get('content-type');
            if (contentType !== 'application/json') {
                reject(this._contentTypeError(contentType));
            }
            if (req.path !== '/api/v1/action') {
                reject( this._pathError(req.path));
            }
            resolve(req.body);
        });
    },
    _methodError(method) {
        const err = new Error();
        err.code = 405;
        err.message = {
            error: `invalid method ${method}`
        }
        return err;
    },
    _contentTypeError(contentType) {
        const err = new Error();
        err.code = 415;
        err.message = {
            error: `invalid content-type ${contentType}`
        }
        return err;
    },
    _pathError(path) {
        const err = new Error();
        err.code = 404;
        err.message = {
            error: `invalid path ${path}`
        }
        return err;
    }
};

module.exports = RequestValidator;