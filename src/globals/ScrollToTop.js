import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop({scrollbar}) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0
    if(scrollbar) scrollbar.scrollTop = 0;
  }, [pathname, scrollbar]);

  return null;
}