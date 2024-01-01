import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  auth: ({ }),
  isAuthenticated: () => set((authi) => ({ 
    auth: { ...authi.auth, isAuthenticated: true }
   })),
}))


export const useOrganisationStore = create((set) => ({
    organisation: ({ }),
    setOrganisation: (organisation) => set((org) => ({ 
      organisation: { ...org.organisation, ...organisation }
     })),
}))


export const useEventsStore = create((set) => ({
    events: ({ }),
    setEvents: (events) => set((ev) => ({ 
        events: { ...ev.events, ...events }
     })),
}))

export const useTemplateStore = create((set) => ({
    template: ({ }),
    setTemplate: (template) => set((temp) => ({ 
        template: { ...temp.template, ...template }
     })),
}))

export const useCsvStore = create((set) => ({
    csv: ({ }),
    setCsv: (csv) => set((c) => ({ 
        csv: { ...c.csv, ...csv }
     })),
}))

