import server from "../../../server";
import request from "supertest";
import { Account } from "@prisma/client";

const accountCreationPayload = {
  email: "jesttest4@jesttest4.com",
  password: "123456",
  name: "Jest4 Test4"
};

const authenticationCreationPayload = {
  email: "jesttest4@jesttest4.com",
  password: "123456",
};

const expectedAccountResponse = {
  email: "jesttest4@jesttest4.com",
  name: "Jest4 Test4"
};
  
let createdAccount: Account;
let bearerToken: string;

describe("POST at /authenticate", () => {
  it("Creating an account for authentication test", async () => {
    const res = await request(server)
      .post("/account")
      .set("Accept", "application/json")
      .send(accountCreationPayload)
      .expect("content-type", /json/)
      .expect(201);
    
    const { account, token } = res.body;

    bearerToken = token;
    createdAccount = account;

    expect(account).toEqual(
      expect.objectContaining(expectedAccountResponse)
    );
  });

  it.each([
    ["with an empty payload", { payload: {}, code: 400 }],
    ["when missing email", { payload: { email: "", password: "123456" }, code: 400 }],
    ["when missing password", {payload: { email: "jestteste@jesttest.com", password: "" }, code: 400 }],
    ["when sending wrong payload", { payload: { email: "anyemail@anyemail.com", password: "anypassord" }, code: 401 }],
    ["when sending wrong payload", { payload: { email: 123, password: 123 }, code: 400 }],
  ])("Must fail %s ", async (chave, info) => {
    await request(server)
      .post("/authenticate")
      .set("Accept", "application/json")
      .send(info.payload)
      .expect("content-type", /json/)
      .expect(info.code);
  });

  it("Must be successfull when providing a valid payload", async () => {
    const res = await request(server)
      .post("/authenticate")
      .set("Accept", "application/json")
      .send(authenticationCreationPayload)
      .expect("content-type", /json/)
      .expect(200);

    const { account } = res.body;
    expect(account).toEqual(
      expect.objectContaining(expectedAccountResponse)
    );
  });

  it("Deleting the account used for authentication test", async () => {
    await request(server)
      .delete(`/account/${createdAccount.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(200);
  });
});