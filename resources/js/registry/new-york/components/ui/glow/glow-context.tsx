'use client';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

interface CardState {
    active: number;
    angle: number;
}

interface GlowCardConfig {
    spread: number;
    blur: number;
    movementDuration: number;
}

interface GlowCardContextValue {
    cardStates: Map<string, CardState>;
    config: GlowCardConfig;
    registerCard: (id: string) => void;
    unregisterCard: (id: string) => void;
    updateCardState: (id: string, state: Partial<CardState>) => void;
}

const defaultConfig: GlowCardConfig = {
    spread: 80,
    blur: 20,
    movementDuration: 0,
};

const GlowCardContext = createContext<GlowCardContextValue | null>(null);

export const useGlowCardContext = () => {
    const context = useContext(GlowCardContext);

    if (!context) {
        throw new Error(
            'useGlowCardContext must be used within a GlowCardProvider',
        );
    }

    return context;
};

interface GlowCardProviderProps {
    children: ReactNode;
    config?: Partial<GlowCardConfig>;
}

export function GlowCardProvider({ children, config }: GlowCardProviderProps) {
    const [cardStates, setCardStates] = useState<Map<string, CardState>>(
        new Map(),
    );
    const mergedConfig = { ...defaultConfig, ...config };

    const registerCard = useCallback((id: string) => {
        setCardStates((prev) => {
            const next = new Map(prev);

            if (!next.has(id)) {
                next.set(id, { active: 0.15, angle: 0 });
            }

            return next;
        });
    }, []);

    const unregisterCard = useCallback((id: string) => {
        setCardStates((prev) => {
            const next = new Map(prev);
            next.delete(id);

            return next;
        });
    }, []);

    const updateCardState = useCallback(
        (id: string, state: Partial<CardState>) => {
            setCardStates((prev) => {
                const next = new Map(prev);
                const current = next.get(id) || { active: 0.15, angle: 0 };
                next.set(id, { ...current, ...state });

                return next;
            });
        },
        [],
    );

    return (
        <GlowCardContext.Provider
            value={{
                cardStates,
                config: mergedConfig,
                registerCard,
                unregisterCard,
                updateCardState,
            }}
        >
            {children}
        </GlowCardContext.Provider>
    );
}
