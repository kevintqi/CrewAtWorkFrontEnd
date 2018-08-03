# Cloud Function - Voice Assistant Helpers

## Assistant Management
Register/enable or disable/remove notifications from Beca-Assistant to a device (as identified by a `token`) for a user (as identified by `userId`).
 
```
curl -i -X POST -H "Content-Type: application/json" -d '{"action":"disable","data": {"userId":"userIdVal", "role":"manager", "token":"tokenVal"}}'  https://us-central1-crewatworkfrontend.cloudfunctions.net/assistantManagement
http://localhost:5001/crewatworkfrontend/us-central1/assistantManagement
```
```
validAction = ['enable', 'forceEnable', 'disable']
```
The `enable` action may not succeed if an currently enabled device is already registered by the user. In which case, a status code `400` will be returned with the following message
```
statusMessage: {
    code: 11,
    name: 'TOKEN_OVERWRITING'
}
```
To overwrite the current enabled device, use the action `forceEnable`.

## Assistant Invocation
Start Beca-Assistant with a custom event named `BECA_WELCOME` for a user (as identified by `userId`).

```
curl -i -X POST -H "Content-Type: application/json" -d '{"event":{"name":"BECA_WELCOME", "data":{"userId":"userIdVal", "role":"manager"}}}' https://us-central1-crewatworkfrontend.cloudfunctions.net/assistantInvocation

```
```
validEventName = ['BECA_WELCOME']
```

## Intent Fulfilment
Fulfil an intent triggered from Beca-Assistant. The request and the response conform the requirement of the DialogFlow Fulfiment. However, it is assumed that the request has the following properties.

```
{
    body : {
        queryResult: {
            action: "some-action-string",
            parameters: {
                userId: "userIdVal",
                otherParameters: ".."
            }
        }
    }
}
```
The request is processed and formed as a notification.
```
{
    title: queryResult.action,
    body: stringified queryResult.parameters
}
```
 The notification is then sent to the device that the user (as identified as `userId`) previous registered and enabled. 