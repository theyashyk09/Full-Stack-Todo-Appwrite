import { Client, Account } from "appwrite";

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("63b6abff6b5190808bed");

export const account = new Account(client);
