"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
}

interface ToastContextType {
  toast: (type: ToastType, message: string, description?: string) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((type: ToastType, message: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, description }]);
    setTimeout(() => removeToast(id), 5000);
  }, [removeToast]);

  const success = (message: string, description?: string) => toast("success", message, description);
  const error = (message: string, description?: string) => toast("error", message, description);

  return (
    <ToastContext.Provider value={{ toast, success, error }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[99999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto"
            >
              <div className="w-80 bg-[#0A1120] border border-white/10 rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl relative overflow-hidden group">
                {/* Progress Bar Animation */}
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className={`absolute bottom-0 left-0 h-1 ${
                    t.type === "success" ? "bg-accent-emerald" : t.type === "error" ? "bg-red-500" : "bg-blue-500"
                  }`}
                />

                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    t.type === "success" ? "bg-accent-emerald/10 text-accent-emerald" : 
                    t.type === "error" ? "bg-red-500/10 text-red-500" : 
                    "bg-blue-500/10 text-blue-500"
                  }`}>
                    {t.type === "success" && <CheckCircle2 size={20} />}
                    {t.type === "error" && <AlertCircle size={20} />}
                    {t.type === "info" && <Info size={20} />}
                  </div>
                  
                  <div className="flex-1 min-w-0 pr-6">
                    <p className="font-bold text-white text-sm leading-tight mb-1">{t.message}</p>
                    {t.description && (
                      <p className="text-muted-foreground text-xs leading-relaxed">{t.description}</p>
                    )}
                  </div>

                  <button 
                    onClick={() => removeToast(t.id)}
                    className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
