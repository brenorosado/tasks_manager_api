import server from "../../../server";
import request from "supertest";
import { Account, Project } from "@prisma/client";
import { describe, it } from "@jest/globals";

let createdAccount: Account;
let bearerToken: string;
let createdProject: Project;

const accountCreationPayload = {
  email: "jesttest7@jesttest7.com.br",
  name: "Jest Test 7",
  password: "123456"
};
  
const projectCreationPayload = {
  name: "Project Test",
  icon: "Icon Test"
};

describe("PUT at /project", () => {
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

    createdProject = res.body;
  });

  it("Must be successfull when sending correct payload", async () => {
    const res = await request(server).put("/project")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({ id: createdProject.id, name: "Project 2", icon: "Icon 2"})
      .expect(200);

    const updatedProject = res.body;

    expect(updatedProject.name).toBe("Project 2");
    expect(updatedProject.icon).toBe("Icon 2");
  });

  it.each([
    ["sending empty payload", {}],
    ["missing ID", { name: "Project 2", icon: "Icon 2"}],
    ["missing name", { ...createdProject, name: "", icon: "Icon 2"}],
    ["missing icon", { ...createdProject, name: "Project 2", icon: ""}]
  ])("Update must fail when %s", async (key, payload) => {
    await request(server).put("/project")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect(400);
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