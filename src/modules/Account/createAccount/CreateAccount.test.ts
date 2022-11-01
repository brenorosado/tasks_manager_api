import server from "../../../server";
import request from "supertest";
import { Account } from "@prisma/client";

import { describe, it } from "@jest/globals";

let createdAccount: Account;
let bearerToken: string;

describe("POST at /account", () => {
  it.each([
    ["with an empty payload", {}],
    ["when missing email", { email: "", password: "123456", name: "Jest Test" }],
    ["when missing password", { email: "jestteste@jesttest.com", password: "", name: "Jest Test" }],
    ["when missing name", { email: "jestteste@jesttest.com", password: "123456", name: "" }],
    ["when sending payload attributes in wrong type", { email: 123, password: 123.4, name: false }],
  ])("Must fail %s", async (key, payload) => {
    await request(server).post("/account")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(payload)
      .expect(400);
  });

  const correctPayload = { 
    email: "jesttest@jesttest.com",
    password: "123456",
    name: "Jest Test"
  };

  const expectedAccountResponse = {
    email: "jesttest@jesttest.com",
    name: "Jest Test"
  };

  it("Account must be created when providing email, password and name", async () => {
    const res = await request(server).post("/account")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(correctPayload)
      .expect(201);

    const { account, token } = res.body;
    
    bearerToken = token;
    createdAccount = account;

    expect(account.password).toBe(undefined);
    
    expect(account).toEqual(
      expect.objectContaining(expectedAccountResponse)
    );
  });

  it("Account creation must faild when providing a registered email" , async () => {
    await request(server).post("/account")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(correctPayload)
      .expect(409); 
  });

  it("Delete created account for test", async () => {
    await request(server).delete(`/account/${createdAccount.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(200);
  });
});