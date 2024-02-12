import supertest from "supertest";
import { v4 as uuid } from "uuid";
import { constants as httpConstants } from "http2";
import { createServer } from "http";
import { route } from "../lib/router/router";

const server = createServer(async (req, res) => {
  await route(req, res);
});

const request = supertest(server);
describe("GET/users", () => {
  test("returns empty list", async () => {
    const response = await request.get("/api/users");

    expect(response.status).toBe(httpConstants.HTTP_STATUS_OK);
    expect(response.body).toEqual([]);
  });
});

describe("POST /user/:id", () => {
  test("should create user", async () => {
    const mockUser = {
      username: "test",
      age: 96,
      hobbies: ["my 40 cats"],
    };

    const response = await request.post("/api/users").send(mockUser);
    expect(response.status).toBe(httpConstants.HTTP_STATUS_CREATED);
  });

  test("returns 404 error if user not found", async () => {
    const response = await request.get(`/users/${uuid()}`);

    expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
  });
});
