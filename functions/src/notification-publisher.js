class NotificationPublisher {
    constructor(admin) {
        this.admin = admin;
        this.tokens = [];
    }

    send(data) {
        return this.admin.database().ref(`notificationTokens`).once('value')
            .then((snapshot) => {
                this.tokens = Object.keys(snapshot.val());
                const payload = {
                    notification: {
                        title: data.title,
                        body: data.body
                    }
                };
                return this.admin.messaging().sendToDevice(this.tokens, payload);
            }).then((status) => {
                return this._handleStatus(status);
            }).catch((err) => {
                err.code = 500;
                throw err;
            });
    }

    _handleStatus(status) {
        const internalErr = [];
        return new Promise((resolve, reject) => {
                status.forEach((result, i) => {
                    if (result.error) {
                        console.error('Failure sending notification to', this.tokens[i], result.error);
                        internalErr.push(this.tokens[i]);
                    }
                });
                if (internalErr.length !== 0) {
                    const err = new Error();
                    err.code = 500;
                    err.message = {
                        error: internalErr
                    }
                    return reject(err);
                }
                return resolve();
            });
}
}

module.exports = NotificationPublisher;