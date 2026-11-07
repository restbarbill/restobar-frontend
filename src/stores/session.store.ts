import { create } from 'zustand';

export interface ActiveOperator {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

interface SessionState {
  operator: ActiveOperator | null;
  terminalName: string;
  setOperator: (operator: ActiveOperator | null, token?: string) => void;
  logout: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  operator: null,
  terminalName: 'CAJA PRINCIPAL #1',
  setOperator: (operator, token) => {
    if (token) {
      localStorage.setItem('restobar_access_token', token);
    }
    set({ operator });
  },
  logout: () => {
    localStorage.removeItem('restobar_access_token');
    set({ operator: null });
  },
}));
