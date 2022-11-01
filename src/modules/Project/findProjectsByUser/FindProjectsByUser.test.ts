import { describe, it } from "@jest/globals";
import { Account, Project } from "@prisma/client";
import server from "../../../server";
import request from "supertest";

let createdAccount: Account;
let bearerToken: string;
const createdProjects: Project[] = [];

const accountCreationPayload = {
  email: "jesttest8@jesttest8.com.br",
  name: "Jest Test 8",
  password: "123456"
};

describe("GET at /projects", () => {
  it("Creating account for tests", async () => {
    const res = await request(server).post("/account")
      .set("Accept", "application/json")
      .send(accountCreationPayload)
      .expect("content-type", /json/)
      .expect(201);
    
    const { account, token } = res.body;
        
    bearerToken = token;
    createdAccount = account;
  });

  it.each([
    ["Project Test 1", {
      name: "Project Test 1",
      icon: "Icon Test 1"
    }],
    ["Project Test 2", {
      name: "Project Test 2",
      icon: "Icon Test 2"
    }]
  ])("Creating projects for tests", async (key, payload) => {
    const res = await request(server).post("/project")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(payload)
      .expect(201);

    createdProjects.push(res.body);
  });

  it("Getting the projects of created user must fail when not authenticated", async () => {
    await request(server).get("/project")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(403);    
  });


  it("Getting the projects of created user", async () => {
    const projects = await request(server).get("/project")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(200);

    expect(projects.body?.length).toEqual(2);
  });

  it("Deleting the projects created for tests", async () => {
    createdProjects.forEach(async (project) => {
      await request(server).delete(`/project/${project.id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${bearerToken}`)
        .expect("content-type", /json/)
        .expect(200);
    });
  });

  it("Delete created account for test", async () => {
    await request(server).delete(`/account/${createdAccount.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(200);
  });
});