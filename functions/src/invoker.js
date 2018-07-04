const Requester = require('./requester');
const options = require('./assistant-option.json');
const ErrCode = require('./errcode');

class Invoker {
    constructor() {
        this.requester = Requester.newRequester(options);
    }
    
    trigger(event) {
        const dataStr = this._buildData(event);
        return this.requester.send(dataStr)
            .then((data) => {
                return data.body;
            })
            .catch((err) => {
                console.log(err);
                return Promise.reject(ErrCode.INVOCATION_FAILURE);
            });
    }

    _buildData(event) {
        const data = {};
        data.event = event;
        data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        data.lang = 'en';
        data.sessionId = '1321321';
        return JSON.stringify(data);
    }
}

module.exports = Invoker;