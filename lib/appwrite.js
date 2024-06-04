import { Client, Account, Avatars, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.codeplay.aora",
  projectId: "662f2870001c78a2642d",
  databaseId: "662f2dd20002a39467e3",
  userCollectionId: "662f2e6e0003a58b3d52",
  videoCollectionId: "662f2f9f002c74e2624c",
  storageId: "662f3efa000f2c3b7eae",
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (username, email, password) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      username,
      email,
      password
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username: username, 
        email: email,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}
