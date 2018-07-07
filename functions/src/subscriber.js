const ErrCode = require('./errcode');
const btoa = require('btoa');

class Subscriber {
    constructor(admin) {
        this.database = admin.database();
        this.subscriberKey = 'assistantUser';
        this.actionTable = {
            enable : (data) => this._enableToken(data),
            forceEnable : (data) => this._forceEnableToken(data),
            disable: (data) => this._disableToken(data)
        }
    }

    getToken(userId) {
        if (!userId) {
            return Promise.reject(ErrCode.TONEN_UNAVAILABLE);
        }
        return this._getToken(userId).then((val) => {
            if (val) {
                return val;
            }
            return Promise.reject(ErrCode.TONEN_UNAVAILABLE);
        });
    }

    handleToken(input) {
        const action = this.actionTable[input.action];
        if (action) {
            return action(input.data);
        }
        return Promise.reject(ErrCode.ACTION_INVALID);
    }

    _getToken(userIdStr) {
        const userId = btoa(userIdStr);
        return this.database.ref(`${this.subscriberKey}/${userId}`).once('value')
            .then((snapshot) => {
                return snapshot.val();
            });
    }

    _enableToken(data) {
        return this._getToken(data.userId).then((val) => {
            if (val) {
                return Promise.reject(ErrCode.TOKEN_OVERWRITING);
            }
            return this._forceEnableToken(data);
        });
    }

    _forceEnableToken(data) {
        const userId = btoa(data.userId);
        return this.database.ref(`${this.subscriberKey}/${userId}/`).set(data.token);
    }

    _disableToken(data) {
        const userId = btoa(data.userId);
        return this.database.ref(`${this.subscriberKey}/${userId}/`).remove();
    }
}

module.exports = Subscriber;