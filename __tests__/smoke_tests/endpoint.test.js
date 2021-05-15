const app = require("../../app");
const supertest = require("supertest");

// creates request to test endpoints
const request = supertest(app);

describe("Execute some smoke tests", () => {
  
    // Sends GET request to /test endpoint
    it("Gets the test endpoint", async done => {
        const res = await request.get("/test");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('pass!');
        done()

    });
    
    // Sends GET request to the root route /
    it("Gets the test endpoint", async done => {
        const res = await request.get("/");
        expect(res.status).toBe(200);
        done()
    });
  
  });