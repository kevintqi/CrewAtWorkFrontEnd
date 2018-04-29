const functions = require('firebase-functions');
const admin = require("firebase-admin");
const validator = require('./src/request-validator');
const NotificationPublisher = require('./src/notification-publisher');
// const serviceAccount = require("./service-account.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://crewatworkfrontend.firebaseio.com"
// });
admin.initializeApp();

const publisher = new NotificationPublisher(admin);
// POST /api/v1/action {"title": "title", "body": "body"}
exports.publishNotification = functions.https.onRequest((req, res) => {
    validator.validate(req)
        .then((data) => {
            return publisher.send(data);
        })
        .then(() => {
            return res.status(200).send({
                'status': 'ok'
            });
        })
        .catch((err) => {
                return res.status(err.code).send(err.message);
            }
        );
});