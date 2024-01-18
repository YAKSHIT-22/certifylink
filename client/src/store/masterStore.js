import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (data) => set({ user: { ...data } }),
      setToken: (token) => set({ token: token }),
      clearUser: () => set({ user: null }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useOrganisationStore = create(
  persist(
    (set) => ({
      organization: [],
      setOrg: (data) => set({ organization: data }),
      addOrg: (data) => set((state) => ({ organization: [...state.organization, data] })),
    }),
    {
      name: 'organization',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useEventsStore = create(
  persist(
    (set) => ({
      events: [],
      setEvents: (data) => set({ events: data }),
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
    }),
    {
      name: 'events',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useTemplateStore = create(
  persist(
    (set) => ({
      template: [],
      setTemplate: (template) => set({ template: template }),
    }),
    {
      name: 'template',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useCsvStore = create(
  persist(
    (set) => ({
      csv: [],
      setCsv: (data) => set({ csv: data }),
      clearCsv: () => set({ csv: [] })
    }),
    {
      name: 'csv',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
