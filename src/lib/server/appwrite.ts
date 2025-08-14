import { Client, Databases } from "node-appwrite";
import { APPWRITE_API_KEY, APPWRITE_PROJECT } from "$env/static/private";

const client = new Client();

client
    .setEndpoint("https://nyc.cloud.appwrite.io/v1")
    .setProject(APPWRITE_PROJECT)
    .setKey(APPWRITE_API_KEY);

export const databases = new Databases(client);
