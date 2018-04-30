To triiger a notification

```
curl -X POST -H "Content-Type: application/json" -d '{"title":"ruben","body":"is working"}' https://us-central1-crewatworkfrontend.cloudfunctions.net/publishNotification/api/v1/action
```