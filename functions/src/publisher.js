class Publisher {
    constructor(admin) {
        this.messaging = admin.messaging();
    }

    send(token, data) {
        const payload = {
            notification: {
                title: data.title,
                body: data.body
            },
            token: token
        };
        return this.messaging.send(payload);
    }
}

module.exports = Publisher;