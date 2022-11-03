import server from "../../../server";
import request from "supertest";
import { Account, Category, Project } from "@prisma/client";

import { describe, it } from "@jest/globals";

let createdAccount: Account;
let bearerToken: string;
let createdProject: Project;
let createdCategory: Category;

const accountCreationPayload = {
  email: "jesttest10@jesttest10.com.br",
  name: "Jest Test 10",
  password: "123456"
};

const projectCreationPayload = {
  name: "Project Test",
  icon: "Icon Test"
};

describe("POST at /category", () => {
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

  it("Creating project for test", async () => {
    const res = await request(server).post("/project")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(projectCreationPayload)
      .expect("content-type", /json/)
      .expect(201);

    const project = res.body;

    createdProject = project;
  });

  it("Must be successfull when sending correct payload", async () => {
    const res = await request(server).post("/category")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({ name: "Category Test", projectId: createdProject.id })
      .expect("content-type", /json/)
      .expect(201);
  
    createdCategory = res.body;
  });

  it.each([
    ["when missing name", { name: "", projectId: "projectId" }],
    ["when missing projectId", { name: "Category Test", projectId: "" }],
    ["with invalid projectId", { name: "Category Test", projectId: "projectId" }]
  ])("Must fail %s", async (key, payload) => {
    await request(server).post("/category")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(payload)
      .expect("content-type", /json/)
      .expect(400);
  });

  it("Deleting the category", async () => {
    await request(server).delete(`/category/${createdCategory.id}`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(200);
  });

  it("Deleting the created project for test", async () => {
    await request(server).delete(`/project/${createdProject.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(200);
  });

  it("Delete created account for test", async () => {
    await request(server).delete(`/account/${createdAccount.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(200);
  });
});