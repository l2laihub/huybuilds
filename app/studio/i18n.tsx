"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getString, type StringKey, type StudioLang } from "./lib/strings";

const STORAGE_KEY = "hb-studio-lang";

export function resolveInitialLang(stored: string | null): StudioLang {
  return stored === "vi" ? "vi" : "en";
}

type LangContextValue = {
  lang: StudioLang;
  setLang: (lang: StudioLang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  // SSR + first paint render English; hydrate stored preference after mount.
  const [lang, setLangState] = useState<StudioLang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    startTransition(() => {
      setLangState(resolveInitialLang(stored));
    });
  }, []);

  const setLang = useCallback((next: StudioLang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "vi" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

export function useT(): (key: StringKey) => string {
  const { lang } = useLang();
  return useCallback((key: StringKey) => getString(lang, key), [lang]);
}
