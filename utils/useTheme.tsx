import { useEffect, useState } from "react";

export type ThemeName = "light" | "dark" | "matrix";

const THEME_KEY = "theme";

export function getInitialTheme(): ThemeName {
  // 1. localStorage
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(THEME_KEY) as ThemeName | null;
    if (stored === "light" || stored === "dark" || stored === "matrix") {
      return stored;
    }

    // 2. prefers-color-scheme baseline (only to choose between light/dark)
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }

  // 3. default
  return "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    // Apply to <html>
    document.documentElement.setAttribute("data-theme", theme);
    // Persist
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme, ready]);

  const setThemeSafe = (next: ThemeName) => setTheme(next);

  const cycleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "matrix" : "light"
    );
  };

  return {
    theme,
    setTheme: setThemeSafe,
    cycleTheme,
    themes: ["light", "dark", 'matrix'] as ThemeName[],
  };
}
