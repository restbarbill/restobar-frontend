import axios from 'axios';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('restobar_access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const serverMsg = error.response?.data?.message;
    if (Array.isArray(serverMsg)) return serverMsg.join(', ');
    if (typeof serverMsg === 'string') return serverMsg;
    if (error.code === 'ERR_NETWORK') {
      return `No se pudo conectar al servidor Backend (${API_BASE_URL}). Verifica que restobar-backend esté encendido.`;
    }
  }
  return error instanceof Error ? error.message : 'Error inesperado en la operación';
}
