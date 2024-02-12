import { constants as httpConstants } from "http2";
import supertest from "supertest";

import { createServer } from "http";
import { route } from "../lib/router/router";

const server = createServer(async (req, res) => {
  await route(req, res);
});

const request = supertest(server);

describe("test methods", () => {
  describe("404 error on methods", () => {
    test("404 error on GET", async () => {
      const response = await request.get("/wrong-endpoint");

      expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
    });

    test("404 error on POST", async () => {
      const response = await request
        .post("/wrong-endpoint")
        .send("content");

      expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
    });

    test("404 error on PUT", async () => {
      const response = await request
        .put("/wrong-endpoint")
        .send("content");

      expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
    });

    test("404 error on DELETE", async () => {
      const response = await request.delete("/wrong-endpoint");

      expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
    });
  });
});
