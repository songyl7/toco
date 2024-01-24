const mongoose = require("mongoose");
const request = require("supertest");
const { app, server } = require("../index");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeAll(done => {
    mongoose.connect(process.env.MONGO_ATLAS_URL);
    done();
});

/* Closing database connection after each test. */
afterAll(done => {
    mongoose.connection.close();
    server.close();
    done();
});

describe("transactions endpoint", () => {
    it("should return all transactions", async () => {
        const res = await request(app).get("/api/transactions");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should not post a transaction because of invalid senderId", async () => {
        const res = await request(app)
            .post('/api/transactions')
            .send({
                senderId: 98765,
                receiverId: 32455,
                balance: 40
            });
        expect(res.statusCode).toBe(400);
    });

    it("should not post a transaction because of low balance", async () => {
        const res = await request(app)
            .post('/api/transactions')
            .send({
                senderId: 1,
                receiverId: 2,
                balance: 100000
            });
        expect(res.statusCode).toBe(400);
    });
});