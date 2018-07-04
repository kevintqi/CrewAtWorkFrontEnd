const https = require('https');

class Requester {
    static newRequester(options) {
        return new Requester(options);
    }

    constructor(options) {
        this.options = options;
    }
    
    send(data) {
        return new Promise((resolve, reject) => {
            const req = https.request(this.options, (res) => {
                return this._buildRes(res, resolve, reject);
            });
            req.on('error', (err) => {
                return reject(err);
            });
            req.write(data);
            req.end();
        });
    }

    _buildRes(res, resolve, reject) {
        let body = [];
        res.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            const data = {
                statusCode: res.statusCode,
                body: body
            };    
            if (res.statusCode === 200) {
                return resolve(data);
            } 
            return reject(data);
        });
    }
}

module.exports = Requester;