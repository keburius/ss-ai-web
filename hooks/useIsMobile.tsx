// import { useEffect, useState } from "react";

// const useIsMobile = (breakpoint: number) => {
//   const [mobile, setMobile] = useState<boolean | null>(null);
//   const [windowSize, setWindowSize] = useState(0);
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.addEventListener("resize", handleResize);
//       window.addEventListener("orientationchange", handleResize);
//       if (window.innerWidth <= breakpoint) {
//         setMobile(true);
//       } else {
//         setMobile(false);
//       }
//     }
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("orientationchange", handleResize);
//     };
//   }, [windowSize]);
//   const handleResize = () => {
//     setWindowSize(window.innerWidth);
//   };
//   return mobile;
// };

// export default useIsMobile;
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
