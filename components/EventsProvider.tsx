'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { EventsMap, fetchEvents, saveEvents } from '@/lib/events-client';

interface EventsContextValue {
  campaigns: EventsMap;
  updates: EventsMap;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  saveCampaigns: (data: EventsMap) => Promise<void>;
  saveUpdates: (data: EventsMap) => Promise<void>;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<EventsMap>({});
  const [updates, setUpdates] = useState<EventsMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [campaignsData, updatesData] = await Promise.all([
        fetchEvents('campaigns'),
        fetchEvents('updates'),
      ]);
      setCampaigns(campaignsData);
      setUpdates(updatesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const saveCampaigns = useCallback(async (data: EventsMap) => {
    await saveEvents('campaigns', data);
    setCampaigns(data);
  }, []);

  const saveUpdates = useCallback(async (data: EventsMap) => {
    await saveEvents('updates', data);
    setUpdates(data);
  }, []);

  return (
    <EventsContext.Provider
      value={{
        campaigns,
        updates,
        loading,
        error,
        refresh: load,
        saveCampaigns,
        saveUpdates,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) {
    throw new Error('useEvents must be used within EventsProvider');
  }
  return ctx;
}
