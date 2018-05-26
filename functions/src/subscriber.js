const ErrCode = require('./errcode');
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
        return this._getToken(userId).then((val) => {
            if (val) {
                return val;
            }
            throw ErrCode.TONEN_UNAVAILABLE;
        });
    }

    handleToken(input) {
        const action = this.actionTable[input.action];
        if (action) {
            return action(input.data);
        }
        throw ErrCode.ACTION_INVALID;
    }

    _getToken(userId) {
        return this.database.ref(`${this.subscriberKey}/${userId}`).once('value')
            .then((snapshot) => {
                return snapshot.val();
            });
    }

    _enableToken(data) {
        return this._getToken(data.userId).then((val) => {
            if (val) {
                throw ErrCode.TOKEN_OVERWRITING;
            }
            return this._forceEnableToken(data);
        });
    }

    _forceEnableToken(data) {
        return this.database.ref(`${this.subscriberKey}/${data.userId}/`).set(data.token);
    }

    _disableToken(data) {
        return this.database.ref(`${this.subscriberKey}/${data.userId}/`).remove();
    }
}

module.exports = Subscriber;