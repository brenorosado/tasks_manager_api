import server from "../../../server";
import request from "supertest";
import { Account, Category, Project } from "@prisma/client";

import { describe, it } from "@jest/globals";

let createdAccount: Account;
let bearerToken: string;
let createdProject: Project;
let createdCategory: Category;

const accountCreationPayload = {
  email: "jesttest12@jesttest12.com.br",
  name: "Jest Test 12",
  password: "123456"
};

const projectCreationPayload = {
  name: "Project Test",
  icon: "Icon Test"
};

describe("PUT at /category", () => {
  it("Creating account for test", async () => {
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

  it("Creating category for test", async () => {
    const res = await request(server).post("/category")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({ name: "Category Test", projectId: createdProject.id })
      .expect("content-type", /json/)
      .expect(201);
  
    createdCategory = res.body;
  });

  it("Must faild when not authenticated", async () => {
    await request(server).put("/category")
      .send({ name: "New Category Test", id: createdCategory.id })
      .expect("content-type", /json/)
      .expect(403);
  });

  it.each([
    ["category name", { name: "", id: createdCategory?.id }],
    ["category id", { name: "New Category Test", id: "" }]
  ])("Must faild when missing %s", async (key, payload) => {
    await request(server).put("/category")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(payload)
      .expect("content-type", /json/)
      .expect(400);
  });

  it("Must be successfull when sending correct payload", async () => {
    await request(server).put("/category")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({ name: "New Category Test", id: createdCategory.id })
      .expect("content-type", /json/)
      .expect(200);
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