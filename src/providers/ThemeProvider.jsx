/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { useTheme } from "@/hooks";

import { defaultThemeConfig } from "@/configs";

import { ThemeSwitcher } from "@/components";

export default function ThemeProvider({ children }) {
  const { currentUser } = useSelector((state) => state.currentUser);

  const { userId } = currentUser || {};
  const [theme, setTheme] = useTheme();
  const [themeLS] = useLocalStorage("theme-config", defaultThemeConfig);
  const isMobile = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  useEffect(() => {
    setTheme({ ...theme, ...themeLS, isMobile: !isMobile });
  }, [isMobile, userId]);

  if (!theme?.color) {
    return <>Loading..</>;
  }

  return (
    <div className="app_container">
      {children}
      {theme && <ThemeSwitcher />}
    </div>
  );
}
