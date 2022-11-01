import { describe, it } from "@jest/globals";
import { Account, Project } from "@prisma/client";
import server from "../../../server";
import request from "supertest";

const accountCreationPayload = {
  email: "jesttest8@jesttest9.com.br",
  name: "Jest Test 9",
  password: "123456"
};

const projectCreationPayload = {
  name: "Project Test",
  icon: "Icon Test"
};

let createdAccount: Account;
let bearerToken: string;
let createdProject: Project;
describe("GET at /project/:id", () => {
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

  it("Creating project for tests", async () => {
    const res = await request(server).post("/project")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(projectCreationPayload)
      .expect(201);

    createdProject = res.body;
  });

  it("Must fail when sending unexisting ID", async () => {
    await request(server).get("/project/anyId")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect(404);
  });

  it("Must be successfull when sending existing project Id", async () => {
    const res = await request(server).get(`/project/${createdProject.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect(200);

    const project = res.body;

    expect(project).toEqual(
      expect.objectContaining(projectCreationPayload)
    );
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