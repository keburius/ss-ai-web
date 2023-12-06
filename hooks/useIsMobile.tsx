import { useEffect, useState } from "react";
const useIsMobile = (breakpoint: number) => {
  const [mobile, setMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setMobile(mediaQuery.matches);
    const handleResize = () => {
      setMobile(mediaQuery.matches);
    };
    mediaQuery.addListener(handleResize);
    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);
  return mobile;
};
export default useIsMobile;
