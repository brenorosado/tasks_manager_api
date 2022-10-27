import server from "../../../server";
import request from "supertest";
import { Account, Project } from "@prisma/client";

import { describe, it } from "@jest/globals";

let createdAccount: Account;
let bearerToken: string;
let createdProject: Project;

const accountCreationPayload = {
  email: "jesttest5@jesttest5.com.br",
  name: "Jest Test 5",
  password: "123456"
};

const projectCreationPayload = {
  name: "Project Test",
  icon: "Icon Test"
};

describe("POST at /project", () => {
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
    ["when missing name", { name: "", icon: "IconTest" }],
    ["when missing icon", { name: "Project Test", icon: "" }],
  ])("Must fail %s", async (key, payload) => {
    await request(server).post("/project")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(payload)
      .expect("content-type", /json/)
      .expect(400);
  });

  it("Must fail when not sending bearer token", async () => {
    await request(server).post("/project")
      .set("Accept", "application/json")
      .send(projectCreationPayload)
      .expect("content-type", /json/)
      .expect(403);
  });

  it("Must be successfull when sending correct payload and authorized", async () => {
    const res = await request(server).post("/project")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(projectCreationPayload)
      .expect("content-type", /json/)
      .expect(201);

    const project = res.body;

    createdProject = project;

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