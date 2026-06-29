'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { CampaignMap, UpdateMap, GameNameMap } from '@/lib/events';
import {
  fetchCampaigns,
  fetchUpdates,
  fetchGameNames,
  saveCampaigns,
  saveUpdates,
  saveGameNames,
} from '@/lib/events-client';

interface EventsContextValue {
  campaigns: CampaignMap;
  updates: UpdateMap;
  gameNames: GameNameMap;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  saveCampaigns: (data: CampaignMap) => Promise<void>;
  saveUpdates: (data: UpdateMap) => Promise<void>;
  saveGameNames: (data: GameNameMap) => Promise<void>;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<CampaignMap>({});
  const [updates, setUpdates] = useState<UpdateMap>({});
  const [gameNames, setGameNames] = useState<GameNameMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [campaignsData, updatesData, gameNamesData] = await Promise.all([
        fetchCampaigns(),
        fetchUpdates(),
        fetchGameNames(),
      ]);
      setCampaigns(campaignsData);
      setUpdates(updatesData);
      setGameNames(gameNamesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => load());
  }, [load]);

  const handleSaveCampaigns = useCallback(async (data: CampaignMap) => {
    const verified = await saveCampaigns(data);
    setCampaigns(verified);
  }, []);

  const handleSaveUpdates = useCallback(async (data: UpdateMap) => {
    const verified = await saveUpdates(data);
    setUpdates(verified);
  }, []);

  const handleSaveGameNames = useCallback(async (data: GameNameMap) => {
    const verified = await saveGameNames(data);
    setGameNames(verified);
  }, []);

  return (
    <EventsContext.Provider
      value={{
        campaigns,
        updates,
        gameNames,
        loading,
        error,
        refresh: load,
        saveCampaigns: handleSaveCampaigns,
        saveUpdates: handleSaveUpdates,
        saveGameNames: handleSaveGameNames,
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
