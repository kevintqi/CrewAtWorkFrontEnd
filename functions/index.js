const functions = require('firebase-functions');
const admin = require("firebase-admin");
const Subscriber = require('./src/subscriber')
const Publisher = require('./src/publisher');
// const serviceAccount = require("./service-account.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://crewatworkfrontend.firebaseio.com"
// });
admin.initializeApp();

const subscriber = new Subscriber(admin);
const publisher = new Publisher(admin);
exports.intentFulfillment = functions.https.onRequest((req, res) => {
    console.log(req.headers);
    console.log(req.body);
    subscriber.getToken(req.body.userId)
    .then((token) => {
        const data = {
            title: req.body.queryResult.action,
            body: JSON.stringify(req.body.queryResult.parameters)
        }
        return publisher.send(token, data);
    }).then(() => {
        return res.status(200).end();
    }).catch((err) => {
        console.log(err);
        if (err.statusCode === 200) {
            return res.status(200).end();
        }
        return res.json({
            'fulfillmentText': 'Oops! Something went wrong.'
        });
    });
});

exports.assistantManagement = functions.https.onRequest((req, res) => {
    subscriber.handleToken(req.body)
    .then(() => {
        return res.status(200).send().end();
    })
    .catch((err) => {
        console.log(err);
        return res.status(err.statusCode).send(err.statusMessage).end();
    });
});