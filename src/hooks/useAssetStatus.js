// src/hooks/useAssetStatus.js
import { useEffect, useState } from "react";

/**
 * Detects whether a local public asset is available before media is mounted.
 * Returns "checking", "ready" or "missing" so callers can show a graceful
 * placeholder instead of a broken element while the files are not yet added.
 */
export function useAssetStatus(src) {
  const [result, setResult] = useState({ src: null, status: "missing" });

  useEffect(() => {
    if (!src) return undefined;

    let cancelled = false;

    fetch(src, { method: "HEAD" })
      .then((response) => {
        if (cancelled) return;
        const type = response.headers.get("content-type") ?? "";
        const isHtmlFallback = type.includes("text/html");
        setResult({
          src,
          status: response.ok && !isHtmlFallback ? "ready" : "missing",
        });
      })
      .catch(() => {
        if (!cancelled) setResult({ src, status: "missing" });
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!src) return "missing";
  if (result.src !== src) return "checking";
  return result.status;
}
