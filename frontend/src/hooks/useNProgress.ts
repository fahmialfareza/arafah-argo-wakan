import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({ showSpinner: false, speed: 400, easing: "ease" });

export function useNProgress() {
  const router = useRouter();

  useEffect(() => {
    // Start progress on navigation start
    const unsubscribe = router.subscribe("onBeforeLoad", () => {
      NProgress.start();
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    // Complete progress on route change
    const unsubscribe = router.subscribe("onLoad", () => {
      NProgress.done();
    });

    return () => {
      unsubscribe();
    };
  }, [router]);
}
