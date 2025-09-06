import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // apply theme class to html root
  const applyTheme = (t: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (t === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(t);
    }
  };

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
