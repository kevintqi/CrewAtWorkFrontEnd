const functions = require('firebase-functions');
const admin = require("firebase-admin");
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
    console.log(req.body);
    publisher.send(req.body)
        .then(() => {
            return res.status(200).send("ok");
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(err.message);
        });
});

exports.intentFulfillment = functions.https.onRequest((req, res) => {
    console.log(req.body.queryResult);
    const data = {
        title: req.body.queryResult.action,
        body: req.body.queryResult.parameters.squad
    }
    publisher.send(data).then(() => {
            return res.status(200).end();
        })
        .catch((err) => {
            console.log(err);
            return res.json({
                'fulfillmentText': 'Oops! Something went wrong.'
            });
        });
});