import server from "../../../server";
import request from "supertest";
import { Account } from "@prisma/client";

const accountCreationPayload = {
  email: "jesttest3@jesttest3.com",
  password: "123456",
  name: "Jest3 Test3"
};

const expectedAccountResponse = {
  email: "jesttest3@jesttest3.com",
  name: "Jest3 Test3"
};
  
let createdAccount: Account;
let bearerToken: string;
describe("GET at /account/:id", () => {
  it("Creating an account for delete test", async () => {
    const res = await request(server).post("/account")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(accountCreationPayload)
      .expect(201);
    
    const { account, token } = res.body;
    bearerToken = token;
    createdAccount = account;
  });

  it("Must fail when not sending a Bearer Token", async () => {
    await request(server).get(`/account/${createdAccount.id}`)
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(403);
  });

  it("Must fail when providing an unexisting ID", async () => {
    await request(server).get("/account/anyId")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(404);
  });

  it("Must be successfull when providing an existing ID", async () => {
    const res = await request(server).get(`/account/${createdAccount.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(200);

    const account = res.body;

    expect(account).toEqual(
      expect.objectContaining(expectedAccountResponse)
    );
  });

  it("Delete the created account for test", async () => {
    await request(server).delete(`/account/${createdAccount.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(200);
  });
});