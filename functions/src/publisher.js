class Publisher {
    constructor(admin) {
        this.admin = admin;
        this.tokens = [];
    }

    send(tokens, data) {
        this.tokens = tokens;
        if (this.tokens.length === 0) {
            console.log('No subscriber found');
            return Promise.resolve();
        }
        const payload = {
            notification: {
                title: data.title,
                body: data.body
            }
        };
        return this._sendToDevice(payload);
    }

    _sendToDevice(payload) {
        return this.admin.messaging().sendToDevice(this.tokens, payload)
            .then((status) => {
                return this._handleStatus(status);
            });
    }

    _handleStatus(status) {
        if (this._checkResults(status.results)) {
            throw new Error('failed sending notification to some listeners');
        }
        return Promise.resolve();
    }
    
    _checkResults(results) {
        let errOccured = false;
        results.forEach((result, i) => {    
            if (result.error) {
                console.error('Failure sending notification to', this.tokens[i], result.error);
                errOccured = true;
            }
        });
        return errOccured;
    }
}

module.exports = Publisher;