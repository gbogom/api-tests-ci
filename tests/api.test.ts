import axios from "axios";
import { expect } from "chai";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Don't throw an error on 4xx/5xx; let the test check the status itself
const api = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
});

describe("JSONPlaceholder API", () => {
  it("GET /users/1 returns the user", async () => {
    const response = await api.get("/users/1");

    expect(response.status).to.equal(500);
    expect(response.data.id).to.equal(1);
    expect(response.data).to.have.property("name");
    expect(response.data).to.have.property("email");
  });

  it("POST /posts creates a post", async () => {
    const newPost = { title: "QA test", body: "Created by a test", userId: 1 };

    const response = await api.post("/posts", newPost);

    expect(response.status).to.equal(201);
    expect(response.data.title).to.equal(newPost.title);
    expect(response.data).to.have.property("id");
  });

  it("GET /users/9999 returns 404 for a user that doesn't exist", async () => {
    const response = await api.get("/users/9999");

    expect(response.status).to.equal(404);
  });
});