import server from "../../../server";
import request from "supertest";
import { Account, Category, Project, Task } from "@prisma/client";

import { describe, it } from "@jest/globals";

let createdAccount: Account;
let bearerToken: string;
let createdProject: Project;
let createdCategory: Category;
let createdTask: Task;

const accountCreationPayload = {
  email: "jesttest15@jesttest15.com.br",
  name: "Jest Test 15",
  password: "123456"
};

const projectCreationPayload = {
  name: "Project Test",
  icon: "Icon Test"
};

describe("POST at /task", () => {
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

  it("Creating category for test", async () => {
    const res = await request(server).post("/category")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({ name: "Category Test", projectId: createdProject.id })
      .expect("content-type", /json/)
      .expect(201);
  
    createdCategory = res.body;
  });

  it("Creating task for test", async () => {
    const res = await request(server).post("/task")
      .set("Authorization", `Bearer ${bearerToken}`)  
      .send({
        title: "Task Test",
        description: "Description Test",
        deadline: "2022-11-03T02:13:37.462Z",
        categoryId: createdCategory.id 
      })
      .expect("content-type", /json/)
      .expect(201);

    createdTask = res.body;
  });

  it("Must fail when not authenticated", async () => {
    await request(server).delete(`/task/${createdTask.id}`)
      .expect("content-type", /json/)
      .expect(403);
  });

  it("Must fail when sending unexisting task ID", async () => {
    await request(server).delete("/task/anyId")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(400);
  });

  it("Deleting the created task for test", async () => {
    await request(server).delete(`/task/${createdTask.id}`)
      .set("Authorization", `Bearer ${bearerToken}`)
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