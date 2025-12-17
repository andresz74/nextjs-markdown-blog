import { useEffect, useState } from "react";

export type ThemeName = "light" | "dark" | "system";

const THEME_KEY = "theme";

const MEDIA_QUERY = "(prefers-color-scheme: dark)";

type ResolvedTheme = Exclude<ThemeName, "system">;

function getPreferredTheme(): ResolvedTheme {
  if (typeof window !== "undefined" && window.matchMedia?.(MEDIA_QUERY).matches) {
    return "dark";
  }

  return "light";
}

function getInitialTheme(): ThemeName {
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(THEME_KEY) as ThemeName | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  }

  return "system";
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>(() => getInitialTheme());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    const initial = getInitialTheme();
    return initial === "system" ? getPreferredTheme() : initial;
  });

  useEffect(() => {
    const media = window.matchMedia?.(MEDIA_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      if (theme === "system") {
        setResolvedTheme(event.matches ? "dark" : "light");
      }
    };

    if (media?.addEventListener) {
      media.addEventListener("change", handleChange);
    }

    return () => {
      if (media?.removeEventListener) {
        media.removeEventListener("change", handleChange);
      }
    };
  }, [theme]);

  useEffect(() => {
    const appliedTheme = theme === "system" ? resolvedTheme : theme;

    document.documentElement.setAttribute("data-theme", appliedTheme);
    window.localStorage.setItem(THEME_KEY, theme);

    if (theme === "system") {
      setResolvedTheme(getPreferredTheme());
    }
  }, [theme, resolvedTheme]);

  const setThemeSafe = (next: ThemeName) => setTheme(next);

  const cycleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  return {
    theme,
    setTheme: setThemeSafe,
    cycleTheme,
    themes: ["system", "light", "dark"] as ThemeName[],
  };
}
