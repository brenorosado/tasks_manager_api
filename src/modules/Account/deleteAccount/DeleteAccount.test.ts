import server from "../../../server";
import request from "supertest";
import { Account } from "@prisma/client";

import { describe, it } from "@jest/globals";

const accountCreationPayload = {
  email: "jesttest2@jesttest2.com",
  password: "123456",
  name: "Jest2 Test2"
};

let createdAccount: Account;
let bearerToken: string;

describe("DELETE at /accounts", () => {
  it("Creating an account for delete test", async () => {
    const res = await request(server).post("/accounts")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(accountCreationPayload)
      .expect(201);

    const { account, token } = res.body;
    bearerToken = token;
    createdAccount = account;
  });

  it("Delete must fail when providing a unexisting id", async () => {
    await request(server).delete("/accounts/anyId")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(400);
  });

  it("Delete must be successfull when providing an existing ID", async () => {
    await request(server).delete(`/accounts/${createdAccount.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(200);
  });
});