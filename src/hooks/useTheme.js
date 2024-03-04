import useLocalStorage from "use-local-storage";
import { useSelector } from "react-redux";
import { useUpdateAccountTheme } from "@/lib/actions";
import { defaultThemeConfig } from "@/configs";

export default function useTheme() {
  const { updateTheme: setTheme } = useUpdateAccountTheme();
  const [themeLS] = useLocalStorage("theme-config");
  const {currentUser }=useSelector((store)=>store.currentUser);
  const { user } = currentUser || {};
  const theme = themeLS || user?.prefs || defaultThemeConfig;

  return [theme, setTheme];
}
