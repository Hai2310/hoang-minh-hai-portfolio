"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

interface ToastItem {
  id: number;
  kind: "success" | "error";
  message: string;
}

interface ToastContextValue {
  notify: (kind: ToastItem["kind"], message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      for (const timer of activeTimers) clearTimeout(timer);
      activeTimers.clear();
    };
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (kind: ToastItem["kind"], message: string) => {
      const id = Date.now() + Math.random();
      setToasts((previous) => [...previous, { id, kind, message }]);
      const timer = setTimeout(() => {
        dismiss(id);
        timers.current.delete(timer);
      }, 5000);
      timers.current.add(timer);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div
        className="pointer-events-none fixed bottom-5 right-5 z-[90] flex w-[min(92vw,360px)] flex-col gap-2"
        aria-live="polite"
        aria-atomic="false"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              role={toast.kind === "error" ? "alert" : "status"}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              className="pointer-events-auto flex items-start gap-3 rounded-lg border border-border bg-surface p-3.5 shadow-lg"
            >
              {toast.kind === "success" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />
              ) : (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" aria-hidden />
              )}
              <p className="flex-1 text-sm text-foreground">{toast.message}</p>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => dismiss(toast.id)}
                className="text-muted transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
