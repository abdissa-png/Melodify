import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getIsNavScrollTrigger } from "@/lib/store/slices";

const triggerPoint = 50;

export default function ScrollProvider({ children }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= triggerPoint) {
        dispatch(getIsNavScrollTrigger(true));
      } else {
        dispatch(getIsNavScrollTrigger(false));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getIsNavScrollTrigger]);

  return children;
}
