'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { CampaignMap, UpdateMap } from '@/lib/events';
import {
  fetchCampaigns,
  fetchUpdates,
  saveCampaigns,
  saveUpdates,
} from '@/lib/events-client';

interface EventsContextValue {
  campaigns: CampaignMap;
  updates: UpdateMap;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  saveCampaigns: (data: CampaignMap) => Promise<void>;
  saveUpdates: (data: UpdateMap) => Promise<void>;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<CampaignMap>({});
  const [updates, setUpdates] = useState<UpdateMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [campaignsData, updatesData] = await Promise.all([
        fetchCampaigns(),
        fetchUpdates(),
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

  const handleSaveCampaigns = useCallback(async (data: CampaignMap) => {
    const verified = await saveCampaigns(data);
    setCampaigns(verified);
  }, []);

  const handleSaveUpdates = useCallback(async (data: UpdateMap) => {
    const verified = await saveUpdates(data);
    setUpdates(verified);
  }, []);

  return (
    <EventsContext.Provider
      value={{
        campaigns,
        updates,
        loading,
        error,
        refresh: load,
        saveCampaigns: handleSaveCampaigns,
        saveUpdates: handleSaveUpdates,
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
