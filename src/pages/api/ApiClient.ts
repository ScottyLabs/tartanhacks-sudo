import axios from 'axios'
import { env } from '../../env.mjs';

const API_URL = env.HELIX_BASE_URL

export const ApiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds
  headers: { 'Content-Type': 'application/json' }
})