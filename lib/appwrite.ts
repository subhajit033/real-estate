import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Account, Avatars, Client, OAuthProvider } from 'react-native-appwrite';

const config = {
  platform: 'com.subha.real_estate',
  endPoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();
client
  .setEndpoint(config.endPoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL('/');
    const res = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!res) {
      throw new Error('Failed to login');
    }
    const browserRes = await openAuthSessionAsync(res.toString(), redirectUri);
    if (browserRes.type !== 'success') {
      throw new Error('failed login');
    }
    const url = new URL(browserRes.url);
    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();
    if (!secret || !userId) throw new Error('Create OAuth2 token failed');

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error('Failed to create session');

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getUser() {
  try {
    const res = await account.get();
    if (res.$id) {
      const userAvatar = avatar.getInitials(res.name);
      return {
        ...res,
        avatar: userAvatar,
      };
    }
  } catch (e) {
    return null;
  }
}
