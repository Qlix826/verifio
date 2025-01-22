import { useState, useEffect } from 'react';

interface RateLimitState {
  attempts: number;
  timestamp: number;
}

export function useRateLimit(key: string, maxAttempts: number, windowSeconds: number) {
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    // Vérifier l'état de la limitation au chargement
    checkRateLimit();
  }, []);

  const checkRateLimit = () => {
    const now = Date.now();
    const state = getRateLimitState();

    if (!state) {
      setIsRateLimited(false);
      return;
    }

    // Si la fenêtre de temps est dépassée, réinitialiser le compteur
    if (now - state.timestamp > windowSeconds * 1000) {
      clearRateLimit();
      setIsRateLimited(false);
      return;
    }

    // Vérifier si le nombre maximum de tentatives est atteint
    setIsRateLimited(state.attempts >= maxAttempts);
  };

  const getRateLimitState = (): RateLimitState | null => {
    const stored = localStorage.getItem(`rate_limit_${key}`);
    return stored ? JSON.parse(stored) : null;
  };

  const incrementRateLimit = () => {
    const now = Date.now();
    const state = getRateLimitState();

    if (!state || now - state.timestamp > windowSeconds * 1000) {
      // Première tentative ou fenêtre expirée
      const newState: RateLimitState = {
        attempts: 1,
        timestamp: now,
      };
      localStorage.setItem(`rate_limit_${key}`, JSON.stringify(newState));
      setIsRateLimited(false);
    } else {
      // Incrémenter le compteur existant
      const newState: RateLimitState = {
        attempts: state.attempts + 1,
        timestamp: state.timestamp,
      };
      localStorage.setItem(`rate_limit_${key}`, JSON.stringify(newState));
      setIsRateLimited(newState.attempts >= maxAttempts);
    }
  };

  const clearRateLimit = () => {
    localStorage.removeItem(`rate_limit_${key}`);
    setIsRateLimited(false);
  };

  return {
    isRateLimited,
    incrementRateLimit,
    clearRateLimit,
  };
} 