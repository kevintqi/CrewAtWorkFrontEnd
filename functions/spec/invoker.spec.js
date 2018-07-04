const Invoker = require('../src/invoker');
const Requester = require('../src/requester');
const options = require('../src/assistant-option.json');

describe("Invoker", () => {
    describe("constructor", () => {
        it("should create Requester", (done) => {
            const invoker = new Invoker();
            expect(invoker.requester).toEqual(any(Requester));
            done();
        });
        it("should create Requester with assitant-option", (done) => {
            spyOn(Requester, 'newRequester');
            const invoker = new Invoker();
            expect(Requester.newRequester).toHaveBeenCalledWith(options);
            done();
        });
    });
    describe("trigger", () => {
        it("should send event through Requester", (done) => {
            const invoker = new Invoker();
            spyOn(invoker.requester, 'send').andReturn(Promise.resolve({
                statusCode: 200,
                body: ""
            }));
            const event = {
                "name": "event_name",
                "data": {
                    "userId": "userIdVal",
                    "role": "manager"
                }
            };
            invoker.trigger(event);
            const data = {
                "event": event,
                "timezone": "America/Los_Angeles",
                "lang": "en",
                "sessionId": "1321321"
            };
            expect(invoker.requester.send).toHaveBeenCalledWith(JSON.stringify(data));
            done();
        });
    });
});