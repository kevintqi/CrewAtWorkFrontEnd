To register a token

```
curl -X POST -H "Content-Type: application/json" -d '{"action":"enable","data": {"userId":"userIdVal","token":"tokenVal"}}'  http://localhost:5001/crewatworkfrontend/us-central1/assistantManagement
```
```
validAction = ['enable', 'forceEnable', 'disable']
```