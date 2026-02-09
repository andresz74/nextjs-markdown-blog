import { useEffect, useState } from "react";

export type ThemeName = "light" | "dark" | "matrix" | "system";

const THEME_KEY = "theme";

const resolveSystemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyResolvedTheme = (theme: "light" | "dark" | "matrix") => {
  document.documentElement.setAttribute("data-theme", theme);
};

export function getInitialTheme(): ThemeName {
  // 1. localStorage
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(THEME_KEY) as ThemeName | null;
    if (stored === "light" || stored === "dark" || stored === "matrix" || stored === "system") {
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
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const syncSystemTheme = () => applyResolvedTheme(resolveSystemTheme());
      syncSystemTheme();
      mediaQuery.addEventListener("change", syncSystemTheme);
      window.localStorage.setItem(THEME_KEY, theme);
      return () => mediaQuery.removeEventListener("change", syncSystemTheme);
    }

    applyResolvedTheme(theme);
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
    themes: ["light", "dark", "matrix", "system"] as ThemeName[],
  };
}
