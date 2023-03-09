import { ApiClient } from "../ApiClient";

interface HelixUser {
  _id: string;
  admin: boolean;
  email: string;
  token: string;
}

const login = async (email: string, password: string): Promise<HelixUser | null> => {
  return await ApiClient.post(`/auth/login`, {
    email,
    password
  }).then(function({data}: {data: HelixUser}) {
    return data;
  }).catch(function(_) {
    return null;
  });
}

export const AuthService = {
  login
}