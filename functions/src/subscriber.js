class Subscriber {
    constructor(admin) {
        this.admin = admin;
        this.tokens = [];
    }

    getTokens() {
        return this.admin.database().ref('notificationTokens/userid').once('value')
            .then((snapshot) => {
                if (snapshot.val()) {
                    this.tokens = Object.values(snapshot.val());
                } 
                console.log(JSON.stringify(this.tokens));
                return this.tokens;
            });
    }
}

module.exports = Subscriber;