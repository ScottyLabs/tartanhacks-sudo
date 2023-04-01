import axios from "axios";
import { getSession, useSession } from "next-auth/react";

const API_URL = "https://dev.backend.tartanhacks.com"

export const ApiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds
  headers: { 'Content-Type': 'application/json' }
});

ApiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    const token = session.accessToken ?? '';
    config.headers['x-access-token'] = token ?? '';
  }
  return config;
}, (error) => Promise.reject(error),);