import React from 'react'

type Toast = {
  id: string
  title: string
}

type ToastContextValue = {
  toast: (title: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((title: string) => {
    const id = String(Date.now())
    const next: Toast = { id, title }
    setToasts((s) => [next, ...s])
    // auto remove
    setTimeout(() => {
      setToasts((s) => s.filter((t) => t.id !== id))
    }, 1600)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div aria-live="assertive" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="min-w-[160px] rounded-md bg-neutral-900/90 text-white px-3 py-2 text-xs shadow-lg backdrop-blur"
          >
            {t.title}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default ToastProvider
