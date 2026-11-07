"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { applyTheme, getThemePref, setThemePref, subscribeTheme, type ThemePref } from "@/lib/theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { pref } = useTheme();

  useEffect(() => {
    applyTheme(pref);
    if (pref !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  return children;
}

export function useTheme(): { pref: ThemePref; setPref: (pref: ThemePref) => void } {
  const pref = useSyncExternalStore(subscribeTheme, getThemePref, () => "system" as ThemePref);
  return { pref, setPref: setThemePref };
}
