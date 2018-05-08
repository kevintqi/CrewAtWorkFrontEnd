class Subscriber {
    constructor(admin) {
        this.admin = admin;
    }

    getTokens() {
        return this.admin.database().ref(`notificationTokens`).once('value')
            .then((snapshot) => {
                return Object.keys(snapshot.val());
            });
    }
}

module.exports = Subscriber