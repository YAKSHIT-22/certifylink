import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware"
export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (data) => set({
                user: { ...data }
            }),
            clearUser: () => set({
                user: null
            })
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => localStorage)
        },
    ),
);


export const useOrganisationStore = create((set) => ({
    org: [],
    setOrg: (data) => set({
        org: data
    }),
    addOrg: (data) => set((state) => ({
        org: [...state.org, data]
    })),
}))


export const useEventsStore = create((set) => ({
    events: [],
    setEvents: (data) => set({
        events: data
    }),
    addEvent: (event) => set((state) => ({
        events: [...state.events, event]
    })),
}))

export const useTemplateStore = create((set) => ({
    template: ({}),
    setTemplate: (template) => set((temp) => ({
        template: { ...temp.template, ...template }
    })),
}))

export const useCsvStore = create((set) => ({
    csv: ({}),
    setCsv: (csv) => set((c) => ({
        csv: { ...c.csv, ...csv }
    })),
}))

