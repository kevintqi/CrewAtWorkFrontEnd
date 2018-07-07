To register a token

```
curl -i -X POST -H "Content-Type: application/json" -d '{"action":"enable","data": {"userId":"userIdVal", "role":"manager", "token":"tokenVal"}}'  http://localhost:5001/crewatworkfrontend/us-central1/assistantManagement
```
```
validAction = ['enable', 'forceEnable', 'disable']
```

```
curl -i -X POST -H "Content-Type: application/json" -d '{"event":{"name":"event_name", "data":{"userId":"userIdVal", "role":"manager"}}}' http://localhost:5001/crewatworkfrontend/us-central1/assistantInvocation
```
```
validEventName = ['WELCOME']
```
