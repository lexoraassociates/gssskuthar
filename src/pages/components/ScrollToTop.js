import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ye har baar route change hone par smoothly top par le jayega
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
