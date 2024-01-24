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

describe("users endpoint", () => {
    it("should return all users", async () => {
        const res = await request(app).get("/api/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should return a user", async () => {
        const res = await request(app).get(
            "/api/users/1"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].id).toBe(1);
    });

    it("should not post a user because of existing id", async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                id: 1,
                balance: 40
            });
        expect(res.statusCode).toBe(400);
    });
});