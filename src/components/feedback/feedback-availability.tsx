'use client';

import { createContext, useContext, type ReactNode } from 'react';

const FeedbackAvailability = createContext({ enabled: false, pageEnabled: false, productName: 'this site' });

export function FeedbackAvailabilityProvider({ enabled, pageEnabled, productName, children }: { enabled: boolean; pageEnabled: boolean; productName: string; children: ReactNode }) {
  return <FeedbackAvailability.Provider value={{ enabled, pageEnabled, productName }}>{children}</FeedbackAvailability.Provider>;
}

export function useFeedbackAvailability() {
  return useContext(FeedbackAvailability);
}
