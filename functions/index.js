const functions = require('firebase-functions');
const admin = require("firebase-admin");
const corsProxy = require('./src/corsproxy');
const Subscriber = require('./src/subscriber')
const Publisher = require('./src/publisher');
const Invoker = require('./src/invoker');
// const serviceAccount = require("./service-account.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://crewatworkfrontend.firebaseio.com"
// });
admin.initializeApp();

const subscriber = new Subscriber(admin);
const publisher = new Publisher(admin);
const invoker = new Invoker();

exports.assistantManagement = functions.https.onRequest((req, res) => {
    corsProxy(req, res, () => {    
        console.log(req.body);
        subscriber.handleToken(req.body)
        .then(() => {
            return res.status(200).send().end();
        })
        .catch((err) => {
            console.log(err);
            return res.status(err.statusCode).send(err.statusMessage).end();
        });
    });
});

exports.assistantInvocation = functions.https.onRequest((req, res) => {
    corsProxy(req, res, () => {
        invoker.trigger(req.body.event).then((data) => {
            console.log(data);
            return res.status(200).end();
        }).catch((err) => {
            return res.status(err.statusCode).send(err.statusMessage).end();
        });
    });
});

exports.intentFulfillment = functions.https.onRequest((req, res) => {
    console.log(req.body);
    subscriber.getToken(req.body.queryResult.parameters.userId)
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