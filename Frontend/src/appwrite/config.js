import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")  
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const collections = [
    {
        name: "notes",
        id: import.meta.env.VITE_COLLECTION_ID,
        dbId: import.meta.env.VITE_DATABASE_ID
    },
];

export { client, databases, collections };