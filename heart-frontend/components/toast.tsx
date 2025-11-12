interface ToastProps {
  message: string
  type: "success" | "error"
}

export default function Toast({ message, type }: ToastProps) {
  const bgColor = type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
  const textColor = type === "success" ? "text-green-800" : "text-red-800"
  const icon = type === "success" ? "✓" : "✕"

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border-2 ${bgColor} ${textColor} shadow-lg animate-slide-in-up`}
    >
      <span className="text-xl font-bold">{icon}</span>
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
