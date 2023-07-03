import { constants as httpConstants } from "http2";
import supertest from "supertest";
import { server } from "../src";

const request = supertest(server);

describe("test methods", () => {
  describe("404 error on methods", () => {
    test("404 error on GET", async () => {
      const response = await request.get("/non-existent/endpoint");

      expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
    });

    test("404 error on POST", async () => {
      const response = await request
        .post("/non-existent/endpoint")
        .send("content");

      expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
    });

    test("404 error on PUT", async () => {
      const response = await request
        .put("/non-existent/endpoint")
        .send("content");

      expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
    });

    test("404 error on DELETE", async () => {
      const response = await request.delete("/non-existent/endpoint");

      expect(response.status).toBe(httpConstants.HTTP_STATUS_NOT_FOUND);
    });
  });
});
